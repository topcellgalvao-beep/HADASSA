import React, { useState } from 'react';
import { Phone, Video, Search, MoreVertical, BadgeCheck, Settings, Sparkles, Wifi, Battery, Signal, ArrowLeft } from 'lucide-react';
import { TOPCELL_INFO } from '../data/servicesData';

interface HeaderProps {
  onOpenAdmin: () => void;
  onOpenChat: () => void;
  activeTab?: string;
  onSelectTab?: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAdmin, onOpenChat, activeTab = 'CONVERSAS', onSelectTab }) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleCallWhatsApp = () => {
    window.open(`https://wa.me/${TOPCELL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de atendimento na TopCell.')}`, '_blank');
  };

  return (
    <header id="whatsapp-header-bar" className="sticky top-0 z-40 bg-[#008069] text-white shadow-lg select-none">
      {/* Top Phone Status Bar */}
      <div className="bg-[#00705c] px-4 py-1 flex items-center justify-between text-[11px] text-white/90 font-semibold tracking-wider border-b border-white/10">
        <span className="flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5 text-white/80 cursor-pointer" onClick={onOpenChat} />
          <span>07:00</span>
        </span>
        <span className="font-bold tracking-widest text-[12px]">WhatsApp</span>
        <div className="flex items-center gap-1.5 text-white/90">
          <Signal className="w-3 h-3" />
          <Wifi className="w-3 h-3" />
          <Battery className="w-3.5 h-3.5 fill-white" />
        </div>
      </div>

      {/* Main WhatsApp Header Row */}
      <div className="px-3 sm:px-4 py-2 flex items-center justify-between">
        {/* Left: Contact Info (Hadassa + TopCell) */}
        <div
          className="flex items-center gap-2.5 cursor-pointer select-none flex-1 min-w-0"
          onClick={onOpenChat}
        >
          <div className="relative shrink-0">
            <img
              src={TOPCELL_INFO.avatarUrl}
              alt={TOPCELL_INFO.assistantName}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 border-white shadow-sm bg-[#111b21]"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00e676] border-2 border-[#008069] rounded-full" />
          </div>

          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-1 text-white font-bold text-base sm:text-lg leading-tight truncate">
              <span className="truncate">TopCell Assistência</span>
              <BadgeCheck className="w-4 h-4 text-white fill-white/30 shrink-0" title="Conta Comercial Oficial" />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-emerald-100 font-normal truncate">
              <span className="font-semibold text-white">online</span>
              <span>•</span>
              <span className="truncate">(74) 99980-4861</span>
            </div>
          </div>
        </div>

        {/* Right: WhatsApp action buttons */}
        <div className="flex items-center gap-1 shrink-0 text-white">
          <button
            onClick={handleCallWhatsApp}
            title="Chamar no WhatsApp (74 99980-4861)"
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <Video className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={handleCallWhatsApp}
            title="Ligar no WhatsApp (74 99980-4861)"
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5 text-white" />
          </button>

          <button
            onClick={onOpenChat}
            title="Buscar conversa"
            className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 text-white" />
          </button>

          {/* 3 Dots Menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              title="Mais opções"
              className="p-1.5 hover:bg-black/10 rounded-full transition-colors cursor-pointer"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </button>

            {showMenu && (
              <div className="absolute right-0 top-10 w-64 bg-[#233138] border border-[#2a3942] rounded-xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-sm">
                <div className="px-4 py-2 border-b border-[#2a3942] text-xs font-semibold text-[#8696a0]">
                  TOPCELL (74) 99980-4861
                </div>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    handleCallWhatsApp();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#111b21] text-[#00a884] font-medium flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#00a884]" />
                  <span>Chamar no WhatsApp (74) 99980-4861</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenAdmin();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#111b21] text-white flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <Settings className="w-4 h-4 text-[#00a884]" />
                  <span>+ Adicionar habilidades (admin)</span>
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    onOpenChat();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-[#111b21] text-white flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#00a884]" />
                  <span>Falar com Atendente (Hadassa)</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Sub Header Tabs Bar */}
      <div className="flex items-center justify-around bg-[#00705c] text-[12px] sm:text-xs font-bold uppercase tracking-wider text-emerald-100 border-t border-white/10">
        {['CONVERSAS', 'SERVIÇOS', 'ORÇAMENTOS', 'LOJA'].map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => onSelectTab && onSelectTab(tab)}
              className={`flex-1 py-2 text-center transition-all border-b-2 cursor-pointer ${
                isActive ? 'border-white text-white font-extrabold bg-white/10' : 'border-transparent text-emerald-100/80 hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>
    </header>
  );
};



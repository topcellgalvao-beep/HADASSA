import React from 'react';
import { Smartphone, Briefcase, MapPin, Clock, Wrench, MessageSquare, BadgeCheck } from 'lucide-react';
import { TOPCELL_INFO } from '../data/servicesData';

interface AssistantCardProps {
  onSelectServices: () => void;
  onSelectQuote: () => void;
  onSelectLocation: () => void;
  onSelectHours: () => void;
  onSelectDiagnostic: () => void;
  onSelectChat: () => void;
}

export const AssistantCard: React.FC<AssistantCardProps> = ({
  onSelectServices,
  onSelectQuote,
  onSelectLocation,
  onSelectHours,
  onSelectDiagnostic,
  onSelectChat,
}) => {
  return (
    <section id="assistant-card" className="bg-[#111b21] border border-[#222d34] rounded-2xl p-4 sm:p-6 shadow-2xl mb-8 wa-chat-bg">
      {/* WhatsApp Profile / Chat Contact Header Card */}
      <div id="assistant-header" className="bg-[#202c33] border border-[#2a3942] rounded-2xl p-4 mb-6 shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative shrink-0">
          <img
            id="hadassa-avatar"
            src={TOPCELL_INFO.avatarUrl}
            alt={TOPCELL_INFO.assistantName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-3 border-[#00a884] object-cover bg-[#111b21] shadow-md"
          />
          <span className="absolute bottom-1 right-1 w-4 h-4 bg-[#00a884] border-2 border-[#202c33] rounded-full" />
        </div>

        <div className="text-center sm:text-left flex-1 min-w-0">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 mb-1">
            <h1 id="hadassa-name" className="text-2xl font-bold text-[#e9edef]">
              {TOPCELL_INFO.assistantName}
            </h1>
            <BadgeCheck className="w-6 h-6 text-[#00a884] fill-[#00a884]/20" title="Assistente Oficial" />
          </div>

          <p id="hadassa-description" className="text-[#8696a0] text-sm sm:text-base leading-snug mb-2">
            Assistente Virtual da TopCell Assistência Técnica
          </p>

          <div id="hadassa-online-status" className="inline-flex items-center gap-2 bg-[#111b21] px-3 py-1 rounded-full text-[#00a884] text-xs font-bold border border-[#00a884]/30">
            <span className="w-2.5 h-2.5 bg-[#00a884] rounded-full animate-pulse" />
            Atendimento Online no WhatsApp
          </div>
        </div>
      </div>



      {/* WhatsApp Interactive Quick Action Buttons Grid */}
      <div className="mb-2 text-xs font-bold text-[#8696a0] uppercase tracking-wider px-1">
        MENU DE OPÇÕES INTERATIVAS DO WHATSAPP:
      </div>

      <div id="action-buttons-grid" className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          id="btn-servicos"
          onClick={onSelectServices}
          className="min-h-[90px] bg-[#202c33] hover:bg-[#2a3942] border border-[#00a884]/40 hover:border-[#00a884] rounded-2xl text-white flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-md group"
        >
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#00a884]/50 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-colors shrink-0">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#e9edef]">Serviços</span>
            <span className="text-xs font-normal text-[#8696a0]">Troca de tela, bateria, conector</span>
          </div>
        </button>

        <button
          id="btn-orcamento"
          onClick={onSelectQuote}
          className="min-h-[90px] bg-[#202c33] hover:bg-[#2a3942] border border-[#00a884]/40 hover:border-[#00a884] rounded-2xl text-white flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-md group"
        >
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#00a884]/50 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-colors shrink-0">
            <Briefcase className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#e9edef]">Solicitar orçamento</span>
            <span className="text-xs font-normal text-[#8696a0]">Receba estimativa rápida</span>
          </div>
        </button>

        <button
          id="btn-localizacao"
          onClick={onSelectLocation}
          className="min-h-[90px] bg-[#202c33] hover:bg-[#2a3942] border border-[#00a884]/40 hover:border-[#00a884] rounded-2xl text-white flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-md group"
        >
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#00a884]/50 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-colors shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#e9edef]">Localização</span>
            <span className="text-xs font-normal text-[#8696a0]">Mercado de Frutas, Box</span>
          </div>
        </button>

        <button
          id="btn-horarios"
          onClick={onSelectHours}
          className="min-h-[90px] bg-[#202c33] hover:bg-[#2a3942] border border-[#00a884]/40 hover:border-[#00a884] rounded-2xl text-white flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-md group"
        >
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#00a884]/50 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-colors shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#e9edef]">Horários de atendimento</span>
            <span className="text-xs font-normal text-[#8696a0]">Das 07:00 às 14:00</span>
          </div>
        </button>

        <button
          id="btn-problema"
          onClick={onSelectDiagnostic}
          className="min-h-[90px] bg-[#202c33] hover:bg-[#2a3942] border border-[#00a884]/40 hover:border-[#00a884] rounded-2xl text-white flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-md group"
        >
          <div className="w-10 h-10 rounded-full bg-[#111b21] border border-[#00a884]/50 flex items-center justify-center text-[#00a884] group-hover:bg-[#00a884] group-hover:text-black transition-colors shrink-0">
            <Wrench className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[#e9edef]">Problema no celular</span>
            <span className="text-xs font-normal text-[#8696a0]">Diagnóstico de defeitos</span>
          </div>
        </button>

        <button
          id="btn-atendente"
          onClick={onSelectChat}
          className="min-h-[90px] bg-[#00a884] hover:bg-[#008f70] border border-[#00a884] rounded-2xl text-black flex items-center gap-4 p-4 text-left font-bold text-base transition-all duration-200 cursor-pointer shadow-lg group"
        >
          <div className="w-10 h-10 rounded-full bg-black/10 flex items-center justify-center text-black shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-black font-extrabold">Falar com atendente</span>
            <span className="text-xs font-semibold text-black/80">Iniciar conversa ao vivo</span>
          </div>
        </button>
      </div>
    </section>
  );
};


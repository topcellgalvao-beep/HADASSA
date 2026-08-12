import React from 'react';
import { X, Smartphone, BatteryCharging, Plug, Droplets, Cpu, Volume2, CheckCircle, ArrowRight, BadgeCheck } from 'lucide-react';
import { DEFAULT_SERVICES } from '../data/servicesData';

interface ServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuoteForService: (serviceTitle: string) => void;
}

const getIcon = (iconName: string) => {
  switch (iconName) {
    case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#00a884]" />;
    case 'BatteryCharging': return <BatteryCharging className="w-5 h-5 text-[#00a884]" />;
    case 'Plug': return <Plug className="w-5 h-5 text-[#00a884]" />;
    case 'Droplets': return <Droplets className="w-5 h-5 text-[#00a884]" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-[#00a884]" />;
    case 'Volume2': return <Volume2 className="w-5 h-5 text-[#00a884]" />;
    default: return <Smartphone className="w-5 h-5 text-[#00a884]" />;
  }
};

export const ServicesModal: React.FC<ServicesModalProps> = ({
  isOpen,
  onClose,
  onRequestQuoteForService,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="servicesModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl bg-[#111b21] border border-[#2a3942] rounded-2xl p-5 shadow-2xl relative text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2a3942]">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#202c33] rounded-full border border-[#00a884]/40">
              <Smartphone className="w-5 h-5 text-[#00a884]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#e9edef] flex items-center gap-1.5">
                Catálogo de Serviços TopCell
                <BadgeCheck className="w-5 h-5 text-[#00a884] fill-[#00a884]/20" />
              </h2>
              <p className="text-xs text-[#8696a0]">Oficial • Mercado de Frutas, Box</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#aebac1] hover:text-white p-2 rounded-full hover:bg-[#202c33] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-[#8696a0] text-sm mt-3 mb-4">
          Manutenção técnica multimarcas (Apple, Samsung, Motorola, Xiaomi, etc.) com peças testadas e garantia de serviço.
        </p>

        {/* Services List */}
        <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 scrollbar-thin">
          {DEFAULT_SERVICES.map((service) => (
            <div
              key={service.id}
              className="bg-[#202c33] border border-[#2a3942] hover:border-[#00a884]/60 rounded-2xl p-4 transition-all duration-200 shadow-md"
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-[#111b21] rounded-xl border border-[#2a3942] shrink-0">
                  {getIcon(service.iconName)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h3 className="text-base font-bold text-[#e9edef]">{service.title}</h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 bg-[#00a884]/20 text-[#00a884] rounded-full border border-[#00a884]/40 self-start sm:self-auto">
                      {service.averagePrice}
                    </span>
                  </div>

                  <p className="text-[#8696a0] text-sm leading-relaxed mb-3">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {service.commonIssues.map((issue, idx) => (
                      <span key={idx} className="text-xs bg-[#111b21] text-[#aebac1] px-2.5 py-1 rounded-md border border-[#2a3942] flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-[#00a884]" />
                        {issue}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-[#2a3942] text-xs text-[#8696a0]">
                    <span>Garantia & Prazo: <strong className="text-[#e9edef]">{service.timeEstimate}</strong></span>
                    <button
                      onClick={() => {
                        onClose();
                        onRequestQuoteForService(service.title);
                      }}
                      className="text-[#00a884] hover:underline font-bold inline-flex items-center gap-1 text-sm cursor-pointer"
                    >
                      Solicitar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-3 mt-3 border-t border-[#2a3942] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#00a884] hover:bg-[#008f70] text-black py-2.5 px-6 rounded-xl font-bold transition-colors cursor-pointer text-center"
          >
            Fechar Catálogo
          </button>
        </div>
      </div>
    </div>
  );
};


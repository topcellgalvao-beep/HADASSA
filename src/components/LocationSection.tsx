import React from 'react';
import { MapPin, Clock, Navigation, CheckCheck } from 'lucide-react';
import { TOPCELL_INFO } from '../data/servicesData';

interface LocationSectionProps {
  onOpenLocationModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ onOpenLocationModal }) => {
  return (
    <section id="location-hours-section" className="mt-8 mb-8">
      <h2 id="section-title-locais" className="text-[#8696a0] text-xs font-bold tracking-wider mb-3 uppercase px-1">
        LOCAIS E HORÁRIOS (LOCALIZAÇÃO EM TEMPO REAL)
      </h2>

      <div
        id="location-card-main"
        onClick={onOpenLocationModal}
        className="bg-[#202c33] border border-[#2a3942] hover:border-[#00a884] rounded-2xl p-4 flex items-center gap-4 transition-all duration-200 cursor-pointer group shadow-lg wa-tail-in relative"
      >
        <div id="location-icon-container" className="w-12 h-12 rounded-2xl bg-[#111b21] border border-[#00a884]/40 flex items-center justify-center text-2xl text-[#00a884] group-hover:scale-105 transition-transform shrink-0">
          📍
        </div>

        <div id="location-info-container" className="flex-1 min-w-0">
          <div id="location-hours-text" className="text-[#00a884] font-bold text-base sm:text-lg mb-0.5 flex flex-wrap items-center gap-2">
            <span>{TOPCELL_INFO.hours}</span>
            <span className="text-[10px] bg-[#00a884]/20 text-[#00a884] px-2 py-0.5 rounded-full border border-[#00a884]/40 font-bold uppercase">
              Atendimento Presencial
            </span>
          </div>

          <div id="location-name-text" className="text-[#e9edef] text-sm sm:text-base font-medium truncate">
            {TOPCELL_INFO.address}
          </div>
          
          <div className="text-xs text-[#8696a0] mt-1 flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-[#00a884]" />
            <span>Toque para ver detalhes da loja</span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <img
            id="help-small-avatar"
            src={TOPCELL_INFO.avatarUrl}
            alt={TOPCELL_INFO.assistantName}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-[#00a884] object-cover shadow-md"
          />
        </div>
      </div>
    </section>
  );
};


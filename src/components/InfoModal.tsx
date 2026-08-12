import React from 'react';
import { X } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  title: string;
  text: string;
  onClose: () => void;
  onRequestQuote?: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  title,
  text,
  onClose,
  onRequestQuote,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="infoModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#111b21] border border-[#2a3942] rounded-2xl p-5 shadow-2xl relative text-white">
        <button
          id="btn-close-info-icon"
          onClick={onClose}
          className="absolute top-4 right-4 text-[#aebac1] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 id="modalTitle" className="text-lg sm:text-xl font-bold mb-3 text-[#e9edef] flex items-center gap-2 pr-8">
          {title}
        </h2>

        <div className="bg-[#202c33] border border-[#2a3942] p-4 rounded-xl mb-5 wa-tail-in relative">
          <p id="modalText" className="text-[#e9edef] leading-relaxed text-xs sm:text-sm whitespace-pre-line">
            {text}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {onRequestQuote && (
            <button
              id="btn-info-action-quote"
              onClick={() => {
                onClose();
                onRequestQuote();
              }}
              className="flex-1 bg-[#00a884] hover:bg-[#008f70] text-black py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm transition-colors cursor-pointer text-center shadow-md"
            >
              Pedir Orçamento Agora
            </button>
          )}

          <button
            id="btn-close-info"
            onClick={onClose}
            className="w-full sm:w-auto bg-[#202c33] hover:bg-[#2a3942] text-[#8696a0] py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


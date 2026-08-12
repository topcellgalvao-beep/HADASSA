import React, { useState, useEffect } from 'react';
import { X, Briefcase, Sparkles, CheckCircle2, MessageSquare, BadgeCheck, Phone } from 'lucide-react';
import { TOPCELL_INFO } from '../data/servicesData';

interface QuoteModalProps {
  isOpen: boolean;
  initialService?: string;
  onClose: () => void;
  onSendToChat: (brand: string, model: string, issue: string) => void;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  initialService = '',
  onClose,
  onSendToChat,
}) => {
  const [brand, setBrand] = useState('Apple (iPhone)');
  const [model, setModel] = useState('');
  const [issue, setIssue] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [aiEvaluation, setAiEvaluation] = useState<string | null>(null);

  useEffect(() => {
    if (initialService) {
      setIssue(`Orçamento para: ${initialService}`);
    }
  }, [initialService]);

  if (!isOpen) return null;

  const handleEvaluateAI = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.trim() || !issue.trim()) return;

    setIsEvaluating(true);
    setAiEvaluation(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceBrand: brand,
          deviceModel: model,
          problemDescription: issue,
          messages: [{ role: 'user', text: `Solicito um orçamento preliminar para o celular ${brand} modelo ${model} com o seguinte defeito: ${issue}` }]
        })
      });
      const data = await response.json();
      setAiEvaluation(data.text || 'Entendi! Posso te atender no Mercado de Frutas, Box das 07:00 às 14:00 para uma avaliação presencial gratuita.');
    } catch (err) {
      setAiEvaluation('Ocorreu uma pequena falha na estimativa online. Traga seu aparelho diretamente ao Mercado de Frutas, Box para orçarmos sem custo na hora!');
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleOpenChatWithData = () => {
    onSendToChat(brand, model, issue);
    onClose();
  };

  const handleDirectWhatsApp = () => {
    const text = encodeURIComponent(
      `Olá TopCell! Gostaria de um orçamento:\n📱 Marca: ${brand}\n📦 Modelo: ${model || 'Não informado'}\n🔧 Problema: ${issue || 'Não informado'}`
    );
    window.open(`https://wa.me/${TOPCELL_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div
      id="quoteModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-lg bg-[#111b21] border border-[#2a3942] rounded-2xl p-5 shadow-2xl relative text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2a3942]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#202c33] rounded-full border border-[#00a884]/40">
              <Briefcase className="w-5 h-5 text-[#00a884]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#e9edef] flex items-center gap-1.5">
                Solicitar Orçamento no WhatsApp
              </h2>
              <p className="text-xs text-[#8696a0]">Pré-Análise Automática • TopCell</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#aebac1] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 my-3 pr-1">
          <p className="text-xs sm:text-sm text-[#8696a0] leading-relaxed">
            Informe a marca, o modelo do seu aparelho e o problema enfrentado. A assistente Hadassa fará a estimativa do serviço.
          </p>

          <form onSubmit={handleEvaluateAI} className="space-y-3.5">
            <div>
              <label className="block text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-1">
                Marca do Celular
              </label>
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3.5 py-2.5 text-[#e9edef] focus:outline-none focus:border-[#00a884] transition-colors text-sm"
              >
                <option value="Apple (iPhone)">Apple (iPhone)</option>
                <option value="Samsung">Samsung</option>
                <option value="Motorola">Motorola</option>
                <option value="Xiaomi / Redmi / Poco">Xiaomi / Redmi / Poco</option>
                <option value="LG">LG</option>
                <option value="Asus">Asus</option>
                <option value="Realme">Realme</option>
                <option value="Outra marca">Outra marca</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-1">
                Modelo exato
              </label>
              <input
                type="text"
                placeholder="Ex: iPhone 11, Moto G20, Galaxy A52..."
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3.5 py-2.5 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] transition-colors text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-1">
                Qual o problema / sintomas?
              </label>
              <textarea
                rows={3}
                placeholder="Ex: Tela trincou e parou o touch, bateria não carrega, caiu na água..."
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                required
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3.5 py-2.5 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] transition-colors text-sm resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isEvaluating || !model.trim() || !issue.trim()}
              className="w-full bg-[#00a884] hover:bg-[#008f70] disabled:opacity-50 text-black font-extrabold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md text-sm"
            >
              {isEvaluating ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Hadassa analisando...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Avaliar com IA Hadassa</span>
                </>
              )}
            </button>
          </form>

          {aiEvaluation && (
            <div className="bg-[#182229] border border-[#00a884]/40 rounded-2xl p-4 text-[#e9edef] animate-in fade-in wa-tail-in relative">
              <div className="flex items-center gap-2 font-bold text-[#00a884] mb-2 text-xs uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-[#00a884]" />
                <span>Resultado da Pré-Análise Hadassa</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-[#e9edef]">
                {aiEvaluation}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[#2a3942] flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={handleDirectWhatsApp}
            disabled={!model.trim() || !issue.trim()}
            className="flex-1 bg-[#00a884] hover:bg-[#008f70] disabled:opacity-50 text-black font-extrabold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm shadow-md"
          >
            <Phone className="w-4 h-4 text-black fill-black" />
            <span>Enviar WhatsApp (74 99980-4861)</span>
          </button>

          <button
            type="button"
            onClick={handleOpenChatWithData}
            disabled={!model.trim() || !issue.trim()}
            className="bg-[#202c33] hover:bg-[#2a3942] disabled:opacity-50 text-[#00a884] border border-[#00a884]/40 font-bold py-2.5 px-3 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-xs sm:text-sm"
          >
            <MessageSquare className="w-4 h-4 text-[#00a884]" />
            <span>Chat Hadassa</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="bg-[#202c33] hover:bg-[#2a3942] text-[#8696a0] font-bold py-2.5 px-3 rounded-xl transition-colors cursor-pointer text-xs sm:text-sm text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


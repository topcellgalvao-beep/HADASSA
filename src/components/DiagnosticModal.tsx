import React, { useState } from 'react';
import { X, Wrench, AlertTriangle, Clock, CheckCircle, Sparkles, BadgeCheck } from 'lucide-react';
import { DiagnosticResult } from '../types';

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestRepair: (brand: string, model: string, issue: string) => void;
}

const COMMON_SYMPTOMS = [
  'Não carrega / conector com folga',
  'Bateria descarrega muito rápido ou desliga sozinho',
  'Caiu na água / molhou (precisa desoxidação)',
  'Tela trincada / manchas no display / sem touch',
  'Travado na logo da marca (bootloop)',
  'Sem som no alto-falante ou microfone mudo',
  'Câmera não abre, treme ou foca mal',
  'Esquentando excessivamente'
];

export const DiagnosticModal: React.FC<DiagnosticModalProps> = ({
  isOpen,
  onClose,
  onRequestRepair,
}) => {
  const [brand, setBrand] = useState('Samsung');
  const [model, setModel] = useState('');
  const [selectedSymptom, setSelectedSymptom] = useState(COMMON_SYMPTOMS[0]);
  const [extraSymptoms, setExtraSymptoms] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);

  if (!isOpen) return null;

  const handleRunDiagnostic = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brand,
          model: model || 'Não informado',
          issue: selectedSymptom,
          symptoms: extraSymptoms
        })
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      setResult({
        possibleCauses: [
          'Possível problema interno no circuito de alimentação ou conector físico',
          'Degradação do componente por uso prolongado ou choque mecânico'
        ],
        recommendation: 'Recomendamos trazer o aparelho à loja no Mercado de Frutas, Box para diagnóstico presencial em bancada de testes.',
        estimatedTime: 'Avaliação presencial em até 20 minutos',
        repairDifficulty: 'Médio',
        advice: 'Evite utilizar carregadores piratas ou forçar os botões.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      id="diagnosticModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-[#111b21] border border-[#2a3942] rounded-2xl p-5 shadow-2xl relative text-white max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2a3942]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-[#202c33] rounded-full border border-[#00a884]/40">
              <Wrench className="w-5 h-5 text-[#00a884]" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-[#e9edef] flex items-center gap-1.5">
                Diagnóstico Técnico no WhatsApp
              </h2>
              <p className="text-xs text-[#8696a0]">Hadassa AI • TopCell Assistência</p>
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
            Selecione ou descreva o sintoma do seu celular para receber um parecer técnico preliminar antes de vir ao Mercado de Frutas, Box.
          </p>

          <form onSubmit={handleRunDiagnostic} className="space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">
                  Marca
                </label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3 py-2 text-[#e9edef] focus:outline-none focus:border-[#00a884] text-sm"
                >
                  <option value="Samsung">Samsung</option>
                  <option value="Apple (iPhone)">Apple (iPhone)</option>
                  <option value="Motorola">Motorola</option>
                  <option value="Xiaomi">Xiaomi / Redmi / Poco</option>
                  <option value="LG">LG</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">
                  Modelo (opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Moto G30, iPhone X..."
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3 py-2 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">
                Sintoma Principal
              </label>
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3 py-2 text-[#e9edef] focus:outline-none focus:border-[#00a884] text-sm"
              >
                {COMMON_SYMPTOMS.map((sym, idx) => (
                  <option key={idx} value={sym}>{sym}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">
                Outros detalhes ou observações
              </label>
              <input
                type="text"
                placeholder="Ex: Começou após uma queda de pouca altura..."
                value={extraSymptoms}
                onChange={(e) => setExtraSymptoms(e.target.value)}
                className="w-full bg-[#202c33] border border-[#2a3942] rounded-xl px-3 py-2 text-[#e9edef] placeholder-[#8696a0] focus:outline-none focus:border-[#00a884] text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00a884] hover:bg-[#008f70] disabled:opacity-50 text-black font-extrabold py-2.5 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm shadow-md"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Hadassa analisando sintomas...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Gerar Diagnóstico Técnico</span>
                </>
              )}
            </button>
          </form>

          {result && (
            <div className="bg-[#182229] border border-[#2a3942] rounded-2xl p-4 space-y-3 animate-in fade-in mt-3 wa-tail-in relative">
              <div className="flex items-center justify-between border-b border-[#2a3942] pb-2">
                <span className="text-xs font-bold text-[#00a884] flex items-center gap-1.5 uppercase">
                  <CheckCircle className="w-4 h-4 text-[#00a884]" />
                  Parecer Técnico Hadassa
                </span>
                <span className="text-[11px] bg-[#202c33] px-2.5 py-0.5 rounded-full text-[#8696a0] border border-[#2a3942]">
                  Dificuldade: <strong className="text-[#e9edef]">{result.repairDifficulty}</strong>
                </span>
              </div>

              <div>
                <h4 className="text-[11px] uppercase font-bold text-[#8696a0] mb-1">Causas Possíveis</h4>
                <ul className="list-disc list-inside text-xs sm:text-sm text-[#e9edef] space-y-1">
                  {result.possibleCauses?.map((cause, i) => (
                    <li key={i}>{cause}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#202c33] border border-amber-500/30 p-3 rounded-xl">
                <h4 className="text-xs uppercase font-bold text-amber-400 flex items-center gap-1 mb-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> Conselho do Técnico
                </h4>
                <p className="text-xs text-amber-200/90 leading-relaxed">
                  {result.advice}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8696a0] pt-2 border-t border-[#2a3942]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#00a884]" />
                  Previsão de reparo: <strong className="text-[#e9edef]">{result.estimatedTime}</strong>
                </span>
              </div>

              <p className="text-xs text-[#00a884] font-medium bg-[#111b21] p-2.5 rounded-xl border border-[#00a884]/30">
                📍 {result.recommendation}
              </p>
            </div>
          )}
        </div>

        <div className="pt-3 border-t border-[#2a3942] flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => {
              onClose();
              onRequestRepair(brand, model, selectedSymptom);
            }}
            className="flex-1 bg-[#00a884] hover:bg-[#008f70] text-black font-extrabold py-2.5 px-4 rounded-xl transition-colors text-center text-xs sm:text-sm cursor-pointer shadow-md"
          >
            Trazer para Reparo / Solicitar Orçamento
          </button>
          <button
            onClick={onClose}
            className="bg-[#202c33] hover:bg-[#2a3942] text-[#8696a0] font-bold py-2.5 px-4 rounded-xl transition-colors text-xs sm:text-sm cursor-pointer text-center"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};


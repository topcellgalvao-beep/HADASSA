import React, { useState, useEffect } from 'react';
import { X, Settings, Plus, Trash2, Sparkles, BadgeCheck } from 'lucide-react';
import { SkillItem } from '../types';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const [skills, setSkills] = useState<SkillItem[]>([]);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Serviços');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testPrompt, setTestPrompt] = useState('');
  const [testReply, setTestReply] = useState<string | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchSkills();
    }
  }, [isOpen]);

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/admin/skills');
      const data = await res.json();
      if (data.skills) {
        setSkills(data.skills);
      }
    } catch (err) {
      console.error('Erro ao carregar habilidades:', err);
    }
  };

  if (!isOpen) return null;

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/admin/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, content })
      });
      const data = await res.json();
      if (data.success) {
        setTitle('');
        setContent('');
        fetchSkills();
      }
    } catch (err) {
      console.error('Erro ao adicionar habilidade:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    try {
      await fetch(`/api/admin/skills/${id}`, { method: 'DELETE' });
      fetchSkills();
    } catch (err) {
      console.error('Erro ao remover habilidade:', err);
    }
  };

  const handleTestIA = async () => {
    if (!testPrompt.trim()) return;
    setIsTesting(true);
    setTestReply(null);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', text: testPrompt }]
        })
      });
      const data = await res.json();
      setTestReply(data.text || 'Nenhuma resposta gerada.');
    } catch (err) {
      setTestReply('Erro ao testar a IA.');
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div
      id="adminModal"
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
              <Settings className="w-5 h-5 text-[#00a884]" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#e9edef] flex items-center gap-1.5">
                Painel Administrativo WhatsApp
              </h2>
              <p className="text-xs text-[#8696a0]">Treinar Inteligência da Hadassa (TopCell)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#aebac1] hover:text-white p-1 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-5 my-3 pr-1 scrollbar-thin">
          {/* Add New Skill Form */}
          <div className="bg-[#202c33] border border-[#2a3942] rounded-2xl p-4">
            <h3 className="text-sm font-bold text-[#e9edef] mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#00a884]" />
              Adicionar Nova Habilidade / Conhecimento
            </h3>

            <form onSubmit={handleAddSkill} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">Título</label>
                  <input
                    type="text"
                    placeholder="Ex: Troca de vidro com laminadora..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full bg-[#111b21] border border-[#2a3942] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#e9edef] focus:outline-none focus:border-[#00a884]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">Categoria</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#111b21] border border-[#2a3942] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#e9edef] focus:outline-none focus:border-[#00a884]"
                  >
                    <option value="Serviços">Serviços</option>
                    <option value="Políticas">Políticas</option>
                    <option value="Preços">Preços</option>
                    <option value="Garantia">Garantia</option>
                    <option value="Informação">Informação</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#8696a0] uppercase mb-1">Instrução para a IA</label>
                <textarea
                  rows={3}
                  placeholder="Instrua como a Hadassa deve responder aos clientes sobre este tópico..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  className="w-full bg-[#111b21] border border-[#2a3942] rounded-xl px-3 py-2 text-xs sm:text-sm text-[#e9edef] focus:outline-none focus:border-[#00a884] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !title.trim() || !content.trim()}
                className="w-full bg-[#00a884] hover:bg-[#008f70] disabled:opacity-50 text-black font-extrabold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition-colors cursor-pointer"
              >
                {isSubmitting ? 'Salvando...' : 'Salvar Habilidade no WhatsApp'}
              </button>
            </form>
          </div>

          {/* Skill List */}
          <div>
            <h3 className="text-xs font-bold text-[#8696a0] uppercase tracking-wider mb-2.5">
              Habilidades Ativas ({skills.length})
            </h3>

            {skills.length === 0 ? (
              <p className="text-xs text-[#8696a0] italic p-4 bg-[#202c33] rounded-xl text-center border border-[#2a3942]">
                Nenhuma habilidade personalizada registrada.
              </p>
            ) : (
              <div className="space-y-2">
                {skills.map((skill) => (
                  <div
                    key={skill.id}
                    className="bg-[#202c33] border border-[#2a3942] rounded-xl p-3 flex items-start justify-between gap-3"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-[#00a884]/20 text-[#00a884] rounded border border-[#00a884]/40">
                          {skill.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-[#e9edef]">{skill.title}</h4>
                      </div>
                      <p className="text-xs text-[#8696a0] leading-relaxed">{skill.content}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="text-[#8696a0] hover:text-red-400 p-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer shrink-0"
                      title="Excluir habilidade"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Test Hadassa Intelligence */}
          <div className="bg-[#182229] border border-[#00a884]/30 rounded-2xl p-4">
            <h3 className="text-xs font-bold text-[#00a884] mb-2 flex items-center gap-2 uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Testar Resposta da Hadassa
            </h3>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Pergunte algo sobre a TopCell para testar..."
                value={testPrompt}
                onChange={(e) => setTestPrompt(e.target.value)}
                className="flex-1 bg-[#202c33] border border-[#2a3942] rounded-xl px-3 py-2 text-xs text-[#e9edef] focus:outline-none"
              />
              <button
                onClick={handleTestIA}
                disabled={isTesting || !testPrompt.trim()}
                className="bg-[#00a884] hover:bg-[#008f70] text-black font-extrabold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer disabled:opacity-50 shrink-0"
              >
                {isTesting ? 'Testando...' : 'Testar'}
              </button>
            </div>

            {testReply && (
              <div className="mt-3 p-3 bg-[#202c33] rounded-xl border border-[#2a3942] text-xs text-[#e9edef] leading-relaxed wa-tail-in relative">
                <strong className="text-[#00a884]">Hadassa:</strong> {testReply}
              </div>
            )}
          </div>
        </div>

        <div className="pt-3 border-t border-[#2a3942] flex justify-end">
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-[#00a884] hover:bg-[#008f70] text-black py-2.5 px-6 rounded-xl font-bold text-xs sm:text-sm transition-colors cursor-pointer text-center"
          >
            Concluir
          </button>
        </div>
      </div>
    </div>
  );
};


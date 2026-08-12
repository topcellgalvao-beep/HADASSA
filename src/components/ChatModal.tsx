import React, { useState, useRef, useEffect } from 'react';
import { X, Send, RefreshCw, BadgeCheck, Phone, Video, Smile, Paperclip, Mic, CheckCheck } from 'lucide-react';
import { ChatMessage } from '../types';
import { TOPCELL_INFO } from '../data/servicesData';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  initialPrompt,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'bot',
      text: 'Olá! Sou a Hadassa, assistente da TopCell. Como posso ajudar você hoje com seu celular?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 300);

      if (initialPrompt && initialPrompt.trim()) {
        handleSendMessage(initialPrompt);
      }
    }
  }, [isOpen, initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleCallWhatsApp = () => {
    window.open(`https://wa.me/${TOPCELL_INFO.whatsappNumber}?text=${encodeURIComponent('Olá! Gostaria de falar com a TopCell.')}`, '_blank');
  };

  if (!isOpen) return null;

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || isTyping) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!customText) setInput('');
    setIsTyping(true);

    try {
      const historyForApi = messages.concat(userMsg).map((m) => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi })
      });

      const data = await response.json();
      const botText = data.text || 'Entendi! Qualquer dúvida sobre localização (Mercado de Frutas, Box) ou horários (07:00 às 14:00), estou à disposição!';

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const fallbackMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        text: 'Entendi! Vou verificar essa informação para você. Caso eu não tenha essa informação no momento, estarei passando isso para o meu patrão e ele já retorna.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        role: 'bot',
        text: 'Atendimento reiniciado. Como posso te ajudar com seu celular agora?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div
      id="chatModal"
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-xl bg-[#111b21] border border-[#2a3942] rounded-2xl p-0 shadow-2xl relative text-white flex flex-col h-[650px] max-h-[95vh] overflow-hidden">
        {/* WhatsApp Chat Header */}
        <div className="bg-[#202c33] border-b border-[#2a3942] px-4 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative shrink-0">
              <img
                src={TOPCELL_INFO.avatarUrl}
                alt="Hadassa"
                className="w-10 h-10 rounded-full border-2 border-[#00a884] object-cover bg-[#111b21]"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#00a884] rounded-full border-2 border-[#202c33]" />
            </div>

            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1 font-bold text-white text-base truncate">
                <span className="truncate">TopCell • Hadassa</span>
                <BadgeCheck className="w-4 h-4 text-[#00a884] fill-[#00a884]/20 shrink-0" />
              </div>
              <p className="text-xs text-[#00a884] font-medium truncate">online • Conta Comercial</p>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <button
              onClick={handleCallWhatsApp}
              title="Chamada de vídeo no WhatsApp (74 99980-4861)"
              className="p-1.5 sm:p-2 text-[#aebac1] hover:text-[#00a884] hover:bg-[#111b21] rounded-full transition-colors cursor-pointer"
            >
              <Video className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleCallWhatsApp}
              title="Ligar no WhatsApp (74 99980-4861)"
              className="p-1.5 sm:p-2 text-[#aebac1] hover:text-[#00a884] hover:bg-[#111b21] rounded-full transition-colors cursor-pointer"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={handleClearChat}
              title="Limpar conversa"
              className="p-1.5 sm:p-2 text-[#aebac1] hover:text-white hover:bg-[#111b21] rounded-full transition-colors cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              title="Fechar chat"
              className="p-1.5 sm:p-2 text-[#aebac1] hover:text-white hover:bg-[#111b21] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* WhatsApp Quick Reply Suggestion Chips */}
        <div className="bg-[#182229] border-b border-[#2a3942] px-3 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <span className="text-[11px] text-[#8696a0] font-bold uppercase shrink-0">Atalhos:</span>
          <button
            onClick={() => handleSendMessage('Qual o valor para trocar a tela do meu celular?')}
            className="text-xs bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] px-3 py-1 rounded-full border border-[#00a884]/30 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            📱 Troca de Tela
          </button>
          <button
            onClick={() => handleSendMessage('Quanto custa a troca de bateria?')}
            className="text-xs bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] px-3 py-1 rounded-full border border-[#00a884]/30 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            🔋 Troca de Bateria
          </button>
          <button
            onClick={() => handleSendMessage('Qual o endereço e horário da assistência?')}
            className="text-xs bg-[#202c33] hover:bg-[#2a3942] text-[#00a884] px-3 py-1 rounded-full border border-[#00a884]/30 whitespace-nowrap cursor-pointer transition-colors font-medium"
          >
            📍 Localização e Horário
          </button>
        </div>

        {/* WhatsApp Chat Messages Box with Doodle Pattern */}
        <div id="chatMessages" className="flex-1 overflow-y-auto p-4 space-y-3 wa-chat-bg scrollbar-thin">
          <div className="flex justify-center my-1">
            <span className="text-[11px] font-bold uppercase bg-[#182229] text-[#8696a0] px-3 py-1 rounded-lg border border-[#2a3942] shadow-sm">
              Mensagens Criptografadas de Ponta a Ponta • Hoje
            </span>
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col max-w-[85%] ${
                msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
              }`}
            >
              <div
                className={`p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap relative shadow-md ${
                  msg.role === 'user'
                    ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none wa-tail-out'
                    : 'bg-[#202c33] text-[#e9edef] rounded-tl-none wa-tail-in border border-[#2a3942]'
                }`}
              >
                {msg.text}
                <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-[#8696a0] select-none">
                  <span>{msg.timestamp}</span>
                  {msg.role === 'user' && (
                    <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                  )}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 bg-[#202c33] p-3 rounded-2xl rounded-tl-none text-xs text-[#8696a0] w-fit border border-[#2a3942] wa-tail-in shadow-md">
              <span className="w-2 h-2 bg-[#00a884] rounded-full animate-ping" />
              <span className="text-[#00a884] font-medium">Hadassa digitando...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* WhatsApp Bottom Chat Input Bar */}
        <div className="bg-[#202c33] border-t border-[#2a3942] p-2 sm:p-3 flex items-center gap-2 shrink-0">
          <button
            type="button"
            className="p-2 text-[#8696a0] hover:text-white rounded-full transition-colors cursor-pointer"
            title="Inserir Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>

          <button
            type="button"
            className="p-2 text-[#8696a0] hover:text-white rounded-full transition-colors cursor-pointer"
            title="Anexar arquivo"
          >
            <Paperclip className="w-5 h-5" />
          </button>

          <input
            id="chatInput"
            ref={inputRef}
            type="text"
            placeholder="Mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isTyping}
            className="flex-1 bg-[#2a3942] text-[#e9edef] text-sm px-4 py-2.5 rounded-xl focus:outline-none placeholder-[#8696a0] disabled:opacity-50 border border-transparent focus:border-[#00a884]/50"
          />

          {input.trim() ? (
            <button
              onClick={() => handleSendMessage()}
              disabled={isTyping}
              className="bg-[#00a884] hover:bg-[#008f70] text-black p-2.5 rounded-full transition-all cursor-pointer shadow-md shrink-0"
            >
              <Send className="w-5 h-5" />
            </button>
          ) : (
            <button
              type="button"
              className="bg-[#2a3942] text-[#8696a0] hover:text-white p-2.5 rounded-full transition-colors cursor-pointer shrink-0"
              title="Áudio"
            >
              <Mic className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


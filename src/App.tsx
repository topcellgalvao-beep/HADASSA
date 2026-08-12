import React, { useState } from 'react';
import { Header } from './components/Header';
import { MainChatView } from './components/MainChatView';
import { InfoModal } from './components/InfoModal';
import { ServicesModal } from './components/ServicesModal';
import { QuoteModal } from './components/QuoteModal';
import { DiagnosticModal } from './components/DiagnosticModal';
import { AdminModal } from './components/AdminModal';

export default function App() {
  const [activeTab, setActiveTab] = useState('CONVERSAS');

  // Modal states
  const [infoModal, setInfoModal] = useState<{
    isOpen: boolean;
    title: string;
    text: string;
    onRequestQuote?: () => void;
  }>({
    isOpen: false,
    title: '',
    text: '',
  });

  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [quoteInitialService, setQuoteInitialService] = useState('');
  const [isDiagnosticOpen, setIsDiagnosticOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Handlers matching HTML showInfo specifications
  const handleShowInfo = (title: string, text: string, onRequestQuote?: () => void) => {
    setInfoModal({
      isOpen: true,
      title,
      text,
      onRequestQuote,
    });
  };

  const handleServicesClick = () => {
    setIsServicesOpen(true);
  };

  const handleQuoteClick = () => {
    setIsQuoteOpen(true);
  };

  const handleLocationClick = () => {
    handleShowInfo(
      'Localização & Atendimento Presencial',
      'Nossa assistência física está localizada no Mercado de Frutas, Box. Atendimento de Segunda a Sábado, das 07:00 às 14:00.',
      () => setIsQuoteOpen(true)
    );
  };

  const handleDiagnosticClick = () => {
    setIsDiagnosticOpen(true);
  };

  const handleSendQuoteToChat = (brand: string, model: string, issue: string) => {
    const promptText = `Olá Hadassa! Gostaria de um orçamento para o celular marca "${brand}", modelo "${model}". Problema: ${issue}`;
    setChatInitialPrompt(promptText);
  };

  const handleDiagnosticRequestRepair = (brand: string, model: string, issue: string) => {
    setQuoteInitialService(`${issue} (${brand} ${model})`);
    setIsQuoteOpen(true);
  };

  const handleSelectTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'SERVIÇOS') {
      setIsServicesOpen(true);
    } else if (tab === 'ORÇAMENTOS') {
      setIsQuoteOpen(true);
    } else if (tab === 'LOJA') {
      handleLocationClick();
    }
  };

  return (
    <div id="topcell-app" className="min-h-screen bg-[#0b141a] text-white font-sans selection:bg-[#00a884] selection:text-black flex flex-col">
      {/* WhatsApp Header Bar */}
      <Header
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenChat={() => setActiveTab('CONVERSAS')}
        activeTab={activeTab}
        onSelectTab={handleSelectTab}
      />

      {/* Main Container: Chat Window directly on the screen */}
      <main id="topcell-container" className="w-full max-w-2xl mx-auto px-2 sm:px-4 flex-1 flex flex-col justify-center">
        <MainChatView
          initialPrompt={chatInitialPrompt}
          onOpenServices={handleServicesClick}
          onOpenQuote={handleQuoteClick}
          onOpenDiagnostic={handleDiagnosticClick}
          onOpenLocation={handleLocationClick}
        />
      </main>

      {/* Modals */}
      <InfoModal
        isOpen={infoModal.isOpen}
        title={infoModal.title}
        text={infoModal.text}
        onClose={() => setInfoModal((prev) => ({ ...prev, isOpen: false }))}
        onRequestQuote={infoModal.onRequestQuote}
      />

      <ServicesModal
        isOpen={isServicesOpen}
        onClose={() => setIsServicesOpen(false)}
        onRequestQuoteForService={(serviceTitle) => {
          setQuoteInitialService(serviceTitle);
          setIsQuoteOpen(true);
        }}
      />

      <QuoteModal
        isOpen={isQuoteOpen}
        initialService={quoteInitialService}
        onClose={() => setIsQuoteOpen(false)}
        onSendToChat={handleSendQuoteToChat}
      />

      <DiagnosticModal
        isOpen={isDiagnosticOpen}
        onClose={() => setIsDiagnosticOpen(false)}
        onRequestRepair={handleDiagnosticRequestRepair}
      />

      <AdminModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
    </div>
  );
}


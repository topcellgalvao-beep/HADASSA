import { ServiceItem } from '../types';
import hadassaAvatar from '../assets/images/hadassa_avatar_1786511576437.jpg';

export const DEFAULT_SERVICES: ServiceItem[] = [
  {
    id: 'tela',
    title: 'Troca de Tela / Display',
    iconName: 'Smartphone',
    description: 'Substituição completa de tela quebrada, touch sem resposta, manchas pretas ou linhas coloridas no display.',
    averagePrice: 'A partir de R$ 120,00',
    timeEstimate: '40 min a 2 horas (mesmo dia)',
    commonIssues: ['Vidro trincado', 'Touch falhando', 'Tela preta', 'Linhas na tela', 'Vazamento de cristal líquido']
  },
  {
    id: 'bateria',
    title: 'Troca de Bateria',
    iconName: 'BatteryCharging',
    description: 'Substituição de bateria viciada, estufada, descarregando rápido ou fazendo o celular desligar sozinho.',
    averagePrice: 'A partir de R$ 80,00',
    timeEstimate: '30 min a 1 hora',
    commonIssues: ['Bateria descarrega rápido', 'Aparelho esquenta muito', 'Bateria estufada (empurrando a tela)', 'Desliga em 20% ou 30%']
  },
  {
    id: 'conector',
    title: 'Conector de Carga (Porta USB/Type-C/Lightning)',
    iconName: 'Plug',
    description: 'Reparo ou troca da conector com mau contato, sujeira, pinos quebrados ou que não segura o cabo.',
    averagePrice: 'A partir de R$ 70,00',
    timeEstimate: '1 a 2 horas',
    commonIssues: ['Cabo fica folgado', 'Só carrega em uma posição', 'Não reconhece carregador', 'Mensagem de umidade']
  },
  {
    id: 'desoxidacao',
    title: 'Banho Químico / Desoxidação (Aparelho Molhado)',
    iconName: 'Droplets',
    description: 'Limpeza ultrassônica e desoxidação técnica da placa-mãe de celulares que caíram na água ou piscina.',
    averagePrice: 'A partir de R$ 100,00',
    timeEstimate: '24 a 48 horas',
    commonIssues: ['Caiu na água/sanitário', 'Molhou na chuva', 'Aparelho esquentou e desligou após molhar']
  },
  {
    id: 'software',
    title: 'Software, Formatação e Desbloqueios',
    iconName: 'Cpu',
    description: 'Reinstalação do sistema Android/iOS, remoção de vírus, travamentos na logo (loop infinito) e restauração.',
    averagePrice: 'A partir de R$ 60,00',
    timeEstimate: '1 a 3 horas',
    commonIssues: ['Travado na logo da marca', 'Memória cheia e lentidão', 'Erros de sistema', 'Aparelho reiniciando']
  },
  {
    id: 'componentes',
    title: 'Câmeras, Alto-falantes e Microfones',
    iconName: 'Volume2',
    description: 'Reparo de som baixo no áudio do WhatsApp, viva-voz, microfone abafado ou câmera embaçada/sem foco.',
    averagePrice: 'A partir de R$ 70,00',
    timeEstimate: '1 a 2 horas',
    commonIssues: ['Sem som nas ligações', 'Microfone não capta voz', 'Câmera treme ou foca mal', 'Ninguém me escuta']
  }
];

export const TOPCELL_INFO = {
  name: "TopCell Assistência Técnica",
  subtitle: "Assistência técnica em celulares e dispositivos móveis",
  address: "Mercado de Frutas, Box",
  city: "Local",
  hours: "Das 07:00 às 14:00",
  whatsappNumber: "5574999804861",
  assistantName: "Hadassa",
  avatarUrl: hadassaAvatar,
  welcomeMessage: '"Olá! Eu sou a assistente virtual da TopCell. Estou aqui para ajudar você com informações sobre nossos serviços, horários, localização e atendimento."'
};

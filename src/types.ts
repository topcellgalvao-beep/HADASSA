export interface ChatMessage {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
  isDiagnostic?: boolean;
}

export interface SkillItem {
  id: string;
  title: string;
  category: string;
  content: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  averagePrice: string;
  timeEstimate: string;
  commonIssues: string[];
}

export interface DiagnosticResult {
  possibleCauses: string[];
  recommendation: string;
  estimatedTime: string;
  repairDifficulty: string;
  advice: string;
}

export interface QuoteRequestData {
  brand: string;
  model: string;
  issue: string;
  symptoms?: string;
  customerName?: string;
  phone?: string;
}

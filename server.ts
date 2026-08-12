import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Store custom knowledge/skills added via Admin
let customKnowledge: { id: string; title: string; content: string; category: string }[] = [
  {
    id: "1",
    title: "Garantia dos Serviços",
    category: "Políticas",
    content: "Oferecemos garantia de 90 dias para serviços de substituição de peças (telas, baterias, conectores) contra defeitos de fabricação."
  },
  {
    id: "2",
    title: "Aparelho que Molhou (Desoxidação)",
    category: "Serviços",
    content: "Caso o aparelho tenha caído na água, deslique-o imediatamente e traga o quanto antes para realizarmos o processo de banho químico/desoxidação técnica antes de tentar carregar."
  },
  {
    id: "3",
    title: "Prazo de Execução",
    category: "Informação",
    content: "Troca de tela e bateria costumam ser efetuadas no mesmo dia caso tenhamos a peça em estoque. Demais reparos levam entre 24h e 48h."
  }
];

// Lazily initialize Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY não está configurada nos segredos.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// GET /api/admin/skills - Retrieve custom knowledge base
app.get("/api/admin/skills", (req, res) => {
  res.json({ skills: customKnowledge });
});

// POST /api/admin/skills - Add new skill/knowledge
app.post("/api/admin/skills", (req, res) => {
  const { title, content, category } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Título e conteúdo são obrigatórios." });
  }
  const newSkill = {
    id: Date.now().toString(),
    title: title.trim(),
    content: content.trim(),
    category: (category || "Geral").trim()
  };
  customKnowledge.push(newSkill);
  res.json({ success: true, skill: newSkill, total: customKnowledge.length });
});

// DELETE /api/admin/skills/:id
app.delete("/api/admin/skills/:id", (req, res) => {
  const { id } = req.params;
  customKnowledge = customKnowledge.filter(s => s.id !== id);
  res.json({ success: true, total: customKnowledge.length });
});

// POST /api/chat - Hadassa Assistant Chat Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages, deviceBrand, deviceModel, problemDescription } = req.body;

    const ai = getGeminiClient();

    // Prepare custom knowledge context
    const knowledgeText = customKnowledge.length > 0
      ? "\n\nBase de conhecimento adicional fornecida pelo administrador:\n" +
        customKnowledge.map(k => `- [${k.category}] ${k.title}: ${k.content}`).join("\n")
      : "";

    const systemInstruction = `Você é Hadassa, a assistente virtual amigável, atenciosa, ágil e altamente capacitada da TopCell Assistência Técnica.
A TopCell é uma assistência técnica profissional em manutenção de celulares e dispositivos móveis.
Informações da Assistência:
- Localização: Mercado de Frutas, Box.
- Horário de Atendimento: Todos os dias das 07:00 às 14:00.
- Serviços principais: Troca de tela/display (iPhone, Samsung, Motorola, Xiaomi, etc.), substituição de bateria, reparo de conector de carga/porta USB, recuperação de celulares molhados (desoxidação), problemas de software/bootloop, formatação e restauração, remoção de contas/desbloqueio técnico, troca de alto-falantes e câmeras, e diagnóstico técnico geral.

Comportamento e Instruções de Atendimento:
- Responda em Português do Brasil com tom caloroso, prestativo e profissional.
- Se o cliente perguntar sobre orçamentos ou problemas, solicite carinhosamente a Marca e o Modelo do aparelho se ele ainda não informou.
- Forneça explicações técnicas simples de entender (por exemplo, causas possíveis para bateria descarregando rápido, tela tremendo ou conector com folga).
- Lembre o cliente de que ele pode vir diretamente à nossa loja no Mercado de Frutas, Box, no horário das 07:00 às 14:00 para fazermos a avaliação física presencial sem compromisso.
- Mantenha respostas organizadas com tópicos ou parágrafos curtos.${knowledgeText}`;

    // Format conversation history for Gemini contents or construct prompt
    let fullPrompt = "";
    if (deviceBrand || deviceModel || problemDescription) {
      fullPrompt += `[SISTEMA: O usuário enviou dados estruturados do aparelho: Marca: "${deviceBrand || "Não informada"}", Modelo: "${deviceModel || "Não informado"}", Problema relatado: "${problemDescription || "Não especificado"}"]\n\n`;
    }

    if (Array.isArray(messages) && messages.length > 0) {
      // Build text conversation context
      const historyStr = messages
        .map((m: { role: string; text: string }) => `${m.role === "user" ? "Cliente" : "Hadassa"}: ${m.text}`)
        .join("\n");
      fullPrompt += historyStr;
    } else {
      fullPrompt += "Cliente: Olá Hadassa, preciso de ajuda com meu celular.";
    }

    const geminiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: fullPrompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const responseText = geminiResponse.text || "Desculpe, tive um breve imprevisto ao processar sua solicitação. Como posso te ajudar novamente?";

    res.json({ text: responseText });
  } catch (error: any) {
    console.error("Erro na API de chat com a Hadassa:", error);
    res.status(500).json({
      error: "Ocorreu um erro ao comunicar com a assistente Hadassa.",
      message: error.message || "Verifique se a chave do Gemini está configurada."
    });
  }
});

// POST /api/diagnose - Cellular Troubleshooting & Diagnostics AI
app.post("/api/diagnose", async (req, res) => {
  try {
    const { brand, model, issue, symptoms } = req.body;

    const ai = getGeminiClient();

    const prompt = `Analise o seguinte problema de celular e forneça um diagnóstico preliminar, causas prováveis e estimativa de reparo na TopCell Assistência Técnica:
Marca: ${brand || "Desconhecida"}
Modelo: ${model || "Desconhecido"}
Problema Principal: ${issue || "Não informado"}
Sintomas adicionais: ${symptoms || "Nenhum"}

Forneça a resposta em formato JSON contendo:
- possibleCauses: array de strings com as possíveis causas do defeito
- recommendation: instrução clara de o que fazer (ex: não tentar ligar, trazer no Mercado de Frutas Box)
- estimatedTime: estimativa de tempo médio para o reparo (ex: "Mesmo dia (1 a 2 horas)", "24 horas")
- repairDifficulty: "Simples", "Médio" ou "Avançado"
- advice: conselho ou cuidado para não danificar mais o dispositivo`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "Você é um técnico especialista em celular da TopCell. Forneça diagnósticos concisos e precisos em formato JSON."
      }
    });

    let jsonResult = {};
    try {
      jsonResult = JSON.parse(response.text || "{}");
    } catch {
      jsonResult = {
        possibleCauses: ["Defeito físico ou de componente interno"],
        recommendation: "Traga seu aparelho no Mercado de Frutas, Box para análise com nossos técnicos.",
        estimatedTime: "Sob consulta presencial",
        repairDifficulty: "Médio",
        advice: "Evite forçar o encaixe de carregadores ou pressionar a tela danificada."
      };
    }

    res.json(jsonResult);
  } catch (error: any) {
    console.error("Erro no diagnóstico de celular:", error);
    res.status(500).json({
      possibleCauses: ["Falha de hardware/software"],
      recommendation: "Recomendamos trazer o aparelho à loja no Mercado de Frutas, Box para diagnóstico presencial gratuito das 07:00 às 14:00.",
      estimatedTime: "Avaliação rápida no balcão",
      repairDifficulty: "A avaliar",
      advice: "Mantenha o celular desligado se houver suspeita de água ou bateria estufada."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[TopCell Server] Servidor rodando na porta ${PORT}`);
  });
}

startServer();

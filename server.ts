import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini AI Client on server
  const getGenAI = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in environment variables");
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  };

  // Health check endpoint
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini Chatbot Endpoint for Portfolio Playground
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        return res.status(500).json({
          error:
            "GEMINI_API_KEY belum diatur. Isi .env dengan API key Gemini yang valid (lihat https://aistudio.google.com/apikey), lalu restart server.",
        });
      }

      const ai = getGenAI();

      const systemInstruction = `You are the AI Assistant for Mubessirul Ummah's personal portfolio website.
Your goal is to answer questions from recruiters, collaborators, and visitors about Mubessirul Ummah in a friendly, professional, articulate, and impressive tone (in English or Indonesian depending on the user's language).

About Mubessirul Ummah:
- Role: AI Engineer | Generative AI | Computer Vision | AI Automation Specialist & Fullstack Developer
- Location: Bangkalan, East Java, Indonesia
- Email: mubarijojo.ummah11@gmail.com | Phone: +62 857-4867-3497
- LinkedIn: linkedin.com/in/mubessirulummah | GitHub: github.com/210411100140-MubessirulUmmah
- Education: Bachelor of Informatics Engineering, Universitas Trunojoyo Madura (Aug 2021 – Oct 2025), GPA 3.85 / 4.00.

Key Work Experience:
1. AI Automation — PT Valord Masculine Group (Dec 2025 – Present / Jul 2026):
   - Designed & implemented AI automation solutions using Generative AI, workflow automation (Make.com, n8n, OpenAI API), reducing manual content production.
   - Built internal web platforms: VMG Elite (payroll, attendance, Kanban, KPI scoreboard, chat with Supabase & Google OAuth) and Valord Spark Night x Chindo Swipe (matchmaking & voting app).
   - PIC for Jagat Aroma perfume exhibition & content marketing script generation.

2. Research Assistant — Universitas Trunojoyo Madura (Nov 2024 – Dec 2025):
   - Developed deep learning models (YOLOv8, Flask, MySQL) for medical CT Scan lung abnormality detection.
   - Drafted patent Application No. S00202416178 (patent-pending). Exhibited at KPPTI & Trunojoyo Innovation Contest.

3. Research Intern — BRIN (Badan Riset dan Inovasi Nasional) (Feb 2024 – Jul 2024):
   - Developed SMAW welding defect detection system using Mask R-CNN & DETR. Registered DGIP copyright & co-authored paper in Taylor & Francis & CORISINDO.

4. Web Developer Intern — Diskominfo Sumenep (Dec 2023 – Jan 2024):
   - Developed official Satpol PP Sumenep website using CodeIgniter, PHP, MySQL, Figma.

5. Lab Teaching Assistant — Universitas Trunojoyo Madura (Aug 2022 – Dec 2022).

Publications:
1. Taylor & Francis (Welding International, 2026): "Deep learning-based on detection transformer (DETR) for defect identification in shielded metal arc welding plates joint".
2. ICTS 2026 (15th Intl Conference on ICTS): "Disease Detection in Rice Plant Leaves based on Mask R-CNN".
3. CORISINDO 2024: "Implementation of Mask R-CNN for Identifying Defects in SMAW Welding".

Technical Skills:
- Languages: Python, JavaScript, TypeScript, Kotlin, PHP, SQL
- AI/ML/CV: PyTorch, TensorFlow, OpenCV, YOLOv8, DETR, Mask R-CNN, CNN, Transformers, NLP, Deep Learning
- GenAI & Automation: Prompt Engineering, Make.com, n8n, OpenAI, Gemini API, AI Workflows
- Fullstack & Web: React, Next.js, Flask, Supabase, MySQL, CodeIgniter, Tailwind CSS, REST APIs
- Tools & DevOps: Docker, Git, GitHub, Hugging Face, Google Colab, Figma, Vercel

Provide informative, polite, concise answers with formatting (bullet points, bold text). Highlight key achievements when applicable!`;

      // Format previous chat history if provided
      const formattedHistory = Array.isArray(history)
        ? history.map((msg: { role: string; content: string }) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          }))
        : [];

      const chat = ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction,
          temperature: 0.7,
        },
        history: formattedHistory,
      });

      const response = await chat.sendMessage({ message });
      const replyText = response.text || "Sorry, I couldn't generate a response at this time.";

      return res.json({ reply: replyText });
    } catch (error: any) {
      console.error("Error in /api/chat:", error);
      return res.status(500).json({
        error: "Failed to communicate with AI Assistant.",
        details: error.message || "Unknown error",
      });
    }
  });

  // Direct Contact Form Endpoint — sends via your own Gmail account (SMTP),
  // no third-party form service. See api/contact.ts for the Vercel
  // production version and setup notes (App Password required).
  app.post("/api/contact", async (req, res) => {
    try {
      const { name, email, subject, message } = req.body;
      if (!name || !email || !message) {
        return res.status(400).json({ error: "Nama, email, dan pesan wajib diisi." });
      }

      const gmailUser = process.env.GMAIL_USER;
      const gmailPass = process.env.GMAIL_APP_PASSWORD;

      if (!gmailUser || !gmailPass) {
        return res.status(500).json({
          error: "GMAIL_USER / GMAIL_APP_PASSWORD belum diatur di .env.",
        });
      }

      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transport.sendMail({
        from: `"Portofolio - ${name}" <${gmailUser}>`,
        to: gmailUser,
        replyTo: email,
        subject: subject || `Pesan dari ${name} via Portofolio`,
        text: `Dari: ${name} (${email})\n\n${message}`,
        html: `<p><strong>Dari:</strong> ${name} (${email})</p><p>${String(message).replace(/\n/g, "<br/>")}</p>`,
      });

      return res.json({ success: true, message: "Pesan Anda telah terkirim!" });
    } catch (error: any) {
      console.error("Error in /api/contact:", error);
      return res.status(500).json({
        error: "Gagal mengirim pesan. Pastikan GMAIL_USER dan GMAIL_APP_PASSWORD sudah benar.",
        details: error?.message,
      });
    }
  });

  // Setup Vite or Static File Serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});

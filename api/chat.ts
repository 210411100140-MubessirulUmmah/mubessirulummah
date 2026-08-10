import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI } from '@google/genai';

// NOTE: This file is a Vercel Serverless Function.
// Vercel auto-detects any file under /api as a serverless function,
// separate from the Express server (server.ts) used for local dev.
// Make sure GEMINI_API_KEY is set under Vercel Project Settings -> Environment Variables.

const SYSTEM_INSTRUCTION = `You are the AI Assistant for Mubessirul Ummah's personal portfolio website.
Your goal is to answer questions from recruiters, collaborators, and visitors about Mubessirul Ummah in a friendly, professional, articulate, and impressive tone (in English or Indonesian depending on the user's language).

About Mubessirul Ummah:
- Role: AI Engineer | Generative AI | Computer Vision | AI Automation Specialist & Fullstack Developer
- Location: Bangkalan, East Java, Indonesia
- Email: mubarijojo.ummah11@gmail.com | Phone: +62 857-4867-3497
- LinkedIn: linkedin.com/in/mubessirulummah | GitHub: github.com/210411100140-MubessirulUmmah
- Education: Bachelor of Informatics Engineering, Universitas Trunojoyo Madura (Aug 2021 – Oct 2025), GPA 3.85 / 4.00.

Key Work Experience:
1. AI Automation — PT Valord Masculine Group (Dec 2025 – Jul 2026):
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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, history } = req.body ?? {};
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
      return res.status(500).json({
        error:
          'GEMINI_API_KEY belum diatur di server. Tambahkan API key Gemini yang valid di Vercel → Project Settings → Environment Variables, lalu redeploy.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const formattedHistory = Array.isArray(history)
      ? history.map((msg: { role: string; content: string }) => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }))
      : [];

    const chat = ai.chats.create({
      model: 'gemini-flash-latest',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: formattedHistory,
    });

    const response = await chat.sendMessage({ message });
    const replyText = response.text || "Sorry, I couldn't generate a response at this time.";

    return res.status(200).json({ reply: replyText });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: 'Failed to communicate with AI Assistant.',
      details: error?.message || 'Unknown error',
    });
  }
}

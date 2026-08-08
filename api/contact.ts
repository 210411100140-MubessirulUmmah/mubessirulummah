import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

// Sends the contact form email directly through your own Gmail account via
// SMTP — no third-party form service (e.g. Web3Forms) involved.
//
// Setup required (once):
// 1. Turn on 2-Step Verification on the Gmail account: myaccount.google.com/security
// 2. Create an App Password: myaccount.google.com/apppasswords
//    (regular Gmail password will NOT work here)
// 3. Set these in Vercel -> Project Settings -> Environment Variables (and .env locally):
//    GMAIL_USER = mubarijojo.ummah11@gmail.com
//    GMAIL_APP_PASSWORD = the 16-character app password (no spaces)

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, subject, message } = req.body ?? {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nama, email, dan pesan wajib diisi.' });
    }

    const gmailUser = process.env.GMAIL_USER;
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailUser || !gmailPass) {
      return res.status(500).json({
        error:
          'GMAIL_USER / GMAIL_APP_PASSWORD belum diatur di server. Tambahkan di Vercel → Project Settings → Environment Variables, lalu redeploy.',
      });
    }

    const transport = nodemailer.createTransport({
      service: 'gmail',
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
      html: `<p><strong>Dari:</strong> ${name} (${email})</p><p>${String(message).replace(/\n/g, '<br/>')}</p>`,
    });

    return res.status(200).json({ success: true, message: 'Pesan Anda telah terkirim!' });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return res.status(500).json({
      error: 'Gagal mengirim pesan. Pastikan GMAIL_USER dan GMAIL_APP_PASSWORD sudah benar.',
      details: error?.message,
    });
  }
}

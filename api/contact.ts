import type { VercelRequest, VercelResponse } from '@vercel/node';

// NOTE: This file is a Vercel Serverless Function (auto-detected under /api).
// Make sure WEB3FORMS_ACCESS_KEY is set under Vercel Project Settings -> Environment Variables.
// Get/confirm your key at https://web3forms.com — new keys require a one-time email confirmation
// before submissions are actually delivered, which is a common reason messages "succeed" but never arrive.

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

    const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
    if (!accessKey) {
      return res.status(500).json({
        error:
          'WEB3FORMS_ACCESS_KEY belum diatur di server. Tambahkan di Vercel → Project Settings → Environment Variables, lalu redeploy.',
      });
    }

    const web3Res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: subject || `Pesan dari ${name} via Portofolio`,
        message,
        from_name: `${name} (Portofolio Mubessirul)`,
      }),
    });

    const web3Data = await web3Res.json().catch(() => ({}));

    // This is the key fix: previously the app ignored Web3Forms' actual
    // response and always told the visitor "success", which is why messages
    // silently disappeared. Now we only report success if Web3Forms confirms it.
    if (!web3Res.ok || !web3Data.success) {
      console.error('Web3Forms error:', web3Res.status, web3Data);
      return res.status(502).json({
        error:
          web3Data?.message ||
          'Gagal mengirim pesan ke Web3Forms. Pastikan access key valid dan sudah dikonfirmasi lewat email.',
      });
    }

    return res.status(200).json({ success: true, message: 'Pesan Anda telah terkirim!' });
  } catch (error: any) {
    console.error('Error in /api/contact:', error);
    return res.status(500).json({ error: 'Gagal mengirim pesan.' });
  }
}

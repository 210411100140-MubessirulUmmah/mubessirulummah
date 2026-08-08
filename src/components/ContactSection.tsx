import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Linkedin, Github, MessageSquare, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setErrorMessage(data.error || 'Gagal mengirim pesan. Silakan coba lagi.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Gagal terhubung ke server. Periksa koneksi internet Anda dan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header Card Matching Screenshot 5 */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-14 shadow-2xl mb-12 border border-zinc-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-amber-400 text-black font-mono text-xs font-bold uppercase tracking-widest rounded-full inline-block mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-4">
              Contact Me
            </h2>
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed">
              Get in touch or shoot me an email directly on{' '}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-bold text-amber-400 underline hover:text-amber-300 break-all"
              >
                {PERSONAL_INFO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form & Info Grid */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          {/* Left Form (Matches Screenshot 5) */}
          <div className="lg:col-span-7 bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 shadow-lg">
            {submitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Pesan Berhasil Terkirim!</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
                  Terima kasih! Pesan Anda telah terkirim langsung tanpa perlu membuka aplikasi email. Mubessirul Ummah akan segera membaca dan membalasnya via email pengirim yang Anda masukkan.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-black text-white font-bold text-xs uppercase hover:bg-gray-800 transition-colors"
                >
                  Kirim Pesan Lain
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nama lengkap Anda"
                      className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-stone-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-stone-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                    Subject / Topik
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Tawaran Kerja, Kolaborasi Riset AI, Inquiry Proyek"
                    className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-stone-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-700 dark:text-gray-300 mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tulis pesan atau kebutuhan proyek Anda..."
                    className="w-full px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-stone-50 dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                {errorMessage && (
                  <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800 px-4 py-3 text-sm text-red-700 dark:text-red-300 font-medium">
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-3.5 rounded-xl bg-black text-white font-black text-sm uppercase tracking-wider hover:bg-gray-800 transition-all flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <span>{loading ? 'Sending...' : 'Send Message ↗'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Options */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 sm:p-8 border border-black/10 dark:border-white/10 space-y-6 shadow-md">
              <h3 className="font-bold text-xl">Direct Channels</h3>

              <div className="space-y-4">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-amber-400 text-black">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-gray-500 block">Email Direct</span>
                    <span className="font-bold text-sm text-black dark:text-white group-hover:underline">
                      {PERSONAL_INFO.email}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-emerald-500 text-white">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-gray-500 block">WhatsApp / Phone</span>
                    <span className="font-bold text-sm text-black dark:text-white group-hover:underline">
                      {PERSONAL_INFO.phone}
                    </span>
                  </div>
                </a>

                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 dark:bg-zinc-800 hover:bg-stone-100 transition-colors group"
                >
                  <div className="p-3 rounded-xl bg-sky-600 text-white">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase text-gray-500 block">LinkedIn Profile</span>
                    <span className="font-bold text-sm text-black dark:text-white group-hover:underline">
                      Mubessirul Ummah
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

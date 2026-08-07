import React, { useState } from 'react';
import { Sparkles, Bot, Send, RefreshCw, Scan, MessageSquareText, Cpu, CheckCircle2, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const PlaygroundSection: React.FC = () => {
  // Playground Active Tool Tab
  const [activeTool, setActiveTool] = useState<'chatbot' | 'vision' | 'generator'>('chatbot');

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Halo! Saya adalah AI Assistant resmi Mubessirul Ummah. Silakan tanyakan apa saja tentang pengalaman riset AI, proyek fullstack, publikasi jurnal, atau skill teknis Mubessirul! 😊`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Vision Detector State
  const [visionSample, setVisionSample] = useState<'ct-scan' | 'welding'>('ct-scan');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);

  // Generator State
  const [genType, setGenType] = useState<'instagram' | 'email'>('instagram');
  const [genTopic, setGenTopic] = useState('Peluncuran Fitur AI Automation Baru');
  const [genOutput, setGenOutput] = useState('');
  const [isGenLoading, setIsGenLoading] = useState(false);

  // Suggested Prompts
  const suggestedPrompts = [
    'Apa saja riset dan publikasi jurnal Mubessirul?',
    'Jelaskan pengalaman proyek VMG Elite & Valord Spark Night!',
    'Apa teknologi yang biasa dipakai untuk Computer Vision?',
    'Bagaimana latar belakang pendidikan dan prestasinya?',
  ];

  // Handle Chat Submit
  const handleSendChat = async (inputPrompt?: string) => {
    const promptToSend = inputPrompt || userInput;
    if (!promptToSend.trim() || isChatLoading) return;

    const newMessages = [...chatMessages, { role: 'user' as const, text: promptToSend }];
    setChatMessages(newMessages);
    if (!inputPrompt) setUserInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptToSend,
          history: newMessages.slice(0, -1).map((m) => ({
            role: m.role,
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      if (data.reply) {
        setChatMessages([...newMessages, { role: 'assistant', text: data.reply }]);
      } else {
        setChatMessages([
          ...newMessages,
          { role: 'assistant', text: 'Maaf, terjadi masalah saat memproses tanggapan. Silakan coba lagi.' },
        ]);
      }
    } catch (err) {
      console.error(err);
      setChatMessages([
        ...newMessages,
        { role: 'assistant', text: 'Terjadi kesalahan koneksi ke backend Gemini AI.' },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Handle Vision Scan Simulation
  const handleRunScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      setIsScanning(false);
      if (visionSample === 'ct-scan') {
        setScanResult({
          model: 'YOLOv8 Medical Fine-Tuned Model',
          detected: 'Lung Lesion / Structural Abnormality Detected',
          confidence: '98.4%',
          boxes: [
            { label: 'Lung Abnormality (Right Lobe)', confidence: '0.98', coords: 'X: 142, Y: 88, W: 74, H: 65' },
          ],
          medicalNote: 'Patent-Pending System (Application No. S00202416178). High confidence match.',
        });
      } else {
        setScanResult({
          model: 'DETR / Mask R-CNN Weld Quality Inspector',
          detected: 'Slag Inclusion Defect Identified',
          confidence: '96.8%',
          boxes: [
            { label: 'Slag Inclusion', confidence: '0.96', coords: 'X: 210, Y: 130, W: 110, H: 45' },
            { label: 'Porosity Cluster', confidence: '0.91', coords: 'X: 340, Y: 180, W: 50, H: 40' },
          ],
          medicalNote: 'Copyrighted DGIP Application & Taylor & Francis Peer-Reviewed Architecture.',
        });
      }
    }, 1500);
  };

  // Handle Generator
  const handleGenerateContent = async () => {
    if (!genTopic.trim() || isGenLoading) return;
    setIsGenLoading(true);
    setGenOutput('');

    try {
      const res = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: genType, topic: genTopic }),
      });
      const data = await res.json();
      setGenOutput(data.output || 'Gagal menghasilkan konten.');
    } catch (e) {
      setGenOutput('Gagal menghubungkan ke Gemini AI.');
    } finally {
      setIsGenLoading(false);
    }
  };

  return (
    <section id="playground" className="py-16 border-b border-black/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner Accent matching Screenshot 3 */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-12 mb-12 text-black shadow-xl overflow-hidden">
          <div className="absolute right-4 bottom-0 opacity-10 font-black text-9xl select-none">
            AI
          </div>
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-black text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Interactive Lab
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-3">
              Playground
            </h2>
            <p className="text-black/80 font-medium text-base sm:text-lg">
              Here are some explorations that I like. Click on the tools below to see live Gemini AI demos and defect detection simulations.
            </p>
          </div>
        </div>

        {/* Playground Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            id="playground-tab-chatbot"
            onClick={() => setActiveTool('chatbot')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
              activeTool === 'chatbot'
                ? 'bg-black text-white border-black shadow-lg scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black/10 hover:border-black/30'
            }`}
          >
            <div className="p-3 rounded-xl bg-amber-400 text-black shrink-0">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">AI Chatbot with Gemini</h3>
              <p className="text-xs opacity-80 mt-1">
                Ask anything about Mubessirul's CV, publications, and projects.
              </p>
            </div>
          </button>

          <button
            id="playground-tab-vision"
            onClick={() => setActiveTool('vision')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
              activeTool === 'vision'
                ? 'bg-black text-white border-black shadow-lg scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black/10 hover:border-black/30'
            }`}
          >
            <div className="p-3 rounded-xl bg-sky-400 text-black shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">AI Computer Vision Simulator</h3>
              <p className="text-xs opacity-80 mt-1">
                Test medical CT Scan & welding defect detection bounding box models.
              </p>
            </div>
          </button>

          <button
            id="playground-tab-generator"
            onClick={() => setActiveTool('generator')}
            className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
              activeTool === 'generator'
                ? 'bg-black text-white border-black shadow-lg scale-[1.02]'
                : 'bg-white dark:bg-zinc-800 text-black dark:text-white border-black/10 hover:border-black/30'
            }`}
          >
            <div className="p-3 rounded-xl bg-emerald-400 text-black shrink-0">
              <MessageSquareText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">AI Script & Workflow Generator</h3>
              <p className="text-xs opacity-80 mt-1">
                Generate marketing scripts & AI email replies automatically.
              </p>
            </div>
          </button>
        </div>

        {/* Tool Content Area */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-xl">
          {/* TOOL 1: GEMINI AI CHATBOT */}
          {activeTool === 'chatbot' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-xs font-bold uppercase tracking-wider">
                    Gemini 2.5 Flash Server-Side AI Assistant
                  </span>
                </div>
                <button
                  onClick={() =>
                    setChatMessages([
                      {
                        role: 'assistant',
                        text: 'Chat direset. Silakan tanyakan apa saja tentang Mubessirul Ummah!',
                      },
                    ])
                  }
                  className="text-xs font-mono text-gray-500 hover:text-black flex items-center gap-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Chat
                </button>
              </div>

              {/* Chat Messages Box */}
              <div className="bg-stone-50 dark:bg-zinc-950 rounded-2xl p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto border border-black/5">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex gap-3 ${
                      msg.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold shrink-0 text-xs shadow">
                        AI
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-black text-white dark:bg-white dark:text-black font-medium'
                          : 'bg-white dark:bg-zinc-800 text-black dark:text-white border border-black/10 shadow-sm whitespace-pre-wrap'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isChatLoading && (
                  <div className="flex gap-3 items-center text-xs font-mono text-gray-500 animate-pulse">
                    <div className="w-8 h-8 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-xs">
                      AI
                    </div>
                    <span>Gemini AI sedang berpikir...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Suggestions */}
              <div className="space-y-2">
                <span className="text-xs font-mono text-gray-500 block">Suggested Questions:</span>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendChat(prompt)}
                      className="px-3 py-1.5 rounded-full text-xs bg-black/5 hover:bg-black/10 dark:bg-white/10 text-black dark:text-white font-medium transition-colors text-left"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Input Box */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                className="flex gap-2"
              >
                <input
                  id="chat-user-input"
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Ketik pertanyaan untuk AI Assistant Mubessirul..."
                  className="flex-1 px-4 py-3 rounded-xl border border-black/20 dark:border-white/20 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  id="chat-send-btn"
                  type="submit"
                  disabled={isChatLoading || !userInput.trim()}
                  className="px-5 py-3 rounded-xl bg-black text-white dark:bg-white dark:text-black font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center gap-2"
                >
                  <span>Kirim</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          )}

          {/* TOOL 2: COMPUTER VISION SIMULATOR */}
          {activeTool === 'vision' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <h3 className="text-xl font-bold">Deep Learning Defect & Abnormality Detection</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    Simulates YOLOv8 & DETR / Mask R-CNN Cloud Inference Pipelines
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setVisionSample('ct-scan')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      visionSample === 'ct-scan'
                        ? 'bg-sky-600 text-white'
                        : 'bg-black/5 dark:bg-white/10'
                    }`}
                  >
                    Medical CT Scan (YOLOv8)
                  </button>
                  <button
                    onClick={() => setVisionSample('welding')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      visionSample === 'welding'
                        ? 'bg-sky-600 text-white'
                        : 'bg-black/5 dark:bg-white/10'
                    }`}
                  >
                    SMAW Welding Defect (DETR)
                  </button>
                </div>
              </div>

              {/* Interactive Image Frame */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative rounded-2xl bg-zinc-950 p-6 text-white overflow-hidden border border-zinc-800 min-h-[300px] flex flex-col items-center justify-center">
                  <div className="absolute top-3 left-3 bg-black/60 px-3 py-1 rounded text-[10px] font-mono text-sky-400">
                    SAMPLE: {visionSample.toUpperCase()}
                  </div>

                  {/* Simulated Frame graphic */}
                  <div className="relative w-full max-w-xs h-48 bg-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center overflow-hidden shadow-2xl">
                    <Scan className={`w-16 h-16 ${isScanning ? 'text-amber-400 animate-spin' : 'text-zinc-600'}`} />

                    {/* Bounding box overlays when scanned */}
                    {scanResult && (
                      <div className="absolute inset-4 border-2 border-amber-400 bg-amber-400/20 rounded flex flex-col justify-between p-2">
                        <span className="bg-amber-400 text-black text-[10px] font-mono font-bold px-1 py-0.5 rounded self-start">
                          {scanResult.boxes[0].label} ({scanResult.confidence})
                        </span>
                        <span className="text-[9px] font-mono text-amber-200 bg-black/70 px-1 py-0.5 rounded self-end">
                          {scanResult.boxes[0].coords}
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleRunScan}
                    disabled={isScanning}
                    className="mt-6 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50"
                  >
                    {isScanning ? 'Running Neural Net Inference...' : 'Run Detection Model'}
                  </button>
                </div>

                {/* Scan Output details */}
                <div className="space-y-4 font-sans">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Model Inference Results
                  </h4>

                  {scanResult ? (
                    <div className="bg-stone-50 dark:bg-zinc-800 p-5 rounded-2xl border border-black/10 space-y-3 font-mono text-xs">
                      <div>
                        <span className="text-gray-500">Model Architecture:</span>{' '}
                        <strong className="text-black dark:text-white">{scanResult.model}</strong>
                      </div>
                      <div>
                        <span className="text-gray-500">Status:</span>{' '}
                        <span className="text-emerald-600 font-bold">{scanResult.detected}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Overall Confidence:</span>{' '}
                        <span className="text-amber-600 font-bold">{scanResult.confidence}</span>
                      </div>
                      <div className="pt-2 border-t border-black/10 text-[11px] text-gray-600 dark:text-gray-300">
                        <strong>Research Note:</strong> {scanResult.medicalNote}
                      </div>
                    </div>
                  ) : (
                    <div className="bg-stone-50 dark:bg-zinc-800 p-6 rounded-2xl border border-dashed border-gray-400 text-gray-500 text-xs text-center">
                      Click "Run Detection Model" to trigger simulated deep learning inference and output bounding box coordinates.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TOOL 3: SCRIPT & EMAIL GENERATOR */}
          {activeTool === 'generator' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <h3 className="text-xl font-bold">Generative AI Marketing Script & Email Auto-Reply</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">
                    Powered by Gemini 2.5 Flash & Workflow Prompt Logic
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setGenType('instagram')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      genType === 'instagram' ? 'bg-emerald-600 text-white' : 'bg-black/5 dark:bg-white/10'
                    }`}
                  >
                    Instagram Script
                  </button>
                  <button
                    onClick={() => setGenType('email')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                      genType === 'email' ? 'bg-emerald-600 text-white' : 'bg-black/5 dark:bg-white/10'
                    }`}
                  >
                    Auto-Reply Email
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase text-gray-500 mb-1">
                    {genType === 'instagram' ? 'Topic / Product Name:' : 'Customer Inquiry Context:'}
                  </label>
                  <input
                    type="text"
                    value={genTopic}
                    onChange={(e) => setGenTopic(e.target.value)}
                    placeholder="e.g. Peluncuran parfum VMG terbaru / Tanya jam operasional kantor"
                    className="w-full px-4 py-2.5 rounded-xl border border-black/20 dark:border-white/20 bg-white dark:bg-zinc-800 text-sm"
                  />
                </div>

                <button
                  onClick={handleGenerateContent}
                  disabled={isGenLoading}
                  className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4 fill-black" />
                  <span>{isGenLoading ? 'Generating...' : 'Generate with Gemini AI'}</span>
                </button>

                {genOutput && (
                  <div className="mt-4 bg-stone-50 dark:bg-zinc-950 p-6 rounded-2xl border border-black/10 font-sans text-sm leading-relaxed whitespace-pre-wrap">
                    <span className="text-xs font-mono text-emerald-600 font-bold block mb-2">
                      GENERATED AI OUTPUT:
                    </span>
                    {genOutput}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

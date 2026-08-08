import React, { useRef, useState } from 'react';
import { Sparkles, Bot, Send, RefreshCw, ImagePlus, CheckCircle2, Loader2 } from 'lucide-react';

type DetectionBox = {
  class: string;
  score: number;
  bbox: [number, number, number, number];
};

export const PlaygroundSection: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'vision' | 'chatbot'>('vision');

  // Chatbot State
  const [chatMessages, setChatMessages] = useState<Array<{ role: 'user' | 'assistant'; text: string }>>([
    {
      role: 'assistant',
      text: `Halo! Saya adalah AI Assistant resmi Mubessirul Ummah. Silakan tanyakan apa saja tentang pengalaman riset AI, proyek fullstack, publikasi jurnal, atau skill teknis Mubessirul! 😊`,
    },
  ]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Object Detection State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isModelLoading, setIsModelLoading] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detections, setDetections] = useState<DetectionBox[] | null>(null);
  const [detectError, setDetectError] = useState('');
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modelRef = useRef<any>(null);

  const suggestedPrompts = [
    'Apa saja riset dan publikasi jurnal Mubessirul?',
    'Jelaskan pengalaman proyek VMG Elite & Valord Spark Night!',
    'Apa teknologi yang biasa dipakai untuk Computer Vision?',
    'Bagaimana latar belakang pendidikan dan prestasinya?',
  ];

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
      if (response.ok && data.reply) {
        setChatMessages([...newMessages, { role: 'assistant', text: data.reply }]);
      } else {
        setChatMessages([
          ...newMessages,
          {
            role: 'assistant',
            text: data.error || 'Maaf, terjadi masalah saat memproses tanggapan. Silakan coba lagi.',
          },
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

  // Load the coco-ssd model once, lazily, the first time it's needed.
  const loadModel = async () => {
    if (modelRef.current) return modelRef.current;
    setIsModelLoading(true);
    try {
      const tf = await import('@tensorflow/tfjs');
      const cocoSsd = await import('@tensorflow-models/coco-ssd');
      await tf.ready();
      const model = await cocoSsd.load();
      modelRef.current = model;
      return model;
    } finally {
      setIsModelLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDetections(null);
    setDetectError('');
    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const drawBoxes = (boxes: DetectionBox[]) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    boxes.forEach((box) => {
      const [x, y, w, h] = box.bbox;
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = Math.max(2, canvas.width / 250);
      ctx.strokeRect(x, y, w, h);

      const label = `${box.class} (${Math.round(box.score * 100)}%)`;
      ctx.font = `${Math.max(14, canvas.width / 45)}px sans-serif`;
      const textWidth = ctx.measureText(label).width;
      ctx.fillStyle = '#fbbf24';
      ctx.fillRect(x, Math.max(0, y - 22), textWidth + 10, 22);
      ctx.fillStyle = '#000000';
      ctx.fillText(label, x + 5, Math.max(16, y - 6));
    });
  };

  const handleRunDetection = async () => {
    if (!imageSrc || !imgRef.current) return;
    setIsDetecting(true);
    setDetectError('');
    setDetections(null);

    try {
      const model = await loadModel();
      if (!imgRef.current.complete) {
        await new Promise((resolve) => {
          imgRef.current!.onload = resolve;
        });
      }
      const predictions = await model.detect(imgRef.current);
      setDetections(predictions);
      drawBoxes(predictions);
    } catch (err: any) {
      console.error(err);
      setDetectError('Gagal menjalankan model deteksi objek di browser. Coba gambar lain atau refresh halaman.');
    } finally {
      setIsDetecting(false);
    }
  };

  const resetDetection = () => {
    setImageSrc(null);
    setDetections(null);
    setDetectError('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section id="playground" className="py-16 border-b border-black/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Banner Accent */}
        <div className="relative rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-8 sm:p-12 mb-12 text-black shadow-xl overflow-hidden">
          <div className="absolute right-4 bottom-0 opacity-10 font-black text-9xl select-none">AI</div>
          <div className="relative z-10 max-w-2xl">
            <span className="px-3 py-1 bg-black text-white rounded-full font-mono text-xs font-bold uppercase tracking-widest inline-flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Interactive Lab
            </span>
            <h2 className="text-4xl sm:text-6xl font-black tracking-tight mb-3">Playground</h2>
            <p className="text-black/80 font-medium text-base sm:text-lg">
              Here are some explorations that I like. Click on the tools below to chat with a Gemini AI assistant
              or try a live object detection model right in your browser.
            </p>
          </div>
        </div>

        {/* Playground Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
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
              <ImagePlus className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-base">Object Detection Demo</h3>
              <p className="text-xs opacity-80 mt-1">
                Upload any photo and see a real object detection model run live in your browser.
              </p>
            </div>
          </button>
        </div>

        {/* Tool Content Area */}
        <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-black/10 dark:border-white/10 p-6 sm:p-8 shadow-xl">
          {/* TOOL 2: OBJECT DETECTION DEMO */}
          {activeTool === 'vision' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/10 dark:border-white/10">
                <div>
                  <h3 className="text-xl font-bold">Live Object Detection</h3>
                  {/* <p className="text-xs text-gray-500 font-mono mt-0.5">
                    Runs COCO-SSD (TensorFlow.js) entirely in your browser — no image is uploaded to any server.
                  </p> */}
                </div>
                {imageSrc && (
                  <button
                    onClick={resetDetection}
                    className="text-xs font-mono text-gray-500 hover:text-black flex items-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> Reset
                  </button>
                )}
              </div>

              <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Upload / preview panel */}
                <div className="relative rounded-2xl bg-zinc-950 p-6 text-white overflow-hidden border border-zinc-800 min-h-[300px] flex flex-col items-center justify-center">
                  {!imageSrc ? (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="flex flex-col items-center gap-3 text-zinc-400 hover:text-amber-400 transition-colors"
                    >
                      <ImagePlus className="w-12 h-12" />
                      <span className="text-sm font-mono">Click to upload a photo</span>
                      <span className="text-[11px] font-mono text-zinc-500">JPG or PNG, any everyday scene</span>
                    </button>
                  ) : (
                    <div className="relative w-full max-w-xs">
                      <img
                        ref={imgRef}
                        src={imageSrc}
                        alt="Uploaded for detection"
                        className="w-full rounded-xl border border-zinc-700"
                        crossOrigin="anonymous"
                      />
                      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full rounded-xl" />
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />

                  {imageSrc && (
                    <button
                      onClick={handleRunDetection}
                      disabled={isDetecting || isModelLoading}
                      className="mt-6 px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-95 disabled:opacity-50 flex items-center gap-2"
                    >
                      {(isDetecting || isModelLoading) && <Loader2 className="w-4 h-4 animate-spin" />}
                      {isModelLoading
                        ? 'Loading model...'
                        : isDetecting
                        ? 'Running Inference...'
                        : 'Run Detection Model'}
                    </button>
                  )}
                </div>

                {/* Results panel */}
                <div className="space-y-4 font-sans">
                  <h4 className="font-bold text-lg flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    Detection Results
                  </h4>

                  {detectError && (
                    <div className="bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-300 text-xs p-4 rounded-2xl">
                      {detectError}
                    </div>
                  )}

                  {detections && detections.length > 0 ? (
                    <div className="bg-stone-50 dark:bg-zinc-800 p-5 rounded-2xl border border-black/10 space-y-3 font-mono text-xs">
                      {detections.map((d, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-black/5 last:border-0 pb-2 last:pb-0">
                          <span className="font-bold text-black dark:text-white capitalize">{d.class}</span>
                          <span className="text-amber-600 font-bold">{Math.round(d.score * 100)}%</span>
                        </div>
                      ))}
                    </div>
                  ) : detections && detections.length === 0 ? (
                    <div className="bg-stone-50 dark:bg-zinc-800 p-6 rounded-2xl border border-dashed border-gray-400 text-gray-500 text-xs text-center">
                      No common objects detected in this image. Try a photo with people, animals, vehicles, or
                      everyday objects.
                    </div>
                  ) : (
                    <div className="bg-stone-50 dark:bg-zinc-800 p-6 rounded-2xl border border-dashed border-gray-400 text-gray-500 text-xs text-center">
                      Upload a photo and click "Run Detection Model" to see detection results for objects like
                      people, cars, animals, and everyday items.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
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

              <div className="bg-stone-50 dark:bg-zinc-950 rounded-2xl p-4 sm:p-6 space-y-4 max-h-[380px] overflow-y-auto border border-black/5">
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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

          
        </div>
      </div>
    </section>
  );
};

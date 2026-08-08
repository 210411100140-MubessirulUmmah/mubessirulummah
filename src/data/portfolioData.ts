import { Project, Experience, Publication, Certification, TechCategory } from '../types';

export const PERSONAL_INFO = {
  name: "Mubessirul Ummah",
  shortName: "Mubessirul",
  initials: "MU",
  tagline: "AI Engineer | Generative AI | Computer Vision | AI Automation Specialist",
  location: "Bangkalan, East Java, Indonesia",
  timezone: "Asia/Jakarta",
  status: "Fullstack Web Dev & AI Automation @ PT Valord Masculine Group",
  email: "mubarijojo.ummah11@gmail.com",
  phone: "+62 857-4867-3497",
  instagram: "https://www.instagram.com/mubessirul_ummah1001",
  whatsapp: "https://wa.me/6285748673497",
  linkedin: "https://linkedin.com/in/mubessirulummah",
  github: "https://github.com/210411100140-MubessirulUmmah",
  bio: `Saya adalah seorang AI Engineer dan Fullstack Developer yang berfokus pada Computer Vision, Deep Learning, Generative AI, dan AI Automation. Memiliki pengalaman dari riset deteksi penyakit paru dan cacat las industri hingga pengembangan sistem operasional perusahaan berskala penuh (VMG Elite & Spark Night). Terbiasa menerjemahkan riset AI dan kebutuhan bisnis menjadi solusi software yang andal, responsif, dan siap pakai di lingkungan produksi.`,
  education: {
    degree: "Bachelor of Informatics Engineering (S1 Teknik Informatika)",
    institution: "Universitas Trunojoyo Madura",
    period: "Aug 2021 – Oct 2025",
    gpa: "3.85 / 4.00",
    coursework: ["Deep Learning", "Machine Learning", "Computer Vision", "Data Mining", "Pattern Recognition", "Information Extraction", "Image Processing", "Web & Mobile Programming"]
  }
};

export const PROJECTS_DATA: Project[] = [
  {
    id: "vmg-elite",
    title: "VMG Elite — Internal Company Operations Platform",
    subtitle: "End-to-End Enterprise Operations & Team Ecosystem",
    category: "Fullstack Web",
    role: "Lead Fullstack Developer & Architect",
    timeline: "Dec 2025 – Present",
    clientOrOrg: "PT Valord Masculine Group",
    platform: "Web Application (SaaS / Operations)",
    description: "Full-stack internal operational platform replacing manual corporate workflows with payroll, attendance, Kanban project management, KPI scoreboards, and real-time team chat.",
    overview: "Membangun satu platform operasional internal untuk menggantikan proses manual perusahaan. Sistem terintegrasi dengan Google OAuth2 dan real-time synchronization antar modul.",
    backgroundProblem: "Sebelumnya, pengelolaan payroll, kehadiran karyawan, progress proyek Kanban, KPI, dan komunikasi internal berjalan secara terpisah melalui spreadsheet manual dan grup chat yang membingungkan. Dibutuhkan satu platform terpusat yang aman dengan kontrol akses terstruktur.",
    solutionOverview: "Membangun VMG Elite menggunakan React 19, Supabase sebagai backend & database real-time, dan Tailwind CSS. Platform mencakup modul Payroll otomatis, sistem Absensi QR/Geolocation, Kanban Task Board terintegrasi, Dashboard KPI Scoreboard interaktif, serta Chat Tim real-time.",
    keyFeatures: [
      { title: "Payroll & Attendance Module", desc: "Perhitungan gaji otomatis berdasarkan kehadiran, lembur, dan potongan secara akurat." },
      { title: "Kanban Project Management", desc: "Drag-and-drop task tracking dengan assignment anggota tim, priority tag, dan due dates." },
      { title: "KPI Scoreboard & Dashboard", desc: "Visualisasi performa kerja karyawan dan metrik pertumbuhan bisnis secara real-time." },
      { title: "Real-Time Team Chat", desc: "Komunikasi langsung antar divisi dengan channel publik dan pesan privat berbasis Supabase Realtime." },
      { title: "Google OAuth & Role-Based Access", desc: "Autentikasi teraman dengan role Admin, Manager, dan Karyawan." }
    ],
    tools: ["React 19", "Supabase", "Tailwind CSS", "Google OAuth", "TypeScript", "Vite", "Vercel"],
    githubUrl: "https://github.com/210411100140-MubessirulUmmah/valordmasculine",
    badge: "Enterprise Platform",
    featured: true,
    imageTheme: "dark",
    mockupType: "macbook-mobile"
  },
  {
    id: "lung-ct-scan",
    title: "Lung CT Scan Detection App (Flask + YOLOv8 + MySQL)",
    subtitle: "AI Medical Imaging Abnormality Detection & Analysis Portal",
    category: "AI & Deep Learning",
    role: "AI & Deep Learning Developer",
    timeline: "Nov 2024 – Dec 2025",
    clientOrOrg: "Universitas Trunojoyo Madura / Riset Paru",
    platform: "Web App & Clinical Portal",
    description: "AI-powered medical imaging portal for detecting lung structural abnormalities from CT Scans using fine-tuned YOLOv8 object detection.",
    overview: "Saya mengembangkan aplikasi web untuk mendeteksi penyakit paru dari citra CT Scan menggunakan model YOLOv8. Sistem dilengkapi multi-workspace, login Google OAuth2, dan ekspor data terstruktur.",
    backgroundProblem: "Proses identifikasi kelainan paru-paru dari citra CT Scan secara manual membutuhkan waktu yang lama dan rentan terhadap variabilitas antar-radiolog. Diperlukan alat bantu keputusan klinis berbasis AI yang cepat dan presisi tinggi.",
    solutionOverview: "Mengembangkan pipeline deep learning YOLOv8 yang dilatih khusus untuk segmentasi dan deteksi lesi/abnormalitas paru-paru. Hasil deteksi dapat diunduh dalam format JSON, gambar anotasi, dan paket ZIP bundle.",
    keyFeatures: [
      { title: "Automated Abnormalities Detection", desc: "Mendeteksi lokasi lesi paru dengan bounding box dan nilai akurasi confidence score." },
      { title: "Multi-Workspace & History", desc: "Dokter dan peneliti dapat mengelompokkan sampel citra berdasarkan kasus atau tanggal pemeriksaan." },
      { title: "Multi-Format Export", desc: "Unduh laporan deteksi dalam format JSON data, citra anotasi high-res, dan bundel ZIP." },
      { title: "Google OAuth2 & MySQL Storage", desc: "Penyimpanan data rekam medis terstruktur dengan keamanan akses bertingkat." }
    ],
    tools: ["Flask (Python)", "YOLOv8 (Ultralytics)", "MySQL", "Google OAuth2", "OpenCV", "Bootstrap", "Jinja2"],
    githubUrl: "https://github.com/210411100140-MubessirulUmmah/LungDetection",
    publicationLink: "#publications",
    badge: "Patent-Pending S00202416178",
    featured: true,
    imageTheme: "blue",
    mockupType: "macbook-mobile"
  },
  {
    id: "spark-night-matchmaking",
    title: "Valord Spark Night x Chindo Swipe — Matchmaking & Voting Platform",
    subtitle: "Real-Time Event Engagement & Interactive Matchmaking",
    category: "Fullstack Web",
    role: "Fullstack Web Developer",
    timeline: "Feb 2026",
    clientOrOrg: "VALORD Spark Night x Chindo Swipe (Mimi Livehouse PIK)",
    platform: "Web App (Mobile First & Live Event)",
    description: "Exclusive live event matchmaking and voting platform replacing manual voting with real-time swipe & match mechanics at Mimi Livehouse PIK.",
    overview: "Membangun platform matchmaking & voting eksklusif untuk event VALORD Spark Night x Chindo Swipe (14 Februari 2026), menggantikan proses vote manual dengan sistem swipe & match real-time.",
    backgroundProblem: "Event interaksi sosial berskala besar memerlukan mekanisme vote dan matchmaking yang menyenangkan, cepat, dan otomatis tanpa kartu fisik atau antrean manual.",
    solutionOverview: "Merancang web app interaktif berbasis React 19 + Supabase Realtime dengan antarmuka bertema swipe kartu. Peserta masuk menggunakan token undangan QR Code dan sistem secara otomatis mendeteksi mutual-match saat dua peserta saling menyukai.",
    keyFeatures: [
      { title: "Tinder-Style Swipe Mechanics", desc: "Sistem swipe kanan/kiri interaktif untuk memilih peserta favorit secara visual." },
      { title: "Automatic Mutual-Match System", desc: "Notifikasi instan saat dua peserta saling memilih (mutual match) secara real-time." },
      { title: "QR Code Token Authentication", desc: "Sistem tiket dan autentikasi aman tanpa pendaftaran rumit di lokasi event." },
      { title: "Gender Filtering Logic", desc: "Penyaringan otomatis profil berdasarkan orientasi dan preferensi pasangan." }
    ],
    tools: ["React 19", "TypeScript", "Vite", "Supabase Realtime", "Tailwind CSS", "Vercel"],
    githubUrl: "https://github.com/210411100140-MubessirulUmmah/ValordSparkNight",
    badge: "Live Event Tech",
    featured: true,
    imageTheme: "amber",
    mockupType: "mobile-only"
  },
  {
    id: "welding-defect-android",
    title: "Welding Defect Detection Android App (DETR + Flask API)",
    subtitle: "Mobile Industrial AI & Quality Control System",
    category: "Mobile AI",
    role: "AI & Mobile Android Developer",
    timeline: "Feb 2024 – Jul 2024",
    clientOrOrg: "BRIN (Badan Riset dan Inovasi Nasional)",
    platform: "Android (Kotlin) + Flask Cloud API",
    description: "Android application for industrial SMAW welding defect detection with cloud inference via Flask API using DEtection TRansformer (DETR).",
    overview: "Aplikasi ini dirancang untuk mendeteksi cacat las pada gambar hasil pengelasan menggunakan model DETR. Berjalan secara client-server dengan visualisasi bounding box, label, dan confidence score.",
    backgroundProblem: "Inspeksi cacat hasil las SMAW di lapangan sering bergantung pada pengamatan mata telanjang inspektur yang bersifat subjektif dan membutuhkan waktu lama.",
    solutionOverview: "Membangun aplikasi Android Kotlin yang mengambil gambar kamera/galeri, mengirimkan byte citra ke Cloud Server VPS berbasis Flask API yang menjalankan model PyTorch DETR, dan menggambar bounding box defect secara presisi di canvas HP.",
    keyFeatures: [
      { title: "Real-time Defect Detection", desc: "Mendeteksi slag inclusion, porosity, lack of penetration, dan crack pada plat las." },
      { title: "High-Confidence Visual Bounding Boxes", desc: "Menampilkan kotak batas berwarna dan nilai persentase tingkat kepastian model." },
      { title: "Cloud Inference via VPS API", desc: "Model PyTorch berat dijalankan di server VPS cloud, menjaga aplikasi HP tetap ringan & cepat." },
      { title: "Offline Image Caching & Reports", desc: "Simpan riwayat deteksi dan unduh gambar dengan anotasi cacat langsung ke memori HP." }
    ],
    tools: ["Python", "PyTorch", "DETR", "Flask API", "Docker", "Android Studio", "Kotlin", "NumPy", "VPS"],
    githubUrl: "https://github.com/210411100140-MubessirulUmmah/welddefectdetector",
    publicationLink: "#publications",
    badge: "Taylor & Francis Published",
    featured: true,
    imageTheme: "pink",
    mockupType: "mobile-only"
  },
  {
    id: "vmg-email-automation",
    title: "AI Auto-Reply Email Automation Valord Masculine Group",
    subtitle: "Generative AI Workflow & Operational Mail Assistant",
    category: "AI Automation",
    role: "AI Workflow Automation Engineer",
    timeline: "Jan 2026 – Jun 2026",
    clientOrOrg: "PT Valord Masculine Group",
    platform: "Make.com + OpenAI GPT-4o mini + Gmail API",
    description: "Automated customer support email reply system integrated with Make.com and OpenAI GPT-4o mini to answer general business inquiries instantly.",
    overview: "Saya membangun automation yang secara otomatis membalas email masuk menggunakan Make.com yang terintegrasi dengan OpenAI GPT-4o mini untuk pertanyaan umum seperti jam operasional, layanan, dan lokasi.",
    backgroundProblem: "Tim CS harus membalas ratusan email pertanyaan umum secara berulang, mengakibatkan keterlambatan respons dan penurunan produktivitas tim operasional.",
    solutionOverview: "Menyusun skenario Make.com yang menangani webhook email Gmail masuk, mengekstrak pertanyaan, meminta instruksi respons dari GPT-4o mini dengan tone profesional perusahaan, dan mengirimkan balasan dalam hitungan detik.",
    keyFeatures: [
      { title: "Instant Automated Email Replies", desc: "Membalas email inquiries dalam waktu kurang dari 10 detik secara 24/7." },
      { title: "Context-Aware AI Generation", desc: "AI memahami topik pertanyaan (lokasi, daftar harga, jadwal) dan menyesuaikan jawaban." },
      { title: "Human-in-the-Loop Safeguards", desc: "Email dengan topik khusus atau keluhan kompleks ditandai untuk penanganan manual admin." }
    ],
    tools: ["Make.com", "OpenAI GPT-4o mini", "Gmail API", "Workflow Automation", "Prompt Engineering"],
    badge: "Production Workflow",
    featured: false,
    imageTheme: "green",
    mockupType: "dashboard"
  },
  {
    id: "legal-nlp-extraction",
    title: "Information Extraction from Court Decisions (NLP, Transformers)",
    subtitle: "Indonesian Legal Document Processing & Fine-Tuned NER",
    category: "AI & Deep Learning",
    role: "NLP Research Specialist",
    timeline: "2025",
    clientOrOrg: "Universitas Trunojoyo Madura",
    platform: "Python NLP Pipeline & Fine-Tuned Models",
    description: "End-to-end information extraction pipeline for Indonesian Supreme Court decisions progressing from rule-based regex extraction to fine-tuned BERT/RoBERTa NER models.",
    overview: "Sistem pengolahan dokumen putusan mahkamah agung untuk mengekstrak entitas penting seperti nama terdakwa, hukuman, pasal pelanggaran, dan fakta persidangan secara otomatis.",
    backgroundProblem: "Dokumen putusan pengadilan berbentuk teks tak terstruktur dengan ratusan halaman yang memerlukan analisis manual berjam-jam untuk kebutuhan penelitian hukum.",
    solutionOverview: "Membangun pipeline NLP dengan pre-processing bertingkat, penandaan Named Entity Recognition (NER) menggunakan model indoBERT dan RoBERTa yang di-fine-tune pada dataset hukum Indonesia.",
    keyFeatures: [
      { title: "Fine-Tuned IndoBERT/RoBERTa", desc: "Akurasi tinggi dalam mengenali istilah hukum dan nama terdakwa." },
      { title: "Structured JSON Output", desc: "Mengubah teks PDF pengadilan tak terstruktur menjadi JSON terstruktur untuk database." }
    ],
    tools: ["Python", "Transformers", "BERT", "RoBERTa", "PyTorch", "SpaCy", "Regular Expressions"],
    githubUrl: "https://huggingface.co/spaces/irulBES/ML-PENGADILAN",
    badge: "NLP Pipeline",
    featured: false,
    imageTheme: "dark",
    mockupType: "code-preview"
  }
];

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-vmg",
    role: "AI Automation & Fullstack Dev",
    company: "PT Valord Masculine Group",
    location: "Jakarta Utara",
    period: "Desember 2025 – Present (Juli 2026)",
    type: "Work",
    highlights: [
      "Mendesain dan mengimplementasikan AI-powered automation solutions menggunakan Generative AI, workflow automation (Make.com, n8n), dan integrasi API cerdas untuk efisiensi bisnis.",
      "Membangun alat kreatif berbasis AI untuk image generation, video generation, copywriting, content ideation, dan publikasi otomatis.",
      "Mengembangkan dua platform web internal end-to-end: VMG Elite (sistem operasional mencakup payroll, attendance, Kanban project management, KPI scoreboard, team chat) dan Valord Spark Night (app matchmaking & voting).",
      "Bertindak sebagai PIC untuk event Jagat Aroma (pameran parfum), mengordinasikan vendor, organizer, dan partnership brand dengan content creator."
    ],
    techStack: ["React 19", "Supabase", "Generative AI", "Make.com", "OpenAI API", "Tailwind CSS", "TypeScript"]
  },
  {
    id: "exp-utm-research",
    role: "Research Assistant",
    company: "Universitas Trunojoyo Madura",
    location: "Bangkalan, East Java",
    period: "November 2024 – Desember 2025",
    type: "Research",
    highlights: [
      "Mengembangkan model deep learning untuk sistem pencitraan medis berbasis AI yang mendeteksi kelainan struktur paru-paru.",
      "Menyusun draft usulan paten untuk sistem deteksi medis (No. Aplikasi S00202416178, patent-pending).",
      "Mempresentasikan dan memamerkan sistem pada KPPTI (Konferensi Puncak Pendidikan Tinggi Indonesia) dan Trunojoyo Innovation Contest (TIC).",
      "Berkolaborasi dengan peneliti lintas disiplin medis dan menulis artikel ilmiah di jurnal internasional terindeks."
    ],
    techStack: ["PyTorch", "YOLOv8", "Flask", "Medical Imaging", "OpenCV", "MySQL", "Python"]
  },
  {
    id: "exp-brin",
    role: "Research Intern",
    company: "Badan Riset dan Inovasi Nasional (BRIN)",
    location: "Surabaya, East Java",
    period: "Februari 2024 – Juli 2024",
    type: "Internship",
    highlights: [
      "Mengembangkan sistem deteksi cacat las SMAW menggunakan deep learning Mask R-CNN dan DETR.",
      "Mengumpulkan citra industri, menyusun standar anotasi label, melakukan eksperimen hyperparameter model, dan evaluasi mAP.",
      "Mendaftarkan hasil riset sebagai Hak Cipta resmi Dirjen HAKI ('Aplikasi Deteksi Cacat Pengelasan SMAW Menggunakan Mask R-CNN') dan menjadi co-author paper seminar nasional CORISINDO.",
      "Penelitian ini juga membuahkan publikasi jurnal di Taylor & Francis (Welding International, 2026)."
    ],
    techStack: ["Mask R-CNN", "DETR", "PyTorch", "Kotlin", "Flask API", "Docker", "Image Annotation"]
  },
  {
    id: "exp-diskominfo",
    role: "Web Developer Intern",
    company: "Dinas Komunikasi dan Informatika Sumenep",
    location: "Sumenep, East Java",
    period: "Desember 2023 – Januari 2024",
    type: "Internship",
    highlights: [
      "Membangun website resmi Satpol PP Kabupaten Sumenep dari nol menggunakan CodeIgniter, PHP, dan MySQL.",
      "Memprototipe antarmuka UI/UX di Figma dan mengintegrasikan live news API serta interaksi JavaScript real-time.",
      "Mengelola operasi database MySQL dan optimasi query melalui PhpMyAdmin."
    ],
    techStack: ["CodeIgniter", "PHP", "MySQL", "Figma", "JavaScript", "REST API"]
  },
  {
    id: "exp-lab-ta",
    role: "Laboratory Teaching Assistant",
    company: "Universitas Trunojoyo Madura",
    location: "Bangkalan, East Java",
    period: "Agustus 2022 – Desember 2022",
    type: "Academic",
    highlights: [
      "Mengajar praktikum Pengantar Teknologi Informasi dan Algoritma Pemrograman untuk mahasiswa baru.",
      "Membimbing modul pemecahan masalah (troubleshooting), pemrograman dasar C++/Python, serta mengevaluasi tugas praktikum."
    ],
    techStack: ["C++", "Python", "Algorithms", "Data Structures"]
  }
];

export const PUBLICATIONS_DATA: Publication[] = [
  {
    id: "pub-detr-welding",
    title: "Deep learning-based on detection transformer (DETR) for defect identification in shielded metal arc welding plates joint",
    venue: "Taylor & Francis (Welding International)",
    year: "2026",
    type: "Journal",
    doiOrStatus: "International Peer-Reviewed Journal",
    authors: "Mubessirul Ummah et al.",
    description: "Penelitian utama penerapan arsitektur transformer (DETR) dalam inspeksi otomatis cacat pengelasan SMAW dengan akurasi dan mAP tinggi di lingkungan manufaktur.",
    link: "https://doi.org/10.1080/09507116.2026.2708882"
  },
  {
    id: "pub-rice-leaves",
    title: "Disease Detection in Rice Plant Leaves based on Mask R-CNN",
    venue: "15th International Conference on Information & Communication Technology and System (ICTS)",
    year: "2026",
    type: "International Conference",
    doiOrStatus: "IEEE / ICTS Indexed Proceeding",
    authors: "Mubessirul Ummah et al.",
    description: "Deteksi dan segmentasi presisi penyakit pada daun tanaman padi menggunakan Mask R-CNN untuk mendukung ketahanan pangan pertanian cerdas.",
    link: "https://ieeexplore.ieee.org/document/11369617/"
  },
  {
    id: "pub-corisindo",
    title: "Implementation of Mask R-CNN for Identifying Defects in SMAW Welding",
    venue: "CORISINDO National Seminar | IndoCEISS | UTB",
    year: "2024",
    type: "National Seminar",
    doiOrStatus: "Published Proceeding & Copyrighted Software",
    authors: "Mubessirul Ummah et al.",
    description: "Pengembangan dan registrasi hak cipta resmi aplikasi kecerdasan buatan deteksi cacat las berbasis Mask R-CNN.",
    link: "https://corisindo.utb-univ.ac.id/index.php/penelitian/article/view/93"
  }
];

export const CERTIFICATIONS_DATA: Certification[] = [
  { id: "cert-1", name: "Data Visualization & Wrangling with Python", issuer: "Pacmann Academy", year: "2025", badgeColor: "bg-blue-100 text-blue-800" },
  { id: "cert-2", name: "Basic Python Programming & Python for Software Engineering", issuer: "Pacmann Academy", year: "2025", badgeColor: "bg-indigo-100 text-indigo-800" },
  { id: "cert-3", name: "Hak Cipta Aplikasi Deteksi Cacat Las SMAW (Mask R-CNN)", issuer: "Dirjen Kekayaan Intelektual (DGIP)", year: "2024", badgeColor: "bg-amber-100 text-amber-800" },
  { id: "cert-4", name: "Certificate of Presenter (CORISINDO National Seminar)", issuer: "CORISINDO / IndoCEISS", year: "2024", badgeColor: "bg-purple-100 text-purple-800" },
  { id: "cert-5", name: "Research Program Completion Certificate", issuer: "Badan Riset dan Inovasi Nasional (BRIN)", year: "2024", badgeColor: "bg-red-100 text-red-800" },
  { id: "cert-6", name: "Assistant Laboratory Certificate", issuer: "WargaLab UTM", year: "2025", badgeColor: "bg-teal-100 text-teal-800" },
  { id: "cert-7", name: "Teknisi Muda Jaringan Komputer", issuer: "BNSP Indonesia", year: "2023", badgeColor: "bg-emerald-100 text-emerald-800" },
  { id: "cert-8", name: "Networking Essentials", issuer: "Cisco Networking Academy", year: "2023", badgeColor: "bg-cyan-100 text-cyan-800" }
];

export const TECH_SKILLS: TechCategory[] = [
  {
    category: "Programming Languages",
    skills: [
      { name: "Python", level: "Expert" },
      { name: "JavaScript", level: "Advanced" },
      { name: "TypeScript", level: "Advanced" },
      { name: "Kotlin", level: "Intermediate" },
      { name: "PHP", level: "Intermediate" },
      { name: "SQL", level: "Advanced" }
    ]
  },
  {
    category: "AI, Machine Learning & Computer Vision",
    skills: [
      { name: "PyTorch", level: "Advanced" },
      { name: "TensorFlow", level: "Intermediate" },
      { name: "OpenCV", level: "Advanced" },
      { name: "YOLOv8", level: "Expert" },
      { name: "DETR", level: "Expert" },
      { name: "Mask R-CNN", level: "Expert" },
      { name: "Transformers (NLP)", level: "Advanced" },
      { name: "Deep Learning", level: "Expert" }
    ]
  },
  {
    category: "Generative AI & Intelligent Automation",
    skills: [
      { name: "Generative AI", level: "Expert" },
      { name: "Prompt Engineering", level: "Expert" },
      { name: "Make.com", level: "Advanced" },
      { name: "n8n", level: "Advanced" },
      { name: "OpenAI API", level: "Advanced" },
      { name: "Gemini API", level: "Advanced" }
    ]
  },
  {
    category: "Backend & Full Stack Development",
    skills: [
      { name: "React 19", level: "Expert" },
      { name: "Next.js", level: "Advanced" },
      { name: "Flask (Python)", level: "Advanced" },
      { name: "Supabase", level: "Advanced" },
      { name: "MySQL", level: "Advanced" },
      { name: "Tailwind CSS", level: "Expert" },
      { name: "CodeIgniter", level: "Intermediate" }
    ]
  },
  {
    category: "DevOps, Tools & Data Viz",
    skills: [
      { name: "Git & GitHub", level: "Expert" },
      { name: "Docker", level: "Intermediate" },
      { name: "Hugging Face", level: "Advanced" },
      { name: "Google Colab", level: "Expert" },
      { name: "Figma", level: "Advanced" },
      { name: "Tableau & Looker Studio", level: "Advanced" },
      { name: "Vercel", level: "Advanced" }
    ]
  }
];

export const SOFT_SKILLS = [
  { title: "Public Speaking & Presentasi Ilmiah", desc: "Presenter makalah ilmiah nasional CORISINDO 2024, sesi tanya jawab akademik, dan pengajar praktikum algoritma." },
  { title: "Kepemimpinan & Koordinasi Tim", desc: "PIC event Jagat Aroma (pameran parfum) di VMG, memimpin tim riset Banana Ripeness Detection (Juara 2 Coolest Project)." },
  { title: "Kolaborasi Lintas Disiplin", desc: "Berkolaborasi dengan dokter/peneliti medis riset paru, vendor event eksternal, dan partnership agency." },
  { title: "Adaptabilitas & Inisiatif Belajar", desc: "Berpartisipasi cepat dari riset CV akademis ke AI Automation & Fullstack produksi di industri kerja." }
];

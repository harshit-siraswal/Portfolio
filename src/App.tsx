import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Download,
  ExternalLink,
  Mail,
  ArrowDown,
  FileText,
  ChevronLeft,
  ChevronRight,
  X,
  Award,
  BookOpen,
  Terminal,
  Send,
  CheckCircle,
  Menu,
  Maximize,
  Sparkles,
  Shield
} from 'lucide-react'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Active hash overlay project or blog
  const [selectedProjectHash, setSelectedProjectHash] = useState<string | null>(null)
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null)

  // Video playback states
  const [overlayMuted, setOverlayMuted] = useState(true)
  const [overlayPlaying, setOverlayPlaying] = useState(true)

  // Refs for video elements
  const overlayVideoRef = useRef<HTMLVideoElement>(null)

  // Contact form state
  const [formName, setFormName] = useState('')
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Skill category state
  const [selectedSkillCategory, setSelectedSkillCategory] = useState('all')

  // Project category filter
  const [selectedProjectCategory, setSelectedProjectCategory] = useState('all')

  // StudyShare Screenshots list
  const studyshareScreenshots = [
    { src: '/images/studyspace/Student-Fee-Payment.png', title: 'Student Fee Payment' },
    { src: '/images/studyspace/Student-Gate-Pass-Request.png', title: 'Student Gate Pass' },
    { src: '/images/studyspace/Leave-Requests.png', title: 'Leave Requests' },
    { src: '/images/studyspace/Complaints.png', title: 'Complaints Portal' },
    { src: '/images/studyspace/AI-Smart-Insights-Crowd-Alerts.png', title: 'AI Insights' },
    { src: '/images/studyspace/QR-Visitor-Check-In-AI-Identity.png', title: 'QR Identity' },
    ...Array.from({ length: 18 }, (_, i) => ({
      src: `/images/studyspace/whatsapp-img-${i + 1}.jpg`,
      title: `WhatsApp Ingestion Bot Screen ${i + 1}`
    }))
  ]

  // Track hash changes for routing overlays
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      const validProjectHashes = [
        '#bis-engine',
        '#studyshare',
        '#memori',
        '#returnshield-ai',
        '#mini-siem',
        '#careagent',
        '#core-inventory',
        '#code-analyser',
        '#buildsmart',
        '#manhole-mesh',
        '#stair-lighting',
        '#weather-tech'
      ]
      
      if (hash.startsWith('#article-')) {
        const blogId = hash.replace('#article-', '')
        setSelectedBlogId(blogId)
        setSelectedProjectHash(null)
        document.body.style.overflow = 'hidden'
      } else if (hash && validProjectHashes.includes(hash)) {
        setSelectedProjectHash(hash)
        setSelectedBlogId(null)
        document.body.style.overflow = 'hidden'
      } else {
        setSelectedProjectHash(null)
        setSelectedBlogId(null)
        document.body.style.overflow = ''
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      document.body.style.overflow = ''
    }
  }, [])

  interface Project {
    id: string
    title: string
    category: 'ai' | 'fullstack' | 'hardware' | 'security'
    categoryLabel: string
    tag?: string
    description: string
    video?: string
    image?: string
    images?: string[]
    techStack: string[]
    stats?: { label: string; value: string }[]
    github?: string
    website?: string
    linkedin?: string
    features: string[]
  }

  const projectsData: Project[] = [
    {
      id: 'bis-engine',
      title: 'BIS Standards Recommendation Engine',
      category: 'ai',
      categoryLabel: 'AI / Hybrid RAG Search',
      tag: 'Hackathon Winner',
      description: 'Indian Micro and Small Enterprises (MSEs) spend weeks searching through complex Bureau of Indian Standards (BIS) regulations. This AI-powered RAG pipeline ingests official BIS SP 21 cement, steel, and concrete catalogs to return top-5 ranked IS codes with explanation rationales in under 0.01 seconds.',
      video: '/videos/bis-standards-walkthrough.mp4',
      techStack: ['Python', 'FastAPI', 'FAISS', 'BM25 Retriever', 'Hybrid RAG', 'JSON Schema', 'Docker'],
      stats: [
        { label: 'Hit Rate @3', value: '100%' },
        { label: 'MRR @5', value: '1.000' },
        { label: 'Avg Latency', value: '0.01s' },
        { label: 'Tests Passed', value: '59/59' }
      ],
      github: 'https://github.com/harshit-siraswal/BIS-Standards-Recommendation-Engine',
      website: 'https://bis-standards-recommendation-engine-livid.vercel.app/',
      linkedin: 'https://www.linkedin.com/feed/update/urn:li:activity:7457838839613657088/',
      features: [
        'Deterministic RAG Engine — Catalog extraction, hierarchical chunking, and FAISS vector indexing.',
        'Hybrid Retrieval — Combined Dense Embeddings (FAISS) and Sparse Lexical Retrieval (BM25) for high-accuracy regulation matching.',
        'Sub-0.01s Latency — Optimized inference and metadata filtering running locally or serverless.',
        'Automated Test Suite — Passed all 59/59 evaluation and domain robustness tests.'
      ]
    },
    {
      id: 'studyshare',
      title: 'StudyShare Platform & Ingestion Suite',
      category: 'fullstack',
      categoryLabel: 'Product Suite (Live)',
      tag: 'Campus Administration System',
      description: 'A production-grade college administration and hostel management suite active on campus. Comprises a Next.js web portal, a Flutter student app, and a NestJS backend with n8n automated pipelines. Features receipt parsing via Tesseract OCR, dynamic QR gate passes, and a real-time municipal-level communication layer.',
      video: '/videos/studyshare-walkthrough.mp4',
      techStack: ['Next.js', 'PostgreSQL', 'Flutter', 'NestJS', 'Docker', 'Tesseract OCR', 'n8n Automation', 'Railway', 'Neon Serverless'],
      stats: [
        { label: 'Active Users', value: '500+' },
        { label: 'OCR Accuracy', value: '98.4%' },
        { label: 'Ingestion Latency', value: '1.2s' },
        { label: 'Uptime (Railway)', value: '99.9%' }
      ],
      github: 'https://github.com/harshit-siraswal/studyshare-web',
      website: 'https://www.studyshare.in/',
      features: [
        'Unified Campus Ecosystem — Bridges student apps, security desks, and administrators in a single relational database on Neon Serverless.',
        'WhatsApp Ingestion Bot — Automates receipt verification using an n8n webhook pipeline. Extracts transaction text with Tesseract OCR, matches records, and logs approvals automatically.',
        'Intelligent Fallback Layer — Confidence-gated checks route low-quality receipt scans to administrative review with LLM-based categorization.',
        'Hostel Security Module — Dynamic student gate pass system. Generates temporary, encrypted QR codes validated at the security gate by guards using the scanner application.'
      ]
    },
    {
      id: 'memori',
      title: 'Memori Labs (Agent Memory Infrastructure)',
      category: 'ai',
      categoryLabel: 'AI Systems & State',
      tag: 'Agent Infrastructure',
      description: 'Memori is agent-native memory infrastructure. A SQL-native, LLM-agnostic layer that turns agent execution traces and tool interactions into structured, persistent state for production multi-agent systems.',
      techStack: ['TypeScript', 'SQL', 'PostgreSQL', 'LLM Memory', 'Vector Search', 'Node.js', 'Docker'],
      stats: [
        { label: 'Architecture', value: 'SQL-Native' },
        { label: 'LLM Support', value: 'Agnostic' },
        { label: 'State Sync', value: 'Real-Time' },
        { label: 'Search', value: 'Hybrid Vector' }
      ],
      github: 'https://github.com/harshit-siraswal/Memori',
      website: 'https://memorilabs.ai',
      features: [
        'SQL-Native Persistent State — Captures tool executions, user preferences, and intermediate outputs in relational queryable schemas.',
        'LLM & Datastore Agnostic — Works seamlessly with OpenAI, Anthropic, Gemini, DeepSeek, and local models.',
        'Graph Memory Extraction — Extracts entity relationships over time to reduce hallucination across long context runs.'
      ]
    },
    {
      id: 'returnshield-ai',
      title: 'ReturnShield AI',
      category: 'ai',
      categoryLabel: 'AI E-Commerce Security',
      tag: 'Innogeeks Hackathon Project',
      description: 'Built during the Innogeeks Hackathon (KIET College Club). ReturnShield AI is an intelligent predictive return risk and fraud prevention platform for e-commerce brands. Powered by a trained scikit-learn machine learning pipeline that evaluates customer return velocity, purchase value, and discount patterns to deliver real-time risk scores and financial loss exposure estimates.',
      techStack: ['React 19', 'TypeScript', 'Python', 'scikit-learn', 'Joblib', 'Vite', 'Geist UI', 'Vercel Edge'],
      stats: [
        { label: 'Model Accuracy', value: '95.0%' },
        { label: 'Inference Speed', value: '45ms' },
        { label: 'False Positives', value: '< 2.1%' },
        { label: 'Hackathon', value: 'Innogeeks' }
      ],
      github: 'https://github.com/harshit-siraswal/ReturnsheildAI',
      website: 'https://returnsheild-ai.vercel.app',
      features: [
        'Trained ML Classification Pipeline — Preprocessed multi-feature model evaluating customer return history, seller ratings, price tiers, and product reviews.',
        'Revenue Impact Engine — Live calculation of order value at risk and estimated net loss prevention.',
        'Action Stack & One-Click Interventions — Automated rule enforcement for high-risk orders with flagged return prevention workflows.',
        'Geist Design System Interface — Clean, high-performance React 19 dashboard with interactive risk trend charts and Vercel Edge Copilot integration.'
      ]
    },
    {
      id: 'mini-siem',
      title: 'SOC Sentinel (Mini-SIEM)',
      category: 'security',
      categoryLabel: 'Cybersecurity Telemetry',
      tag: 'Security Analytics',
      description: 'A lightweight Security Information and Event Management (SIEM) platform for real-time telemetry ingestion, threat detection rules, and anomaly visualization. Designed for SOC operations and rapid incident triage.',
      techStack: ['TypeScript', 'React', 'Telemetry Logs', 'Rule Engine', 'Tailwind CSS', 'Vercel'],
      stats: [
        { label: 'Event Streaming', value: 'Live' },
        { label: 'Rule Matching', value: 'Sub-ms' },
        { label: 'Visualization', value: 'Interactive' },
        { label: 'Architecture', value: 'Client-Edge' }
      ],
      github: 'https://github.com/harshit-siraswal/mini-siem',
      website: 'https://mini-siem-nine.vercel.app',
      features: [
        'Real-Time Log Ingestion — Live stream parser for authentication events, network probes, and firewall logs.',
        'Custom Rule Engine — Configurable alert criteria for brute-force attacks, port scans, and suspicious IPs.',
        'Incident Timeline — Interactive SOC dashboard with severity filtering and triage workflows.'
      ]
    },
    {
      id: 'careagent',
      title: 'CareAgent Healthcare Platform',
      category: 'ai',
      categoryLabel: 'Healthcare AI Agent',
      tag: 'Multi-Channel Health Suite',
      description: 'Autonomous health and medication compliance agent supporting WhatsApp, Telegram, and mobile apps. Features automated emergency escalations, caretaker alerts, prescription intelligence, and HIPAA-ready PostgreSQL contracts.',
      techStack: ['Python', 'FastAPI', 'PostgreSQL', 'Flutter', 'Dart', 'Redis', 'LLM Runtimes'],
      github: 'https://github.com/harshit-siraswal/careagent-backend',
      features: [
        'Backend Data Platform — Production SQL schema for consent ledgers, observations, risk escalations, and outbox events.',
        'Multi-Channel Runtime — Patient communication via conversational messaging and voice reminders.',
        'Caretaker & Doctor Dashboard — Patient adherence tracking and automated incident alerts.'
      ]
    },
    {
      id: 'core-inventory',
      title: 'Core Inventory Platform',
      category: 'fullstack',
      categoryLabel: 'Enterprise ERP',
      tag: 'Stock & Logistics Manager',
      description: 'Modern, high-performance inventory and supply tracking suite built with React, TypeScript, and Vite. Designed for rapid warehouse operations, barcode management, and low-latency stock audits.',
      techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'shadcn/ui'],
      github: 'https://github.com/harshit-siraswal/Core_Inventory',
      website: 'https://core-inventory-sigma.vercel.app',
      features: [
        'Real-Time Stock Auditing — Instant stock level adjustments with warehouse location tracking.',
        'Responsive Data Tables — Virtualized high-density views with instant filtering and search.',
        'Glassmorphic Dashboard — Clean dark UI designed for warehouse touchscreen terminals.'
      ]
    },
    {
      id: 'code-analyser',
      title: 'Code Analyser',
      category: 'fullstack',
      categoryLabel: 'CLI & Compiler Sandbox',
      tag: 'Analysis Tool',
      description: 'A coding practice platform that evaluates HOW users solve problems, rather than just simple outcomes. Uses Monaco Editor, Judge0 API sandbox, and AST parsing to detect code quality, error classification, and big-O time complexity.',
      techStack: ['React', 'FastAPI', 'Judge0', 'AST Parser', 'Monaco Editor'],
      github: 'https://github.com/harshit-siraswal/code_analyser',
      website: 'https://code-analyser-web.vercel.app/',
      features: [
        'Monaco Editor embedding with custom lint configurations',
        'Judge0 backend sandbox pipeline compilation',
        'AST (Abstract Syntax Tree) parsing for structural check'
      ]
    },
    {
      id: 'buildsmart',
      title: 'BuildSmart AI',
      category: 'ai',
      categoryLabel: 'AI Integration Platform',
      tag: 'AI Assistant',
      description: 'AI-powered build management and optimization tool designed and shipped end-to-end in under two weeks. Integrates custom Large Language Models to deliver automated project recommendations and architectural insights.',
      techStack: ['TypeScript', 'React', 'Node.js', 'LLM API', 'Vercel'],
      github: 'https://github.com/harshit-siraswal/buildsmart',
      website: 'https://buildsmart-kohl.vercel.app',
      features: [
        'Developed and deployed inside a strict 2-week window',
        'Custom Large Language Model endpoint routing for code reviews',
        'Fully responsive glassmorphic management dashboard'
      ]
    },
    {
      id: 'manhole-mesh',
      title: 'Manhole IoT Mesh Detector',
      category: 'hardware',
      categoryLabel: 'Hardware & IoT Mesh',
      tag: 'ESP32 Device',
      description: 'An IoT device using ESP32, load cell amplifiers, and ultrasonic sensors to detect missing covers in real time. Deployed ESP-NOW mesh protocol to relay cover status to municipal dashboards without relying on GSM or WiFi.',
      image: '/images/hardware/tweet_image_1.jpg',
      images: ['/images/hardware/tweet_image_1.jpg', '/images/hardware/manhole_detection_flowchart.png'],
      techStack: ['ESP32', 'ESP-NOW Mesh', 'MQTT', 'Node.js', 'Load Cells', 'Ultrasonic Sensors', 'Wokwi Simulator'],
      github: 'https://github.com/harshit-siraswal',
      website: 'https://wokwi.com/projects/446450435316383745',
      features: [
        'ESP-NOW mesh relays cover status to central Node.js nodes',
        'HX711 load cell amplification and ultrasonic distance monitoring',
        'Battery-efficient sleep cycles and instant mesh interrupt triggers',
        'Wokwi Simulations — Pole 1 (446450), Pole 2 (446722), and Receiver Node (446605) simulated online.'
      ]
    },
    {
      id: 'stair-lighting',
      title: 'Smart Staircase Lighting System',
      category: 'hardware',
      categoryLabel: 'Hardware & Embedded',
      tag: 'LED Transition Controller',
      description: 'Motion-activated stair lighting system with smart transitions, ambient light adjustment, and power-saving sleep modes. Utilizes microcontrollers and addressable LED strips to create smooth, visual step tracking.',
      image: '/images/hardware/tweet_image_4.jpg',
      images: ['/images/hardware/tweet_image_4.jpg', '/images/hardware/stair-lighting.jpg'],
      techStack: ['Arduino', 'ESP32', 'WS2812B LEDs', 'PIR Sensors', 'Custom PCB', 'C++'],
      github: 'https://github.com/harshit-siraswal',
      features: [
        'WS2812B individually addressable LED cascades',
        'Dual PIR motion sensors at top/bottom of staircase',
        'Custom PCB schema and power management casing design'
      ]
    },
    {
      id: 'weather-tech',
      title: 'Weather Monitoring Sensor',
      category: 'hardware',
      categoryLabel: 'Hardware & Telemetry',
      tag: 'Sensor Station',
      description: 'ESP32-based weather station capturing temperature, humidity, and atmospheric pressure. Deploys a Node-RED dashboard for telemetry analysis, plotting live environmental data.',
      video: '/videos/weather-monitoring.mp4',
      techStack: ['ESP32', 'DHT22 Sensor', 'BMP280', 'WiFi', 'MQTT', 'Node-RED', 'InfluxDB', 'Grafana'],
      github: 'https://github.com/harshit-siraswal',
      features: [
        'DHT22 temperature/humidity and BMP280 pressure gathering',
        'MQTT telemetry streaming to Raspberry Pi local database',
        'Node-RED visual dashboard with InfluxDB and Grafana tracking'
      ]
    }
  ]

  // Technical Blog Articles Data
  interface BlogPost {
    id: string
    title: string
    category: string
    date: string
    readTime: string
    excerpt: string
    content: string[]
    tags: string[]
  }

  const blogPosts: BlogPost[] = [
    {
      id: 'bis-hybrid-rag',
      title: 'Architecting Sub-10ms Hybrid RAG: How We Built the BIS Standards Engine with FAISS & BM25',
      category: 'AI & Information Retrieval',
      date: 'August 2026',
      readTime: '5 min read',
      excerpt: 'Indian Micro and Small Enterprises lose weeks identifying mandatory IS certifications. Here is how we engineered a deterministic hybrid RAG pipeline achieving a 100% Hit Rate @3 with sub-0.01s inference.',
      tags: ['FAISS', 'BM25', 'Python', 'FastAPI', 'RAG Architecture'],
      content: [
        'When dealing with regulatory catalogs like the Bureau of Indian Standards (BIS SP 21 for cement, concrete, and structural steel), vanilla semantic vector search frequently hallucinates or fails on domain codes (e.g. distinguishing IS 1489 Part 1 Portland Pozzolana Cement from IS 269 Ordinary Portland Cement).',
        'To solve this, we architected a dual-retrieval pipeline combining Dense Vector Embeddings via FAISS with Sparse Lexical Matching via BM25.',
        '1. Hierarchical Parsing & Term Expansion: We extracted structured clauses, product scopes, and test criteria from the official BIS PDF catalog, enriching chunks with domain synonym aliases (e.g. "OPC 43", "PPC", "Rapid Hardening").',
        '2. Hybrid Score Fusion: Incoming queries are simultaneously vectorized for semantic cosine similarity and tokenized for BM25 term frequency. A calibrated reciprocal rank fusion layer balances both score distributions.',
        '3. Sub-0.01s Execution: By pre-computing index caches in memory and enforcing strict JSON schemas on FastAPI endpoints, average lookup latency dropped to 0.01 seconds while passing 59 out of 59 validation benchmarks with an MRR @5 of 1.000.'
      ]
    },
    {
      id: 'memori-agent-state',
      title: 'Agent-Native Memory: Building Persistent SQL State Infrastructure for Autonomous AI Agents',
      category: 'AI Systems & Architecture',
      date: 'July 2026',
      readTime: '6 min read',
      excerpt: 'Why raw context windows and disjointed vector databases fail long-running agents, and how Memori Labs structures tool executions and sessions into relational, persistent SQL state.',
      tags: ['Autonomous Agents', 'SQL', 'State Management', 'Memori Labs'],
      content: [
        'Most autonomous agent frameworks treat memory as either an ephemeral sliding context window or an unindexed vector store of raw text chunks. In real-world enterprise applications, both approaches fail: sliding windows lose critical early decisions, while vector similarity retrieves irrelevant conversational fluff without understanding temporal order.',
        'With Memori Labs, we approached agent memory through the lens of relational database engineering:',
        '1. Execution Graphs as Structured Records: Every tool invocation, environment response, and reasoning chain is captured as an immutable event ledger with foreign keys to agent sessions and parent tasks.',
        '2. Hybrid Semantic & Relational Querying: Agents can perform SQL joins over past actions ("Show me all failed API requests in step 3") while simultaneously running semantic vector filters over past conversation summaries.',
        '3. Framework & LLM Agnostic: By decoupling state persistence from the LLM provider, agents can transition between models (e.g., Gemini 2.0 Flash for planning, Claude 3.7 for refactoring) without losing state continuity.'
      ]
    },
    {
      id: 'esp-now-mesh',
      title: 'Zero-GSM Urban Resilience: Engineering ESP-NOW Mesh Protocols for Smart Cities',
      category: 'Embedded Systems & IoT',
      date: 'June 2026',
      readTime: '5 min read',
      excerpt: 'How we built a decentralized municipal manhole cover monitoring system using ESP32 microcontrollers and peer-to-peer ESP-NOW mesh relaying to eliminate expensive GSM SIM contracts.',
      tags: ['ESP32', 'ESP-NOW', 'Mesh Networks', 'C++', 'IoT'],
      content: [
        'Urban open-manhole accidents cause hundreds of fatalities annually in emerging cities. Traditional smart city solutions rely on individual GSM/cellular SIM cards inside each cover — an approach that quickly fails due to massive recurring data fees, poor subterranean signal penetration, and high battery consumption.',
        'Our design leverages ESP-NOW — a connectionless Wi-Fi protocol developed by Espressif that enables low-power packet transfers without standard Wi-Fi handshakes or routers:',
        '1. Sensor Fusion: We paired HX711 load cell amplifiers with ultrasonic distance sensors. When a manhole cover is displaced, an instantaneous hardware interrupt wakes the ESP32 from deep sleep (< 15 µA).',
        '2. Multi-Hop Mesh Propagation: Instead of calling a cellular tower, the node broadcasts a 250-byte encrypted packet to neighboring street-light nodes. The nodes daisy-chain the message until reaching a single internet-connected edge gateway.',
        '3. Municipal Telemetry: The gateway publishes the alert to a central Node.js / MQTT dashboard with exact GPS coordinates and cover displacement timestamps in under 200 milliseconds.'
      ]
    },
    {
      id: 'studyshare-ocr-pass',
      title: 'OCR at Scale: Automated Receipt Ingestion & QR Gate Pass Security in StudyShare',
      category: 'Full-Stack Engineering',
      date: 'May 2026',
      readTime: '5 min read',
      excerpt: 'Inside the engineering of StudyShare: handling 500+ active campus users with an n8n webhook pipeline, Tesseract OCR receipt parsing, and dynamic encrypted QR security passes.',
      tags: ['Next.js', 'NestJS', 'Tesseract OCR', 'PostgreSQL', 'Flutter'],
      content: [
        'College administrative workflows are plagued by manual verification: students submit paper bank receipts or screenshots on messaging apps, and staff manually reconcile them with fee accounts.',
        'StudyShare transformed this into an automated digital suite currently live on campus:',
        '1. Asynchronous Webhook Pipelines: When a student sends a fee slip via the WhatsApp bot, an n8n pipeline ingests the image and feeds it to a specialized Tesseract OCR engine with image preprocessing (binarization, contrast normalization, skew correction).',
        '2. Transaction Matching: Extracted UTR numbers and transaction amounts are matched against bank ledgers in our Neon Serverless PostgreSQL database with 98.4% accuracy.',
        '3. Dynamic Encrypted QR Gate Passes: For student leave and hostel permissions, the Flutter client renders time-bound QR tokens signed with HMAC-SHA256. Campus security guards scan and authenticate departures in real time even under intermittent connectivity.'
      ]
    }
  ]

  // Find active project or blog based on state
  const activeProject = projectsData.find(p => `#${p.id}` === selectedProjectHash)
  const activeBlog = blogPosts.find(b => b.id === selectedBlogId)

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'studio', 'about', 'journal', 'blog', 'reach-us']
      const scrollPosition = window.scrollY + 200

      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll handler
  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  // Open Lightbox
  const openLightbox = (images: string[], index: number) => {
    setLightboxImages(images)
    setLightboxIndex(index)
    setSelectedImage(images[index])
  }

  const navigateLightbox = (direction: 'next' | 'prev') => {
    let nextIndex = lightboxIndex
    if (direction === 'next') {
      nextIndex = (lightboxIndex + 1) % lightboxImages.length
    } else {
      nextIndex = (lightboxIndex - 1 + lightboxImages.length) % lightboxImages.length
    }
    setLightboxIndex(nextIndex)
    setSelectedImage(lightboxImages[nextIndex])
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formName && formEmail && formMessage) {
      setFormSubmitted(true)
      setTimeout(() => {
        setFormSubmitted(false)
        setFormName('')
        setFormEmail('')
        setFormMessage('')
      }, 5000)
    }
  }

  const skillsData = [
    { name: 'TypeScript', level: 92, category: 'languages' },
    { name: 'JavaScript', level: 95, category: 'languages' },
    { name: 'Python', level: 90, category: 'languages' },
    { name: 'Dart', level: 82, category: 'languages' },
    { name: 'C / C++', level: 80, category: 'languages' },
    { name: 'SQL', level: 90, category: 'languages' },
    { name: 'HTML5 / CSS3', level: 95, category: 'languages' },
    
    { name: 'React', level: 92, category: 'frontend' },
    { name: 'Next.js', level: 90, category: 'frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend' },
    { name: 'shadcn/ui', level: 92, category: 'frontend' },
    { name: 'Flutter (Mobile)', level: 85, category: 'frontend' },
    { name: 'Vite', level: 90, category: 'frontend' },

    { name: 'Node.js', level: 90, category: 'backend' },
    { name: 'NestJS', level: 85, category: 'backend' },
    { name: 'FastAPI (Python)', level: 88, category: 'backend' },
    { name: 'Express.js', level: 90, category: 'backend' },
    { name: 'Prisma ORM', level: 88, category: 'backend' },
    { name: 'REST & WebSockets', level: 92, category: 'backend' },

    { name: 'PostgreSQL', level: 88, category: 'databases' },
    { name: 'Neon Serverless', level: 88, category: 'databases' },
    { name: 'Redis', level: 80, category: 'databases' },
    { name: 'FAISS Vector Indexing', level: 88, category: 'databases' },

    { name: 'Cloudflare Workers & Edge', level: 86, category: 'devops' },
    { name: 'Docker', level: 82, category: 'devops' },
    { name: 'Vercel / Railway', level: 90, category: 'devops' },
    { name: 'n8n Automation', level: 88, category: 'devops' },
    { name: 'RAG Search Pipelines', level: 92, category: 'devops' },
    { name: 'ESP32 & ESP-NOW Mesh', level: 90, category: 'devops' }
  ]

  const filteredSkills = selectedSkillCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === selectedSkillCategory)

  const filteredProjects = selectedProjectCategory === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === selectedProjectCategory)

  // Card hover video controllers
  const hoverPlayVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.play().catch(() => {})
  }
  const hoverPauseVideo = (e: React.MouseEvent<HTMLVideoElement>) => {
    e.currentTarget.pause()
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground font-body overflow-x-hidden">
      
      {/* 1. HERO SECTION & FULLSCREEN LOOPING BACKGROUND VIDEO */}
      <section id="home" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-background">
        
        {/* Background Video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.35)' }}
        >
          <source 
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>

        {/* Glassmorphic Navigation Bar */}
        <header className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 py-6 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => scrollTo('home')}
              className="text-3xl tracking-tight text-foreground cursor-pointer select-none font-normal flex items-center gap-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              <span>Harshit Pal</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Studio', id: 'studio' },
                { name: 'About', id: 'about' },
                { name: 'Journal', id: 'journal' },
                { name: 'Articles', id: 'blog' },
                { name: 'Reach Us', id: 'reach-us' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-sm tracking-wide transition-colors duration-300 font-medium cursor-pointer ${
                    activeSection === link.id 
                      ? 'text-foreground' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Nav CTA - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={() => scrollTo('studio')}
                className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground hover:scale-[1.03] transition-all duration-300 cursor-pointer"
              >
                Explore Projects
              </button>
            </div>

            {/* Mobile Menu Icon */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-foreground hover:text-muted-foreground transition-colors z-20 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Mobile Nav Overlay */}
          {mobileMenuOpen && (
            <div className="absolute top-0 left-0 w-full bg-background/95 backdrop-blur-lg flex flex-col items-center justify-center py-12 gap-6 z-15 border-b border-border transition-all duration-300">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Studio', id: 'studio' },
                { name: 'About', id: 'about' },
                { name: 'Journal', id: 'journal' },
                { name: 'Articles', id: 'blog' },
                { name: 'Reach Us', id: 'reach-us' }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className={`text-lg transition-colors font-medium cursor-pointer ${
                    activeSection === link.id ? 'text-foreground' : 'text-muted-foreground'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <button 
                onClick={() => scrollTo('studio')}
                className="liquid-glass rounded-full px-8 py-3 text-base text-foreground mt-4 hover:scale-[1.03] transition-all cursor-pointer"
              >
                Explore Projects
              </button>
            </div>
          )}
        </header>

        {/* Hero Central Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-28 pb-32 flex-grow max-w-7xl mx-auto">
          {/* Badge */}
          <div className="animate-fade-rise mb-6 flex flex-wrap items-center justify-center gap-2">
            <span className="px-4 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-emerald-400 backdrop-blur-md flex items-center gap-2">
              <Sparkles size={12} /> B.Tech CSE (AIML) @ KIET &bull; Full-Stack &amp; IoT
            </span>
            <span className="px-3.5 py-1.5 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-400 backdrop-blur-md">
              2x NDA Qualified &bull; IOQM 2022 Merit
            </span>
          </div>

          {/* Main Title Heading */}
          <h1 
            className="animate-fade-rise text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-foreground select-none"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Where <em className="not-italic text-muted-foreground">code</em> meets <br className="hidden sm:inline" />
            <em className="not-italic text-muted-foreground">engineering reality.</em>
          </h1>

          {/* Subtext Paragraph */}
          <p 
            className="animate-fade-rise-delay text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-normal"
          >
            I am Harshit Pal — Full-Stack Developer, AI/RAG Systems Engineer, and IoT Specialist. 
            I build low-latency web platforms, agent-native memory layers, and self-healing hardware mesh networks.
          </p>

          {/* Centered Hero CTAs */}
          <div className="animate-fade-rise-delay-2 flex flex-wrap items-center justify-center gap-4 mt-10">
            <button 
              onClick={() => scrollTo('studio')}
              className="liquid-glass rounded-full px-10 py-4 text-sm text-foreground hover:scale-[1.03] transition-all duration-300 cursor-pointer tracking-wider font-semibold select-none shadow-xl"
            >
              Explore Projects
            </button>
            <a 
              href="/Harshit_Pal_Resume.pdf" 
              download="Harshit_Pal_Resume.pdf"
              className="rounded-full px-8 py-4 text-sm bg-white text-zinc-950 hover:bg-zinc-200 transition-all duration-300 cursor-pointer font-semibold flex items-center gap-2 shadow-xl"
            >
              <Download size={14} /> Download Resume
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="relative z-10 w-full flex justify-center pb-8 animate-bounce">
          <button 
            onClick={() => scrollTo('studio')} 
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Scroll Down to Portfolio"
          >
            <ArrowDown size={24} />
          </button>
        </div>

      </section>

      {/* PORTFOLIO CONTENT SECTIONS */}
      <main className="w-full bg-background relative z-10 border-t border-border/20">
        
        {/* 2. STUDIO SECTION (PROJECT SHOWCASE) */}
        <section id="studio" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-border/20 pb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">STUDIO CREATIONS</p>
              <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Crafting with Code &amp; Copper.
              </h2>
            </div>
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { label: 'All Projects', value: 'all' },
                { label: 'AI & ML', value: 'ai' },
                { label: 'Full-Stack', value: 'fullstack' },
                { label: 'Hardware / IoT', value: 'hardware' },
                { label: 'Security', value: 'security' }
              ].map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setSelectedProjectCategory(tab.value)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    selectedProjectCategory === tab.value
                      ? 'bg-foreground text-background scale-[1.03]'
                      : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Flagship Projects Layout (BIS Standards Engine & StudyShare Platform) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
            
            {/* FEATURED: BIS Standards Recommendation Engine */}
            <motion.div 
              whileHover={{ scale: 1.01, translateY: -4 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-12 liquid-glass rounded-3xl p-6 sm:p-8 border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#bis-engine' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Pane (Details) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-emerald-400">
                        Featured Flagship
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        AI / RAG Hackathon Winner
                      </span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-normal text-foreground mb-4 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      BIS Standards Recommendation Engine
                    </h3>
                    
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      Indian Micro and Small Enterprises (MSEs) spend weeks trying to find which Bureau of Indian Standards (BIS) regulations apply to their products. This AI-powered RAG pipeline ingests official BIS SP 21 cement, steel, and concrete catalogs to return top-5 ranked IS codes with explanation rationales in under 0.01 seconds.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Hit Rate @3', value: '100%' },
                        { label: 'MRR @5', value: '1.000' },
                        { label: 'Avg Latency', value: '0.01s' },
                        { label: 'Tests Passed', value: '59/59' }
                      ].map((stat, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                          <span className="block text-2xs text-muted-foreground mb-1">{stat.label}</span>
                          <span className="block text-base font-semibold text-foreground font-mono">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 lg:mb-0">
                    {['Python', 'RAG Pipeline', 'FAISS', 'BM25 Retriever', 'FastAPI', 'JSON Schema', 'Robustness Testing'].map((t) => (
                      <span key={t} className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Pane (Video & Footer) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-6 flex-grow">
                    <video 
                      loop 
                      muted 
                      playsInline 
                      onMouseEnter={hoverPlayVideo}
                      onMouseLeave={hoverPauseVideo}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    >
                      <source src="/videos/bis-standards-walkthrough.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-foreground border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                        Hover to Preview Walkthrough
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-foreground font-medium flex items-center gap-1.5 group-hover:underline">
                      View Detailed Case Study <ExternalLink size={12} />
                    </span>
                    <span className="text-2xs text-muted-foreground font-mono">Team Anushka Sharma &amp; Harsh Attri</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* FLAGSHIP PRODUCT: StudyShare Platform */}
            <motion.div 
              whileHover={{ scale: 1.01, translateY: -4 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-12 liquid-glass rounded-3xl p-6 sm:p-8 border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#studyshare' }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Pane (Details) */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-cyan-400">
                        Flagship Product
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        Active Campus Administration Suite
                      </span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-normal text-foreground mb-4 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      StudyShare Platform &amp; Ingestion Bot
                    </h3>
                    
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                      A production-grade college administration and hostel management suite active on campus. Comprises a Next.js web portal, a Flutter student app, and a NestJS backend with n8n automated pipelines. Features receipt parsing via Tesseract OCR, dynamic QR gate passes, and a real-time municipal-level communication layer.
                    </p>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                      {[
                        { label: 'Active Users', value: '500+' },
                        { label: 'OCR Accuracy', value: '98.4%' },
                        { label: 'Ingestion Latency', value: '1.2s' },
                        { label: 'Uptime (Railway)', value: '99.9%' }
                      ].map((stat, i) => (
                        <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                          <span className="block text-2xs text-muted-foreground mb-1">{stat.label}</span>
                          <span className="block text-base font-semibold text-foreground font-mono">{stat.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6 lg:mb-0">
                    {['Next.js', 'PostgreSQL', 'Flutter', 'NestJS', 'Docker', 'Tesseract OCR', 'n8n Automation', 'Railway'].map((t) => (
                      <span key={t} className="px-2.5 py-0.5 rounded-full text-2xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Pane (Video & Footer) */}
                <div className="lg:col-span-5 flex flex-col justify-between">
                  <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40 border border-white/5 mb-6 flex-grow">
                    <video 
                      loop 
                      muted 
                      playsInline 
                      onMouseEnter={hoverPlayVideo}
                      onMouseLeave={hoverPauseVideo}
                      className="w-full h-full object-contain bg-zinc-950/60 transition-transform duration-700 group-hover:scale-[1.03]"
                    >
                      <source src="/videos/studyshare-walkthrough.mp4" type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-black/60 backdrop-blur-md text-foreground border border-white/10 opacity-80 group-hover:opacity-100 transition-opacity">
                        Hover to Preview Walkthrough
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-white/5 pt-4">
                    <span className="text-xs text-foreground font-semibold flex items-center gap-1.5 group-hover:underline">
                      studyshare.in <ExternalLink size={12} />
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">Explore Detailed Case Study</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>

          {/* Grid of Projects (Memori, ReturnShield, Mini-SIEM, CareAgent, Core Inventory, Hardware) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {filteredProjects.filter(p => p.id !== 'bis-engine' && p.id !== 'studyshare').map((p) => (
              <motion.div 
                key={p.id}
                whileHover={{ scale: 1.02, translateY: -6 }}
                className="liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between border border-border/10 group cursor-pointer"
                onClick={() => { window.location.hash = `#${p.id}` }}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-2xs text-muted-foreground font-mono uppercase tracking-wider">{p.categoryLabel}</span>
                    {p.tag && (
                      <span className="text-2xs font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald-400">
                        {p.tag}
                      </span>
                    )}
                  </div>
                  <h4 className="text-2xl font-normal text-foreground mb-2.5 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {p.title}
                  </h4>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-6 line-clamp-3">
                    {p.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {p.techStack.slice(0, 4).map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded-full text-2xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                        {t}
                      </span>
                    ))}
                    {p.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded-full text-2xs bg-white/5 text-muted-foreground/60 font-mono">
                        +{p.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-white/5">
                  <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline">
                    Explore Details <ExternalLink size={12} />
                  </span>
                  {p.website && <span className="text-2xs text-muted-foreground font-mono">Live Deployment</span>}
                </div>
              </motion.div>
            ))}
          </div>

          {/* HARDWARE PROJECTS GALLERY SECTION */}
          <div className="mt-16">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2 block">HARDWARE LAB &amp; PROTOTYPES</span>
              <h3 className="text-2xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Wiring, Breadboards &amp; Microcontrollers
              </h3>
              <p className="text-muted-foreground text-xs sm:text-sm mt-1 max-w-2xl">
                Snapshots from physical hardware builds including ESP32 mesh networks, Arduino systems, sensor wiring, and prototype casings. Click to enlarge.
              </p>
            </div>

            {/* Horizontal Scrolling Bento Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
              {[
                '/images/hardware/manhole-mesh.jpg',
                '/images/hardware/stair-lighting.jpg'
              ].map((imgUrl, index) => (
                <div 
                  key={index} 
                  onClick={() => openLightbox(['/images/hardware/manhole-mesh.jpg', '/images/hardware/stair-lighting.jpg'], index)}
                  className="flex-shrink-0 w-80 aspect-[4/3] rounded-2xl overflow-hidden border border-white/5 bg-white/5 cursor-pointer relative group"
                >
                  <img src={imgUrl} alt={`Hardware Setup ${index + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="text-xs text-foreground font-medium px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/25">
                      Enlarge Photo
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* 3. ABOUT ME SECTION */}
        <section id="about" className="bg-white/[0.01] border-y border-border/10 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Profile Image & Quote Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden p-2 liquid-glass border border-white/10 shadow-2xl">
                  <img 
                    src="/ghibli_coder.jpg" 
                    alt="Harshit Pal - Ghibli Coder Illustration" 
                    className="w-full h-full object-cover rounded-2xl transition-all duration-700 hover:scale-[1.02]" 
                  />
                </div>
                <div className="mt-8 text-center">
                  <p className="text-lg italic font-normal text-muted-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    "Design is not just what it looks like. Design is how it works."
                  </p>
                  <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mt-2">- Harshit Pal</p>
                </div>
              </div>

              {/* Bio & Details Column */}
              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">ABOUT THE CREATOR</span>
                <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Harshit Pal
                </h2>
                
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-4">
                  I am a B.Tech Computer Science &amp; Engineering student (AI &amp; ML) at <strong className="text-foreground">KIET Group of Institutions, Ghaziabad</strong>. I bridge complex theoretical intelligence with robust software architecture and embedded hardware reality.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  Whether developing deterministic sub-0.01s hybrid RAG search for Indian standards, architecting SQL-native agent memory infrastructure with Memori Labs, or flashing low-power ESP-NOW peer mesh networks on ESP32 microcontrollers, I build systems engineered for production reliability.
                </p>

                {/* Grid of Credentials & National Qualifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* NATIONAL CREDENTIAL: 2x NDA & 3x SSB */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <Shield className="text-cyan-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">2x NDA Qualified &bull; 3x SSB</h4>
                      <p className="text-xs text-muted-foreground mt-1">National Defence Academy &amp; SSB Boards</p>
                      <p className="text-2xs text-cyan-400 font-mono mt-1">Leadership &bull; Resilience &bull; Crisis Aptitude</p>
                    </div>
                  </div>

                  {/* NATIONAL CREDENTIAL: IOQM 2022 */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <Award className="text-purple-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">IOQM 2022 Qualified</h4>
                      <p className="text-xs text-muted-foreground mt-1">Indian Olympiad Qualifier in Mathematics</p>
                      <p className="text-2xs text-purple-400 font-mono mt-1">Merit Certificate Holder</p>
                    </div>
                  </div>

                  {/* EDUCATION: B.Tech CSE */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <BookOpen className="text-muted-foreground shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">B.Tech in CSE (AIML)</h4>
                      <p className="text-xs text-muted-foreground mt-1">KIET Ghaziabad (2025 - 2029)</p>
                      <p className="text-2xs text-emerald-400 font-mono mt-1">SGPA: 7.83 (Sem 1)</p>
                    </div>
                  </div>

                  {/* CREDENTIAL: AWS Certified AI Practitioner */}
                  <button 
                    onClick={() => openLightbox(['/AWS_Certified_AI_Practitioner_certificate.pdf'], 0)}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all flex gap-4 text-left group w-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                  >
                    <Award className="text-amber-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-foreground">AWS Certified AI Practitioner</h4>
                        <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">AWS Academy / Cloud Specialist</p>
                      <p className="text-2xs text-amber-400 font-semibold mt-1">Click to view Certificate</p>
                    </div>
                  </button>

                  {/* ACHIEVEMENT: Innotech '25 */}
                  <button 
                    onClick={() => openLightbox(['/innotech_2025.png'], 0)}
                    className="p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all flex gap-4 text-left group w-full cursor-pointer focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                  >
                    <Award className="text-emerald-400 shrink-0 mt-1 group-hover:scale-110 transition-transform" size={20} />
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-sm font-semibold text-foreground">Innotech &apos;25 Hackathon</h4>
                        <ExternalLink size={12} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">KIET Ghaziabad (Hackathon/Expo)</p>
                      <p className="text-2xs text-emerald-400 font-mono mt-1">Winner: First-Year Innovator</p>
                    </div>
                  </button>

                  {/* JEE Score Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <Terminal className="text-muted-foreground shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">JEE Main 2025</h4>
                      <p className="text-xs text-muted-foreground mt-1">Percentile: 89.12</p>
                      <p className="text-2xs text-muted-foreground/60 mt-1">National Level Competency</p>
                    </div>
                  </div>

                  {/* Schooling Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 sm:col-span-2">
                    <FileText className="text-muted-foreground shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">SD Public School &bull; Muzaffarnagar</h4>
                      <p className="text-xs text-muted-foreground mt-1">Class X: 94.6% &bull; Class XII: 81.2%</p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Interactive Resume Showcase (Embedded PDF) */}
            <div className="mt-16 border border-white/10 rounded-3xl overflow-hidden liquid-glass">
              {/* Header Bar */}
              <div className="bg-white/5 px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-cyan-400" />
                  <span className="text-sm font-mono text-foreground font-semibold">Harshit_Pal_Resume.pdf</span>
                  <span className="hidden sm:inline text-xs text-muted-foreground font-mono">&bull; Updated with latest projects &amp; national qualifications</span>
                </div>
                <a 
                  href="/Harshit_Pal_Resume.pdf" 
                  download="Harshit_Pal_Resume.pdf" 
                  className="px-4 py-2 rounded-full bg-white text-background hover:bg-white/90 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-white/5"
                >
                  <Download size={12} /> Download PDF
                </a>
              </div>
              {/* PDF Embed Frame */}
              <div className="w-full h-[640px] bg-zinc-950/60 relative">
                <iframe 
                  src="/Harshit_Pal_Resume.pdf#toolbar=0&navpanes=0&scrollbar=1" 
                  className="w-full h-full border-none"
                  title="Harshit Pal Interactive Resume Viewer"
                />
              </div>
            </div>

          </div>
        </section>

        {/* 4. JOURNAL (SKILLS) SECTION */}
        <section id="journal" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border/20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">JOURNAL OF PROGRESS</p>
              <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Technical Capabilities
              </h2>
            </div>
            
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mt-6 md:mt-0">
              {[
                { name: 'All', id: 'all' },
                { name: 'Languages', id: 'languages' },
                { name: 'Frontend', id: 'frontend' },
                { name: 'Backend', id: 'backend' },
                { name: 'Databases', id: 'databases' },
                { name: 'Cloud / DevOps / IoT', id: 'devops' }
              ].map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedSkillCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
                    selectedSkillCategory === category.id
                      ? 'bg-foreground text-background scale-[1.05]'
                      : 'bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/5'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSkills.map((skill, index) => (
              <div 
                key={index} 
                className="liquid-glass rounded-2xl p-5 border border-white/5 flex flex-col justify-between group hover:border-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-semibold text-foreground group-hover:translate-x-1 transition-transform">
                    {skill.name}
                  </span>
                  <span className="text-xs text-muted-foreground font-mono bg-white/5 px-2 py-0.5 rounded border border-white/5">
                    {skill.category.toUpperCase()}
                  </span>
                </div>
                
                {/* Visual Progress Bar */}
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mt-2">
                  <div 
                    className="h-full bg-foreground rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" 
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* 5. ENGINEERING BLOG & ARTICLES SECTION */}
        <section id="blog" className="bg-white/[0.01] border-y border-border/10 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-border/20">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">ENGINEERING INSIGHTS</p>
                <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Articles &amp; Architecture Notes
                </h2>
              </div>
              <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-sm sm:text-base leading-relaxed">
                Deep dives into sub-10ms RAG retrieval, agent-native persistent state, zero-GSM mesh protocols, and production OCR pipelines.
              </p>
            </div>

            {/* Blog Posts Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {blogPosts.map((post) => (
                <motion.article 
                  key={post.id}
                  whileHover={{ scale: 1.01, translateY: -4 }}
                  className="liquid-glass rounded-3xl p-7 border border-white/10 flex flex-col justify-between group cursor-pointer"
                  onClick={() => { window.location.hash = `#article-${post.id}` }}
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono mb-4">
                      <span className="text-cyan-400 font-semibold">{post.category}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors leading-snug" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {post.excerpt}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2.5 py-0.5 rounded-full text-2xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs">
                      <span className="text-foreground font-semibold flex items-center gap-1.5 group-hover:underline">
                        Read Full Technical Breakdown <ChevronRight size={14} />
                      </span>
                      <span className="text-muted-foreground font-mono">{post.date}</span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

          </div>
        </section>

        {/* 6. REACH US (CONTACT & RESUME) SECTION */}
        <section id="reach-us" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Contact Info & Resume View */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3 block">COLLABORATION &amp; INQUIRIES</span>
                  <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Let&apos;s Build Together.
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Have a project in mind, need a full-stack engineer, or want to discuss AI search and IoT mesh architectures? Drop a message or download my resume.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <Mail className="text-muted-foreground shrink-0" size={20} />
                    <div>
                      <span className="block text-2xs uppercase tracking-wider text-muted-foreground">Email Contact</span>
                      <a href="mailto:harshit.pal.8.d.sdpsmzn@gmail.com" className="text-sm font-mono text-foreground hover:underline">
                        harshit.pal.8.d.sdpsmzn@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                    <ExternalLink className="text-muted-foreground shrink-0" size={20} />
                    <div>
                      <span className="block text-2xs uppercase tracking-wider text-muted-foreground">Online Profiles</span>
                      <div className="flex gap-4 mt-1 text-xs font-mono">
                        <a href="https://github.com/harshit-siraswal" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                          GitHub
                        </a>
                        <span className="text-muted-foreground">&bull;</span>
                        <a href="https://linkedin.com/in/harshit-pal" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                          LinkedIn
                        </a>
                        <span className="text-muted-foreground">&bull;</span>
                        <a href="https://instagram.com/harshit_siraswal" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:underline">
                          Instagram (@harshit_siraswal)
                        </a>
                        <span className="text-muted-foreground">&bull;</span>
                        <a href="https://harshitpal.in" className="text-cyan-400 hover:underline">
                          harshitpal.in
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Resume Download Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Professional Resume</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF Document &bull; National Qualifications &amp; Live Apps</p>
                    </div>
                    <a 
                      href="/Harshit_Pal_Resume.pdf" 
                      download="Harshit_Pal_Resume.pdf" 
                      className="px-4 py-2 rounded-xl bg-white text-background hover:bg-white/90 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                    >
                      <Download size={14} /> Download
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-7 liquid-glass rounded-3xl p-8 border border-white/10">
                <h3 className="text-2xl font-normal text-foreground mb-6" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Send a Direct Message
                </h3>

                {formSubmitted ? (
                  <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                    <CheckCircle className="text-emerald-400 mx-auto" size={32} />
                    <h4 className="text-base font-semibold text-foreground">Message Received!</h4>
                    <p className="text-xs text-muted-foreground">Thank you for reaching out. I will get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="form-name" className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Your Name</label>
                      <input 
                        type="text" 
                        id="form-name"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-colors"
                        placeholder="Harshit Sharma"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-email" className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Email Address</label>
                      <input 
                        type="email" 
                        id="form-email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-colors"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="form-message" className="block text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-2">Message</label>
                      <textarea 
                        id="form-message"
                        required
                        rows={5}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/30 rounded-xl px-4 py-3 text-sm text-foreground outline-none transition-colors resize-none"
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    <button 
                      type="submit" 
                      className="w-full px-6 py-4 rounded-xl bg-white text-background hover:bg-white/90 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-white/5"
                    >
                      <Send size={14} /> Send Message
                    </button>
                  </form>
                )}
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full bg-background border-t border-border/10 py-12 relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-muted-foreground text-xs font-mono">
            &copy; 2026 HARSHIT PAL. Built with React + Tailwind v4 + TypeScript. Deployed on Cloudflare &amp; Vercel.
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <button onClick={() => scrollTo('home')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Top</button>
            <button onClick={() => scrollTo('studio')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Studio</button>
            <button onClick={() => scrollTo('about')} className="hover:text-foreground transition-colors font-medium cursor-pointer">About</button>
            <button onClick={() => scrollTo('journal')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Journal</button>
            <button onClick={() => scrollTo('blog')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Articles</button>
            <button onClick={() => scrollTo('reach-us')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Reach Us</button>
          </div>
        </div>
      </footer>

      {/* 7. INTERACTIVE MEDIA LIGHTBOX / MODAL OVERLAY */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 sm:p-8"
        >
          {/* Close Trigger */}
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors z-50 cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X size={24} />
          </button>

          {/* Lightbox Content Container */}
          <div className="relative max-w-5xl w-full max-h-[80vh] flex items-center justify-center">
            
            {/* Previous Arrow */}
            {lightboxImages.length > 1 && (
              <button 
                onClick={() => navigateLightbox('prev')}
                className="absolute left-0 sm:-left-16 p-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors cursor-pointer select-none"
                aria-label="Previous Media"
              >
                <ChevronLeft size={24} />
              </button>
            )}

            {/* Media Rendering */}
            {selectedImage.endsWith('.pdf') ? (
              <iframe 
                src={`${selectedImage}#toolbar=0&navpanes=0&scrollbar=1`}
                className="w-full h-[75vh] rounded-2xl border border-white/10 bg-zinc-950"
                title="Certificate PDF Viewer"
              />
            ) : selectedImage.endsWith('.mp4') ? (
              <video 
                autoPlay 
                controls 
                className="max-w-full max-h-[75vh] rounded-2xl overflow-hidden border border-white/10 bg-black"
              >
                <source src={selectedImage} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img 
                src={selectedImage} 
                alt="Enlarged media preview" 
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border border-white/10 shadow-2xl select-none"
              />
            )}

            {/* Next Arrow */}
            {lightboxImages.length > 1 && (
              <button 
                onClick={() => navigateLightbox('next')}
                className="absolute right-0 sm:-right-16 p-3 rounded-full bg-white/5 border border-white/10 text-foreground hover:bg-white/10 transition-colors cursor-pointer select-none"
                aria-label="Next Media"
              >
                <ChevronRight size={24} />
              </button>
            )}

          </div>

          {/* Bottom Counter Indicator */}
          {lightboxImages.length > 1 && (
            <div className="mt-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-muted-foreground font-mono select-none">
              {lightboxIndex + 1} / {lightboxImages.length}
            </div>
          )}

        </div>
      )}

      {/* 8. SLIDING FULLSCREEN PROJECT OVERLAY (CASE STUDY PAGE) */}
      <AnimatePresence>
        {selectedProjectHash && activeProject && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto px-6 py-20 flex flex-col items-center"
          >
            {/* Overlay Navigation Bar */}
            <div className="max-w-6xl w-full flex items-center justify-between border-b border-border/10 pb-6 mb-10">
              <button 
                onClick={() => { window.location.hash = '#studio' }}
                className="flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground font-medium cursor-pointer transition-colors"
              >
                <ChevronLeft size={20} /> Back to Studio
              </button>

              <div className="flex gap-4">
                <a 
                  href="https://linkedin.com/in/harshit-pal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider transition-colors"
                >
                  LinkedIn
                </a>
                <span className="text-[#D7E2EA]/20 font-mono">/</span>
                <a 
                  href="https://github.com/harshit-siraswal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider transition-colors"
                >
                  GitHub
                </a>
                <span className="text-[#D7E2EA]/20 font-mono">/</span>
                <a 
                  href="https://instagram.com/harshit_siraswal" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-pink-400/80 hover:text-pink-400 font-mono uppercase tracking-wider transition-colors"
                >
                  Instagram
                </a>
              </div>
            </div>

            {/* Core Project Details */}
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              
              {/* Media Block (Col-Span-7) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Embedded Video Player or Project Image */}
                {activeProject.video ? (
                  <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/40 border border-white/5 group">
                    <video 
                      ref={overlayVideoRef}
                      src={activeProject.video}
                      loop 
                      muted={overlayMuted} 
                      autoPlay
                      playsInline 
                      className="w-full h-full object-contain bg-zinc-950/80"
                    />

                    {/* Overlay controls */}
                    <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button 
                        onClick={() => {
                          if (overlayVideoRef.current) {
                            if (overlayVideoRef.current.paused) {
                              overlayVideoRef.current.play()
                              setOverlayPlaying(true)
                            } else {
                              overlayVideoRef.current.pause()
                              setOverlayPlaying(false)
                            }
                          }
                        }}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-foreground transition-colors cursor-pointer"
                      >
                        {overlayPlaying ? <Pause size={16} /> : <Play size={16} />}
                      </button>

                      <div className="text-xs text-muted-foreground font-mono flex-grow px-4">
                        Walkthrough_Walkthrough.mp4
                      </div>

                      <button 
                        onClick={() => {
                          if (overlayVideoRef.current) {
                            if (overlayVideoRef.current.requestFullscreen) {
                              overlayVideoRef.current.requestFullscreen()
                            }
                          }
                        }}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-foreground transition-colors cursor-pointer mr-2"
                        title="Fullscreen"
                      >
                        <Maximize size={16} />
                      </button>

                      <button 
                        onClick={() => {
                          if (overlayVideoRef.current) {
                            overlayVideoRef.current.muted = !overlayVideoRef.current.muted
                            setOverlayMuted(overlayVideoRef.current.muted)
                          }
                        }}
                        className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-foreground transition-colors cursor-pointer"
                      >
                        {overlayMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      </button>
                    </div>
                  </div>
                ) : activeProject.image ? (
                  <div className="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/5">
                    <img src={activeProject.image} alt={activeProject.title} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="w-full aspect-video rounded-3xl overflow-hidden bg-white/5 border border-white/5 flex items-center justify-center">
                    <Terminal size={48} className="text-muted-foreground" />
                  </div>
                )}

                {/* Additional screenshot list / generic image gallery */}
                {activeProject.id === 'studyshare' ? (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium border-b border-border/10 pb-2">
                      System Interface &amp; Ingestion Screenshots ({studyshareScreenshots.length})
                    </h4>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                      {studyshareScreenshots.map((shot, idx) => (
                        <div 
                          key={idx}
                          onClick={() => openLightbox(studyshareScreenshots.map(s => s.src), idx)}
                          className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 bg-black/20 cursor-pointer group hover:scale-[1.05] transition-transform duration-300"
                        >
                          <img src={shot.src} alt={shot.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <ExternalLink size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : activeProject.images && activeProject.images.length > 0 ? (
                  <div className="space-y-4">
                    <h4 className="text-xs uppercase tracking-[0.25em] text-muted-foreground font-medium border-b border-border/10 pb-2">
                      Project Media Gallery ({activeProject.images.length})
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {activeProject.images.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => openLightbox(activeProject.images || [], idx)}
                          className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/20 cursor-pointer group hover:scale-[1.05] transition-transform duration-300"
                        >
                          <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <ExternalLink size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

              </div>

              {/* Description & Metadata Block (Col-Span-5) */}
              <div className="lg:col-span-5 space-y-8 text-left">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground mb-3 font-mono">
                    {activeProject.categoryLabel}
                  </span>
                  
                  <h2 className="text-3xl sm:text-4xl font-normal text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    {activeProject.title}
                  </h2>
                  
                  {activeProject.tag && (
                    <p className="text-xs text-emerald-400 font-mono mt-1 uppercase tracking-wider">{activeProject.tag}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Overview</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {activeProject.stats && (
                  <div className="grid grid-cols-2 gap-4">
                    {activeProject.stats.map((stat, i) => (
                      <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/5 text-center">
                        <span className="block text-2xs text-muted-foreground uppercase tracking-wider mb-1">{stat.label}</span>
                        <span className="block text-lg font-bold text-foreground font-mono">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Core Features &amp; Architecture</h4>
                  <ul className="space-y-2">
                    {activeProject.features.map((feat, i) => (
                      <li key={i} className="text-xs text-muted-foreground flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle size={14} className="text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Technology Stack</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.techStack.map((tech) => (
                      <span key={tech} className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 border-t border-border/10 pt-6">
                  {activeProject.website && (
                    <a 
                      href={activeProject.website}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 rounded-full bg-white text-background hover:bg-white/90 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-white/5"
                    >
                      <ExternalLink size={14} /> Visit Website / Deployment
                    </a>
                  )}

                  {activeProject.github && (
                    <a 
                      href={activeProject.github}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 text-foreground border border-white/10 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Terminal size={14} /> View GitHub Repo
                    </a>
                  )}

                  {activeProject.linkedin && (
                    <a 
                      href={activeProject.linkedin}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-5 py-2.5 rounded-full bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-600/20 text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Award size={14} /> Hackathon Announcement
                    </a>
                  )}
                </div>

              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 9. SLIDING FULLSCREEN BLOG ARTICLE READER */}
      <AnimatePresence>
        {selectedBlogId && activeBlog && (
          <motion.div 
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 220 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl overflow-y-auto px-6 py-20 flex flex-col items-center"
          >
            {/* Reader Navigation Bar */}
            <div className="max-w-4xl w-full flex items-center justify-between border-b border-border/10 pb-6 mb-10">
              <button 
                onClick={() => { window.location.hash = '#blog' }}
                className="flex items-center gap-2 text-sm text-foreground hover:text-muted-foreground font-medium cursor-pointer transition-colors"
              >
                <ChevronLeft size={20} /> Back to Articles
              </button>

              <span className="text-xs text-muted-foreground font-mono">
                {activeBlog.readTime} &bull; {activeBlog.date}
              </span>
            </div>

            {/* Article Content */}
            <article className="max-w-3xl w-full text-left space-y-8 pb-16">
              <div className="space-y-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-mono bg-white/5 border border-white/10 text-cyan-400">
                  {activeBlog.category}
                </span>
                <h1 className="text-3xl sm:text-5xl font-normal text-foreground leading-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  {activeBlog.title}
                </h1>
                <div className="flex items-center gap-3 text-xs text-muted-foreground pt-2">
                  <span>Author: <strong className="text-foreground">Harshit Pal</strong></span>
                  <span>&bull;</span>
                  <span>Published in <strong>Engineering Insights</strong></span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-muted-foreground text-sm leading-relaxed italic">
                {activeBlog.excerpt}
              </div>

              <div className="space-y-6 text-muted-foreground text-sm sm:text-base leading-relaxed">
                {activeBlog.content.map((paragraph, index) => (
                  <p key={index} className="text-zinc-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
                {activeBlog.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-12">
                <div>
                  <h4 className="text-base font-semibold text-foreground">Interested in this architecture?</h4>
                  <p className="text-xs text-muted-foreground mt-1">Let&apos;s discuss system designs, RAG retrieval, or mesh networks.</p>
                </div>
                <button 
                  onClick={() => {
                    window.location.hash = '#reach-us'
                  }}
                  className="px-6 py-2.5 rounded-full bg-white text-zinc-950 hover:bg-zinc-200 text-xs font-semibold cursor-pointer shrink-0"
                >
                  Contact Harshit
                </button>
              </div>
            </article>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}

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
  Shield
} from 'lucide-react'

export default function App() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [lightboxImages, setLightboxImages] = useState<string[]>([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Active hash overlay project
  const [selectedProjectHash, setSelectedProjectHash] = useState<string | null>(null)

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
      const validHashes = [
        '#bis-engine',
        '#studyshare',
        '#returnshield-ai',
        '#code-analyser',
        '#buildsmart',
        '#manhole-mesh',
        '#stair-lighting',
        '#weather-tech'
      ]
      if (hash && validHashes.includes(hash)) {
        setSelectedProjectHash(hash)
        document.body.style.overflow = 'hidden' // Stop body scrolling when overlay is open
      } else {
        setSelectedProjectHash(null)
        document.body.style.overflow = '' // Restore body scroll
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange() // check on load

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
      document.body.style.overflow = ''
    }
  }, [])

  interface Project {
    id: string
    title: string
    category: string
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
      category: 'AI / RAG Search',
      tag: 'Hackathon Winner',
      description: 'Indian Micro and Small Enterprises (MSEs) spend weeks trying to find which Bureau of Indian Standards (BIS) regulations apply to their products. This AI-powered RAG pipeline ingests official BIS SP 21 cement, steel, and concrete catalogs to return top-5 ranked IS codes with explanation rationales in under 0.01 seconds.',
      video: '/videos/bis-standards-walkthrough.mp4',
      techStack: ['Python', 'RAG Pipeline', 'FAISS', 'BM25 Retriever', 'FastAPI', 'JSON Schema', 'Robustness Testing'],
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
        'RAG Engine — PDF Ingestion, Hierarchical Chunking, and FAISS Vector Search.',
        'Hybrid Retrieval — Combined Dense Embeddings (FAISS) and Sparse Keyword Match (BM25) for top-5 regulations.',
        'Latency Optimization — Sub-0.01s catalog lookup and response extraction.'
      ]
    },
    {
      id: 'studyshare',
      title: 'StudyShare Platform',
      category: 'Product Suite (Live)',
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
      id: 'returnshield-ai',
      title: 'ReturnShield AI',
      category: 'AI / Fraud Prevention',
      tag: 'Innogeeks Hackathon',
      description: 'Built during the Innogeeks Hackathon (KIET College Club). ReturnShield AI is an intelligent predictive return risk and fraud prevention platform for e-commerce brands. Powered by a trained scikit-learn machine learning pipeline evaluating customer return frequency, discount patterns, and purchase tiers to calculate live risk scores and revenue impact.',
      techStack: ['React 19', 'TypeScript', 'Python', 'scikit-learn', 'Joblib', 'Vite', 'Geist UI', 'Vercel Edge'],
      stats: [
        { label: 'Accuracy', value: '95.0%' },
        { label: 'Inference', value: '45ms' },
        { label: 'False Positives', value: '< 2.1%' },
        { label: 'Hackathon', value: 'Innogeeks' }
      ],
      github: 'https://github.com/harshit-siraswal/ReturnsheildAI',
      website: 'https://returnsheild-ai.vercel.app',
      features: [
        'Trained ML Classification Pipeline — Multi-feature model evaluating return velocity, seller ratings, and discount sensitivity.',
        'Revenue Impact Engine — Live calculation of order value at risk and estimated net merchant loss.',
        'Action Stack & One-Click Interventions — Automated rule enforcement for high-risk orders with flagged return prevention workflows.',
        'Geist Design Dashboard — High-performance React 19 interface with 12-week risk trend visualization and Vercel Edge Copilot.'
      ]
    },
    {
      id: 'code-analyser',
      title: 'Code Analyser',
      category: 'CLI & Compiler Sandbox',
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
      title: 'BuildSmart',
      category: 'AI Integration Platform',
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
      category: 'Hardware & IoT Mesh',
      tag: 'ESP32 Device',
      description: 'An IoT device using ESP32, load cell amplifiers, and ultrasonic sensors to detect missing covers in real time. Deployed ESP-NOW mesh protocol to relay cover status to municipal dashboards without relying on GSM or WiFi. Wokwi simulations are available for testing mesh relaying.',
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
      category: 'Hardware & IoT',
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
      category: 'Hardware & Telemetry',
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

  // Find active project based on hash state
  const activeProject = projectsData.find(p => `#${p.id}` === selectedProjectHash)

  // Track active scroll section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'studio', 'about', 'journal', 'reach-us']
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
    { name: 'TypeScript', level: 90, category: 'languages' },
    { name: 'JavaScript', level: 95, category: 'languages' },
    { name: 'Python', level: 88, category: 'languages' },
    { name: 'Dart', level: 80, category: 'languages' },
    { name: 'C++', level: 75, category: 'languages' },
    { name: 'HTML5/CSS3', level: 95, category: 'languages' },
    
    { name: 'React', level: 90, category: 'frontend' },
    { name: 'Next.js', level: 88, category: 'frontend' },
    { name: 'Tailwind CSS', level: 95, category: 'frontend' },
    { name: 'shadcn/ui', level: 92, category: 'frontend' },
    { name: 'Flutter (Mobile)', level: 82, category: 'frontend' },
    { name: 'Vite', level: 90, category: 'frontend' },

    { name: 'Node.js', level: 88, category: 'backend' },
    { name: 'Express', level: 90, category: 'backend' },
    { name: 'NestJS', level: 80, category: 'backend' },
    { name: 'FastAPI (Python)', level: 85, category: 'backend' },
    { name: 'Prisma ORM', level: 85, category: 'backend' },
    { name: 'REST APIs', level: 92, category: 'backend' },

    { name: 'PostgreSQL', level: 85, category: 'databases' },
    { name: 'Neon Serverless', level: 85, category: 'databases' },
    { name: 'Redis', level: 75, category: 'databases' },

    { name: 'Docker', level: 80, category: 'devops' },
    { name: 'Vercel / Railway', level: 88, category: 'devops' },
    { name: 'Git & GitHub', level: 90, category: 'devops' },
    { name: 'n8n Automation', level: 85, category: 'devops' },
    { name: 'AI/LLM Integration', level: 90, category: 'devops' },
    { name: 'ESP32 & IoT Mesh', level: 85, category: 'devops' }
  ]

  const filteredSkills = selectedSkillCategory === 'all' 
    ? skillsData 
    : skillsData.filter(s => s.category === selectedSkillCategory)

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
          <div className="max-w-7xl mx-auto px-8 py-6 flex items-center justify-between">
            {/* Logo */}
            <div 
              onClick={() => scrollTo('home')}
              className="text-3xl tracking-tight text-foreground cursor-pointer select-none font-normal"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Harshit Pal<span className="text-muted-foreground">.</span>
            </div>

            {/* Nav Links - Desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { name: 'Home', id: 'home' },
                { name: 'Studio', id: 'studio' },
                { name: 'About', id: 'about' },
                { name: 'Journal', id: 'journal' },
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
            <div className="hidden md:block">
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
        <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] flex-grow max-w-7xl mx-auto">
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
            I am a Full-Stack Developer and IoT Engineer. I build responsive web systems, 
            intelligent AI search pipelines, and self-healing hardware mesh networks.
          </p>

          {/* Centered Hero CTA */}
          <button 
            onClick={() => scrollTo('studio')}
            className="animate-fade-rise-delay-2 liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 hover:scale-[1.03] transition-all duration-300 cursor-pointer tracking-wider font-medium select-none"
          >
            Explore Projects
          </button>
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
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 border-b border-border/20 pb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3">STUDIO CREATIONS</p>
              <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Crafting with Code &amp; Copper.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md mt-4 md:mt-0 text-sm sm:text-base leading-relaxed">
              Explore a collection of production-grade web applications, RAG search pipelines, and embedded IoT mesh networks.
            </p>
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
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground">
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
                      <span className="px-4 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground">
                        Flagship Product
                      </span>
                      <span className="text-xs text-muted-foreground font-mono">
                        Active Campus Administration Suite
                      </span>
                    </div>
                    
                    <h3 className="text-3xl sm:text-4xl font-normal text-foreground mb-4 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      StudyShare Platform
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

          {/* Row of 3 projects (ReturnShield AI, Code Analyser, BuildSmart) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            
            {/* Project: ReturnShield AI (Innogeeks Hackathon) */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#returnshield-ai' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">AI / Innogeeks Hackathon</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  ReturnShield AI
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Built during Innogeeks Hackathon. An e-commerce fraud and return risk intelligence platform using scikit-learn classifiers with real-time order risk scoring and loss exposure mitigation.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React 19', 'TypeScript', 'Python', 'scikit-learn', 'Vercel Edge'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                Explore Case Study &amp; Live Site <ExternalLink size={12} />
              </span>
            </motion.div>

            {/* Project: Code Analyser */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#code-analyser' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">CLI &amp; Compiler Sandbox</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Code Analyser
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  A coding practice platform that evaluates HOW users solve problems, rather than just simple outcomes. Uses Monaco Editor, Judge0 API sandbox, and AST parsing to detect code quality, error classification, and big-O time complexity.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['React', 'FastAPI', 'Judge0', 'AST Parser', 'Monaco Editor'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                Explore Case Study &amp; Live Site <ExternalLink size={12} />
              </span>
            </motion.div>

            {/* Project: BuildSmart */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#buildsmart' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">AI Integration Platform</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  BuildSmart
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  AI-powered build management and optimization tool designed and shipped end-to-end in under two weeks. Integrates custom Large Language Models to deliver automated project recommendations and architectural insights.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['TypeScript', 'React', 'Node.js', 'LLM API', 'Vercel'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                Explore Case Study &amp; Live Site <ExternalLink size={12} />
              </span>
            </motion.div>

          </div>

          {/* Row of 3 projects (Hardware: Manhole Mesh, Stair Lighting, Weather Sensor) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            
            {/* Project: Hardware - Manhole Presence Mesh */}
            <motion.div 
              whileHover={{ scale: 1.02, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#manhole-mesh' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">Hardware &amp; IoT Mesh</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Manhole IoT Mesh Detector
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  An IoT device using ESP32, load cell amplifiers, and ultrasonic sensors to detect missing covers in real time. Deployed ESP-NOW mesh protocol to relay cover status to municipal dashboards without relying on GSM or WiFi.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['ESP32', 'ESP-NOW Mesh', 'MQTT', 'Node.js', 'Load Cells'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                View Hardware Mesh Details <ExternalLink size={12} />
              </span>
            </motion.div>

            {/* Project: Stair Lighting */}
            <motion.div 
              whileHover={{ scale: 1.01, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#stair-lighting' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">Hardware &amp; IoT</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Smart Staircase Lighting System
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Motion-activated stair lighting system with smart transitions, ambient light adjustment, and power-saving sleep modes. Utilizes microcontrollers and addressable LED strips to create smooth, visual step tracking.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Arduino', 'ESP32', 'WS2812B LEDs', 'PIR Sensors', 'Custom PCB'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                View Stair Lighting Details <ExternalLink size={12} />
              </span>
            </motion.div>

            {/* Project: Weather Monitoring Sensor */}
            <motion.div 
              whileHover={{ scale: 1.01, translateY: -6 }}
              className="liquid-glass rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-border/10 group cursor-pointer"
              onClick={() => { window.location.hash = '#weather-tech' }}
            >
              <div>
                <span className="text-xs text-muted-foreground font-mono block mb-4">Hardware &amp; Telemetry</span>
                <h4 className="text-2xl font-normal text-foreground mb-3 group-hover:text-zinc-300 transition-colors" style={{ fontFamily: "'Instrument Serif', serif" }}>
                  Weather Monitoring Sensor
                </h4>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  ESP32-based weather station capturing temperature, humidity, and atmospheric pressure. Deploys a Node-RED dashboard for telemetry analysis, plotting live environmental data.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['ESP32', 'DHT22 Sensor', 'BMP280', 'WiFi', 'MQTT', 'Node-RED', 'Grafana'].map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-muted-foreground border border-white/5 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-foreground font-semibold group-hover:underline mt-auto">
                View Telemetry Case Study <ExternalLink size={12} />
              </span>
            </motion.div>

          </div>

          {/* HARDWARE PROJECTS GALLERY SECTION */}
          <div className="mt-20">
            <div className="mb-8">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-2 block">HARDWARE LAB</span>
              <h3 className="text-2xl font-normal text-foreground" style={{ fontFamily: "'Instrument Serif', serif" }}>
                Wiring, Breadboards &amp; Microcontrollers
              </h3>
              <p className="text-muted-foreground text-sm mt-1 max-w-2xl">
                Snapshots from various hardware builds including ESP32 mesh networks, Arduino setups, sensor wiring, and prototype casings. Click to enlarge.
              </p>
            </div>

            {/* Horizontal Scrolling Bento Gallery */}
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
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
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center">
              
              {/* Profile Image & Quote Column */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-64 sm:w-80 aspect-square rounded-3xl overflow-hidden p-2 liquid-glass border border-white/10 shadow-2xl group cursor-pointer">
                  <img 
                    src="/ghibli_coder.jpg" 
                    alt="Harshit Pal Coder Illustration" 
                    className="w-full h-full object-cover rounded-2xl grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
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
                
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6">
                  I am a first-year B.Tech Computer Science &amp; Engineering student at <strong className="text-foreground">KIET Group of Institutions, Ghaziabad</strong>, with an intense drive for building functional tech. I don't just study concepts; I build them into live platforms.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-8">
                  From writing complex NestJS backend pipelines to flashing code on ESP32 microcontrollers for self-sufficient mesh setups, I love bridging the gap between digital software layers and hardware environments.
                </p>

                {/* Grid of Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* NATIONAL CREDENTIAL: 2x NDA & 3x SSB */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <Shield className="text-cyan-400 shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">2x NDA Qualified &bull; 3x SSB</h4>
                      <p className="text-xs text-muted-foreground mt-1">National Defence Academy &amp; SSB Boards</p>
                      <p className="text-2xs text-cyan-400 font-mono mt-1">Conference Out (3x)</p>
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
                      <p className="text-xs text-emerald-400 font-mono mt-1">CGPA: 7.84 (Sem 1: 7.83 | Sem 2: 7.86)</p>
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
                      <p className="text-xs text-amber-400 font-semibold mt-1">Click to view Certificate</p>
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
                      <p className="text-xs text-emerald-400 font-mono mt-1">First-Year Innovator</p>
                      <p className="text-xs text-muted-foreground/80 text-2xs mt-1">Click to view Certificate</p>
                    </div>
                  </button>

                  {/* JEE Score Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                    <Terminal className="text-muted-foreground shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">JEE Main 2025</h4>
                      <p className="text-xs text-muted-foreground mt-1">Percentile: 89.12</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">National Level Competency</p>
                    </div>
                  </div>

                  {/* Schooling Card */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex gap-4 sm:col-span-2">
                    <FileText className="text-muted-foreground shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">SD Public School</h4>
                      <p className="text-xs text-muted-foreground mt-1">Muzaffarnagar (Class X &amp; XII)</p>
                      <p className="text-xs text-muted-foreground mt-1">Class X: 94.6% | Class XII: 81.2%</p>
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
                  <FileText size={18} className="text-muted-foreground" />
                  <span className="text-sm font-mono text-muted-foreground">Harshit_Pal_Resume.pdf</span>
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
              <div className="w-full h-[600px] bg-zinc-950/60 relative">
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
                { name: 'DevOps / IoT', id: 'devops' }
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

        {/* 5. REACH US (CONTACT & RESUME) SECTION */}
        <section id="reach-us" className="bg-white/[0.01] border-t border-border/10 py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-6 sm:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
              
              {/* Contact Info & Resume View */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium mb-3 block">COLLABORATION &amp; INQUIRIES</span>
                  <h2 className="text-4xl sm:text-5xl font-normal text-foreground tracking-tight mb-4" style={{ fontFamily: "'Instrument Serif', serif" }}>
                    Let&apos;s Build Together.
                  </h2>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Have a project in mind, need a full-stack engineer, or want to discuss IoT solutions? Drop a message or download my resume.
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
                      <div className="flex flex-wrap gap-4 mt-1 text-xs font-mono">
                        <a href="https://github.com/harshit-siraswal" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                          GitHub
                        </a>
                        <span className="text-muted-foreground">&bull;</span>
                        <a href="https://linkedin.com/in/harshit-pal" target="_blank" rel="noopener noreferrer" className="text-foreground hover:underline">
                          LinkedIn
                        </a>
                        <span className="text-muted-foreground">&bull;</span>
                        <a href="https://instagram.com/harshit_siraswal" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground hover:underline">
                          @harshit_siraswal
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Resume Download Box */}
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">Professional Resume</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">PDF Document • 3 Live apps</p>
                    </div>
                    <a 
                      href="/Harshit_Pal_Resume.pdf" 
                      download="Harshit_Pal_Resume.pdf" 
                      className="px-4 py-2 rounded-full bg-white text-background hover:bg-white/90 text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-lg hover:shadow-white/5"
                    >
                      <Download size={14} /> Download PDF
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
            &copy; 2026 HARSHIT PAL. Built with React + Tailwind v4 + TypeScript.
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <button onClick={() => scrollTo('home')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Top</button>
            <button onClick={() => scrollTo('studio')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Studio</button>
            <button onClick={() => scrollTo('about')} className="hover:text-foreground transition-colors font-medium cursor-pointer">About</button>
            <button onClick={() => scrollTo('journal')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Journal</button>
            <button onClick={() => scrollTo('reach-us')} className="hover:text-foreground transition-colors font-medium cursor-pointer">Reach Us</button>
          </div>
        </div>
      </footer>

      {/* 6. INTERACTIVE MEDIA LIGHTBOX / MODAL OVERLAY */}
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

      {/* 7. SLIDING FULLSCREEN PROJECT OVERLAY (CASE STUDY PAGE) */}
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
                  className="text-xs text-muted-foreground hover:text-foreground font-mono uppercase tracking-wider transition-colors"
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
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground mb-3">
                    {activeProject.category}
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

    </div>
  )
}

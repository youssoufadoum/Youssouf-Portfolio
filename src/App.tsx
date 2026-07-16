import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  MapPin, 
  ExternalLink, 
  FileText, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ChevronUp, 
  Database, 
  Cpu, 
  LineChart, 
  Code, 
  Brain, 
  Award, 
  BookOpen, 
  Briefcase, 
  Calendar, 
  Sparkles, 
  Terminal,
  Send,
  CheckCircle,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS, SKILLS, EXPERIENCE, CERTIFICATIONS } from './data';
import { Project } from './types';

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<'all' | 'se' | 'bi'>('all');
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('languages');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [typedIndex, setTypedIndex] = useState<number>(0);
  const [typedSubText, setTypedSubText] = useState<string>('');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  
  // Contact Form States
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);

  const subTextOptions = [
    'I build modern web applications and full-stack solutions.',
    'I design interactive data-driven Business Intelligence dashboards.',
    'I implement predictive analytics and scalable ETL pipelines.',
    'I deploy AI-assisted automated systems that solve real-world problems.'
  ];

  // Simulated typing effect
  useEffect(() => {
    let currentText = subTextOptions[typedIndex];
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const tick = () => {
      if (charIndex <= currentText.length && !isDeleting) {
        setTypedSubText(currentText.substring(0, charIndex));
        charIndex++;
        timeoutId = setTimeout(tick, 50);
      } else if (isDeleting && charIndex >= 0) {
        setTypedSubText(currentText.substring(0, charIndex));
        charIndex--;
        timeoutId = setTimeout(tick, 25);
      } else if (!isDeleting && charIndex > currentText.length) {
        isDeleting = true;
        // Pause before backspacing
        timeoutId = setTimeout(tick, 2000);
      } else if (isDeleting && charIndex < 0) {
        isDeleting = false;
        charIndex = 0;
        setTypedIndex((prev) => (prev + 1) % subTextOptions.length);
      }
    };

    tick();
    return () => clearTimeout(timeoutId);
  }, [typedIndex]);

  // Loading animation simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Sync dark class to DOM html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Monitor scroll for progress and back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter projects based on choice
  const filteredProjects = selectedProjectCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedProjectCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitSuccess(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitSuccess(false), 5000);
    }, 1500);
  };



  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* 1. SCROLL PROGRESS BAR */}
      <div 
        id="scroll-progress-bar"
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-brand-blue to-brand-purple z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* 2. LOADING ANIMATION */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            id="preloader"
            className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center text-slate-100 font-mono p-4"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            <div className="w-full max-w-md p-6 rounded-2xl glass-panel relative border border-slate-800">
              <div className="flex items-center gap-2 mb-4 text-brand-blue">
                <Terminal size={18} />
                <span className="text-xs uppercase tracking-widest font-semibold">System Initialization</span>
              </div>
              <div className="space-y-2 mb-6">
                <p className="text-sm text-slate-400">&gt; npm run start:portfolio</p>
                <p className="text-sm text-slate-500">&gt; compiling dependencies...</p>
                <p className="text-sm text-brand-purple font-semibold">&gt; Loading portfolio modules ({Math.min(loadingProgress, 100)}%)</p>
              </div>
              
              {/* Progress Track */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-brand-blue to-brand-purple"
                  initial={{ width: '0%' }}
                  animate={{ width: `${Math.min(loadingProgress, 100)}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="mt-4 flex justify-between text-xs text-slate-500">
                <span>Youssouf Adoum Abakar</span>
                <span>v3.1.0</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. PREMIUM FLOATING HEADER */}
      <header 
        id="navbar-header"
        className="fixed top-4 left-4 right-4 z-40 mx-auto max-w-7xl"
      >
        <div className="w-full rounded-2xl px-6 py-4 glass-panel flex items-center justify-between transition-all duration-300 shadow-lg">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold text-sm tracking-tighter shadow-md">
              YA
            </div>
            <span className="font-display font-bold text-lg tracking-tight group-hover:text-brand-blue transition-colors">
              Youssouf<span className="text-brand-purple">.</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#about" className="text-slate-400 hover:text-slate-100 dark:text-slate-300 dark:hover:text-white transition-colors">About</a>
            <a href="#skills" className="text-slate-400 hover:text-slate-100 dark:text-slate-300 dark:hover:text-white transition-colors">Skills</a>
            <a href="#projects" className="text-slate-400 hover:text-slate-100 dark:text-slate-300 dark:hover:text-white transition-colors">Projects</a>
            <a href="#experience" className="text-slate-400 hover:text-slate-100 dark:text-slate-300 dark:hover:text-white transition-colors">Experience</a>
            <a href="#contact" className="text-slate-400 hover:text-slate-100 dark:text-slate-300 dark:hover:text-white transition-colors">Contact</a>
          </nav>

          {/* Action Buttons: Theme and Call */}
          <div className="flex items-center gap-4">
            <button
              id="theme-toggle"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 dark:border-slate-800 dark:hover:bg-slate-900 transition-all text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="#contact"
              className="hidden sm:inline-flex px-4 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 text-xs font-semibold hover:bg-opacity-90 transition-all shadow"
            >
              Let's Connect
            </a>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 md:hidden rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-all"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              id="mobile-drawer"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-20 left-0 right-0 p-4 rounded-2xl glass-panel md:hidden flex flex-col gap-4 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <nav className="flex flex-col gap-3 font-medium">
                <a 
                  href="#about" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  About Me
                </a>
                <a 
                  href="#skills" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  Skills & Tools
                </a>
                <a 
                  href="#projects" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  Portfolio Projects
                </a>
                <a 
                  href="#experience" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  Experience
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 rounded-xl text-slate-400 hover:text-white dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900/50 transition-all"
                >
                  Get In Touch
                </a>
              </nav>

            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 4. HERO SECTION */}
      <section 
        id="hero" 
        className="relative min-h-screen flex items-center pt-32 pb-20 px-4 overflow-hidden"
      >
        {/* Background glowing gradients */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-blue/15 dark:bg-brand-blue/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-purple/15 dark:bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Floating Technology Icon Backdrops */}
        <div className="absolute inset-0 select-none opacity-40 dark:opacity-30 pointer-events-none">
          <div className="absolute top-1/3 left-10 animate-bounce" style={{ animationDuration: '6s' }}>
            <div className="px-3 py-1.5 rounded-full glass-panel text-xs font-mono border border-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-yellow-400" /> Python
            </div>
          </div>
          <div className="absolute bottom-1/4 left-16 animate-bounce" style={{ animationDuration: '8s' }}>
            <div className="px-3 py-1.5 rounded-full glass-panel text-xs font-mono border border-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-sky-400" /> Vue.js
            </div>
          </div>
          <div className="absolute top-1/4 right-16 animate-bounce" style={{ animationDuration: '5s' }}>
            <div className="px-3 py-1.5 rounded-full glass-panel text-xs font-mono border border-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-500" /> Power BI
            </div>
          </div>
          <div className="absolute bottom-1/3 right-10 animate-bounce" style={{ animationDuration: '7s' }}>
            <div className="px-3 py-1.5 rounded-full glass-panel text-xs font-mono border border-slate-800 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> SQL
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 mb-6 text-xs font-medium backdrop-blur-sm">
              <Sparkles size={12} className="text-brand-purple animate-pulse" />
              <span className="text-slate-600 dark:text-slate-300">Open for Freelance & Analytics Roles</span>
            </div>

            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-4 leading-tight">
              Youssouf <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">
                Adoum Abakar
              </span>
            </h1>

            {/* Typing Subtitle wrapper */}
            <div className="h-20 sm:h-12 flex items-center mb-6">
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 font-medium">
                Software Engineer | Business Intelligence & Data Analytics
                <br />
                <span className="inline-block mt-1 text-slate-800 dark:text-slate-300 font-mono text-sm sm:text-base border-r-2 border-brand-purple pr-1 animate-pulse">
                  {typedSubText || ' '}
                </span>
              </p>
            </div>

            <p className="text-slate-500 dark:text-slate-400 max-w-xl text-base leading-relaxed mb-8">
              "I build modern web applications, dashboards, and AI-powered solutions that solve real-world problems."
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 w-full sm:w-auto">
              <a 
                href="#projects"
                className="flex-1 sm:flex-initial px-6 py-3.5 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-95 text-white font-medium text-sm text-center shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                View Projects
              </a>

              <a 
                href="#contact"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-brand-blue/30 text-brand-blue dark:text-brand-blue hover:bg-brand-blue/5 font-medium text-sm text-center transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Hero Abstract Graphic / Visual Illustration */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 flex items-center justify-center group shadow-2xl">
              <div className="absolute inset-1 rounded-2xl overflow-hidden">
                <img 
                  src="/src/assets/images/hero_illustration_1784123859934.jpg" 
                  alt="Youssouf Adoum Abakar - Professional abstract portfolio background visualization"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              
              {/* Overlay Glass Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel border border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-300 font-mono">Specialization</p>
                  <p className="text-sm font-bold text-white">Full-Stack & Data Intelligence</p>
                </div>
                <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                  <Database size={16} className="text-brand-blue" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ABOUT ME SECTION */}
      <section id="about" className="py-24 px-4 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-blue mb-2">My Story</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">About Me</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
            
            {/* Bio Card */}
            <div className="lg:col-span-7 flex flex-col justify-between p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl">
              <div>
                <p className="text-slate-600 dark:text-slate-300 text-lg leading-relaxed mb-6 font-light">
                  I am a final-year Information Technology student specializing in <strong className="font-semibold text-brand-blue">Business Intelligence & Data Analytics</strong> at the <strong className="font-semibold text-slate-800 dark:text-white">International Islamic University Malaysia (IIUM)</strong>.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-6">
                  I enjoy building modern web applications, data-driven dashboards, and AI-powered solutions. My interests cover the intersection of Software Engineering, Artificial Intelligence, Business Intelligence, Data Analytics, Cloud Computing, and Automation.
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8">
                  I am passionate about solving complex workflow problems through technology, continuously learning new tools, and creating structured data warehouses that turn noise into high-value executive insights.
                </p>
              </div>

              {/* Minimal metrics / counters */}
              <div className="grid grid-cols-3 gap-4 border-t border-slate-200 dark:border-slate-800 pt-6">
                <div>
                  <p className="text-2xl sm:text-3xl font-bold font-display text-brand-blue">5+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Core Projects</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold font-display text-brand-purple">20+</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Tools Mastered</p>
                </div>
                <div>
                  <p className="text-2xl sm:text-3xl font-bold font-display text-slate-700 dark:text-slate-300">Final</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">Academic Year</p>
                </div>
              </div>
            </div>

            {/* Education & Values Container */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Education Card */}
              <div className="p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-lg flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-blue/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-blue tracking-widest uppercase">Education</span>
                    <h3 className="font-display font-bold text-lg mt-1">International Islamic University Malaysia</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Bachelor of Information Technology</p>
                    <p className="text-xs font-mono text-brand-purple font-medium mt-2">Specialization: Business Intelligence & Data Analytics</p>
                  </div>
                </div>
              </div>

              {/* Core Values Card */}
              <div className="p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-lg flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-bl-full pointer-events-none" />
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
                    <Brain size={22} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-purple tracking-widest uppercase">My Philosophy</span>
                    <h3 className="font-display font-bold text-lg mt-1">Solving with Structured Data</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      "Noise becomes structure. Structure becomes knowledge. Knowledge drives better real-world actions."
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. SKILLS SECTION */}
      <section id="skills" className="py-24 px-4 bg-slate-900/40 dark:bg-slate-950/40 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-purple mb-2">Capabilities</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Skills & Technologies</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          {/* Skill category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {[
              { id: 'languages', label: 'Programming Languages' },
              { id: 'frontend', label: 'Frontend UI' },
              { id: 'backend', label: 'Backend & APIs' },
              { id: 'bi', label: 'Business Intelligence' },
              { id: 'tools', label: 'Developer Tools' },
              { id: 'ai', label: 'AI & Copilots' },
              { id: 'soft', label: 'Soft Skills' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSkillCategory(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeSkillCategory === tab.id
                    ? 'bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 border border-slate-200 dark:border-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Skills content area with progress bar counters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.filter(s => s.category === activeSkillCategory).map((skill, idx) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow hover:border-brand-purple/40 transition-all group"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-brand-blue transition-colors">{skill.name}</span>
                  <span className="text-xs font-mono font-bold text-brand-purple">{skill.proficiency}%</span>
                </div>
                {/* Visual percentage track */}
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-brand-blue to-brand-purple"
                    initial={{ width: '0%' }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. FEATURED PROJECTS SECTION (with filters) */}
      <section id="projects" className="py-24 px-4 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-blue mb-2">Showcase</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Featured Projects</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          {/* Projects filter menu */}
          <div className="flex justify-center gap-2 mb-12">
            {[
              { id: 'all', label: 'All Projects' },
              { id: 'se', label: 'Software Engineering' },
              { id: 'bi', label: 'Business Intelligence & Data' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedProjectCategory(tab.id as any)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all ${
                  selectedProjectCategory === tab.id
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow border-slate-900 dark:border-white'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-850 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-850'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects layout grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={project.id}
                  className="rounded-3xl overflow-hidden glass-panel border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between group"
                >
                  <div>
                    {/* Project preview header image */}
                    <div className="relative aspect-video overflow-hidden border-b border-slate-200 dark:border-slate-800 bg-slate-900">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                        referrerPolicy="no-referrer"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                      
                      {/* Overlay Project category badge */}
                      <span className="absolute top-4 right-4 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider bg-slate-950/80 text-white border border-white/10">
                        {project.category === 'se' ? 'Software Eng' : 'BI & Analytics'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-slate-100 group-hover:text-brand-blue transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mt-3 mb-6">
                        {project.description}
                      </p>

                      {/* Built features listed out */}
                      <div className="mb-6">
                        <h4 className="text-xs uppercase tracking-wider font-semibold text-slate-400 dark:text-slate-500 mb-2.5">Key Deliverables</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                          {project.features.map(f => (
                            <div key={f} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                              <CheckCircle size={12} className="text-brand-purple shrink-0" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Stack Pills */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map(tag => (
                          <span 
                            key={tag}
                            className="px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-900/80 text-[10px] font-mono text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="px-6 py-4 sm:px-8 sm:py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/10 flex items-center gap-4">
                    {project.githubUrl && project.githubUrl !== '#' && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors flex items-center gap-1.5"
                      >
                        <Github size={15} />
                        Source Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-semibold text-brand-blue hover:underline transition-colors flex items-center gap-1.5 ml-auto"
                      >
                        Live Demo
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 8. EXPERIENCES TIMELINE SECTION */}
      <section id="experience" className="py-24 px-4 bg-slate-900/40 dark:bg-slate-950/40 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-purple mb-2">My Timeline</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Work Experience</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          {/* Timeline Structure */}
          <div className="max-w-4xl mx-auto relative pl-6 sm:pl-8 border-l-2 border-slate-200 dark:border-slate-800 py-4">
            {EXPERIENCE.map((exp, idx) => (
              <div key={exp.company + exp.role} className="relative mb-12 last:mb-0">
                {/* Node indicator */}
                <div className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-slate-950 border-2 border-brand-purple flex items-center justify-center glow-purple">
                  <div className="w-2 h-2 rounded-full bg-brand-blue" />
                </div>

                <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-lg relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-slate-100">{exp.role}</h3>
                      <p className="text-sm font-semibold text-brand-blue mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-900 text-xs font-mono font-medium text-slate-500 dark:text-slate-400 self-start sm:self-center">
                      <Calendar size={12} className="mr-1.5 mt-0.5" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-3">
                    {exp.points.map((p, pIdx) => (
                      <li key={pIdx} className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mt-2 shrink-0" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. CERTIFICATIONS SECTION */}
      <section id="certifications" className="py-24 px-4 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-blue mb-2">Qualifications</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Certifications</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {CERTIFICATIONS.map((cert) => (
              <div 
                key={cert.title}
                className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow hover:border-brand-blue/35 transition-all flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                  <Award size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 leading-tight">{cert.title}</h3>
                  <p className="text-xs text-brand-purple mt-1.5 font-semibold uppercase tracking-wider">{cert.issuer}</p>
                  <p className="text-xs text-slate-500 mt-1">Acquired in {cert.date}</p>
                  
                  {cert.credentialId && (
                    <p className="text-[10px] font-mono text-slate-400 mt-2">Credential ID: {cert.credentialId}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Placeholder Certificate card requested by user */}
            <div className="p-6 rounded-2xl glass-panel border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center text-center text-slate-400 dark:text-slate-500 h-full min-h-[140px]">
              <div>
                <Sparkles size={20} className="mx-auto mb-2 text-brand-purple animate-pulse" />
                <p className="text-sm font-medium">AWS Certified Solutions Architect</p>
                <p className="text-xs text-slate-400">Target Certification — In Progress</p>
              </div>
            </div>

            <div className="p-6 rounded-2xl glass-panel border border-dashed border-slate-300 dark:border-slate-800 flex items-center justify-center text-center text-slate-400 dark:text-slate-500 h-full min-h-[140px]">
              <div>
                <Sparkles size={20} className="mx-auto mb-2 text-brand-blue animate-pulse" />
                <p className="text-sm font-medium">Google Professional Data Engineer</p>
                <p className="text-xs text-slate-400">Target Certification — In Progress</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. GITHUB STATISTICS & ACTIVITY */}
      <section id="github-stats" className="py-24 px-4 bg-slate-900/40 dark:bg-slate-950/40 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-purple mb-2">Open Source</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">GitHub Contributions & Activity</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {/* Header Cards with Stats Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow text-center">
                <p className="text-3xl font-extrabold font-mono text-brand-blue">1,482</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mt-1">Total Contributions</p>
              </div>
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow text-center">
                <p className="text-3xl font-extrabold font-mono text-brand-purple">47 Days</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mt-1">Current Daily Streak</p>
              </div>
              <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800 shadow text-center">
                <p className="text-3xl font-extrabold font-mono text-emerald-400">98.5%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest font-semibold mt-1">Commit Success Rate</p>
              </div>
            </div>

            {/* GitHub Activity Grid Heatmap (Visual Mockup) */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-lg">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Github size={16} className="text-brand-purple" />
                  <span>Contribution Calendar (Simulated Live Tracker)</span>
                </h3>
                <span className="text-xs font-mono text-slate-400">July 2025 – July 2026</span>
              </div>
              
              {/* Contribution Squares Grid */}
              <div className="overflow-x-auto no-scrollbar pb-2">
                <div className="min-w-[640px] flex flex-col gap-1">
                  {/* Grid of 7 rows */}
                  {Array.from({ length: 7 }).map((_, rowIdx) => {
                    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                    return (
                      <div key={rowIdx} className="flex gap-1 items-center">
                        <span className="w-8 text-[9px] font-mono text-slate-500">{rowIdx % 2 === 0 ? weekdays[rowIdx] : ''}</span>
                        {/* 52 weeks of cells */}
                        {Array.from({ length: 52 }).map((_, colIdx) => {
                          // Generates random contribution level (0 to 4)
                          const hash = (rowIdx * 3 + colIdx * 7) % 5;
                          let cellBg = 'bg-slate-100 dark:bg-slate-900';
                          if (hash === 1) cellBg = 'bg-brand-blue/30';
                          if (hash === 2) cellBg = 'bg-brand-blue/60';
                          if (hash === 3) cellBg = 'bg-brand-purple/50';
                          if (hash === 4) cellBg = 'bg-brand-purple';

                          return (
                            <div 
                              key={colIdx} 
                              className={`w-3 h-3 rounded-sm ${cellBg} hover:scale-125 transition-transform cursor-pointer relative group`}
                              title={`Contributions level: ${hash}`}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Legends */}
              <div className="mt-4 flex justify-between items-center text-[10px] text-slate-500">
                <span>Total 34 repositories parsed</span>
                <div className="flex items-center gap-1.5 font-mono">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-150 dark:bg-slate-900" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-brand-blue/30" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-brand-blue/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-brand-purple/50" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-brand-purple" />
                  <span>More</span>
                </div>
              </div>
            </div>

            {/* Top Languages Distribution Cards */}
            <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-lg">
              <h3 className="text-sm font-semibold mb-6 flex items-center gap-2">
                <BarChart2 size={16} className="text-brand-blue" />
                <span>Top Visualized Languages Distribution</span>
              </h3>

              <div className="space-y-4">
                {[
                  { lang: 'SQL / Databases', percentage: 40, color: 'from-brand-blue to-blue-400' },
                  { lang: 'JavaScript & Vue.js', percentage: 30, color: 'from-brand-purple to-purple-400' },
                  { lang: 'Python', percentage: 20, color: 'from-amber-400 to-yellow-500' },
                  { lang: 'Java', percentage: 10, color: 'from-red-400 to-rose-500' }
                ].map((item) => (
                  <div key={item.lang}>
                    <div className="flex justify-between items-center text-xs font-mono font-medium mb-1.5 text-slate-400">
                      <span className="text-slate-800 dark:text-slate-300">{item.lang}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. CONTACT SECTION */}
      <section id="contact" className="py-24 px-4 relative">
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-xs uppercase tracking-widest font-semibold text-brand-blue mb-2">Connect</h2>
            <p className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Contact Me</p>
            <div className="h-1 w-12 bg-gradient-to-r from-brand-blue to-brand-purple mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch max-w-5xl mx-auto">
            
            {/* Contact details */}
            <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/5 rounded-bl-full pointer-events-none" />
              
              <div>
                <h3 className="font-display font-bold text-xl mb-4">Let's discuss details</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8">
                  Whether you have a freelance requirement, a Business Intelligence contract opportunity, or a job offer, I am available. Feel free to contact me using any of the listed channels!
                </p>

                {/* Info Blocks */}
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center text-brand-blue shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Email Address</p>
                      <a href="mailto:y.adamabakar81@gmail.com" className="text-sm font-semibold hover:text-brand-blue transition-colors">y.adamabakar81@gmail.com</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center text-brand-purple shrink-0">
                      <Linkedin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">LinkedIn Profile</p>
                      <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-brand-purple transition-colors">Youssouf Adoum Abakar</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                      <Github size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">GitHub Repository</p>
                      <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm font-semibold hover:text-slate-600 dark:hover:text-white transition-colors">github.com/youssouf-abakar</a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                      <MapPin size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Location</p>
                      <span className="text-sm font-semibold">Kuala Lumpur, Malaysia</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 dark:border-slate-800 pt-6 mt-8 flex justify-between text-xs text-slate-500">
                <span>Expected Reply Speed</span>
                <span className="font-semibold text-emerald-400">Within 24 Hours</span>
              </div>
            </div>

            {/* Interactive Contact Form */}
            <div className="lg:col-span-7 p-8 rounded-3xl glass-panel border border-slate-200 dark:border-slate-800 shadow-xl">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all placeholder-slate-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all placeholder-slate-500 text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                  <textarea 
                    id="message"
                    required
                    rows={5}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="What would you like to build or discuss?"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/50 dark:bg-slate-900/50 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none transition-all placeholder-slate-500 text-sm resize-none"
                  />
                </div>

                {isSubmitSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-semibold flex items-center gap-2"
                  >
                    <CheckCircle size={14} />
                    <span>Your message has been sent successfully. Thank you for connecting, Youssouf will reply soon!</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-95 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-98"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 12. MINIMALIST FOOTER */}
      <footer className="py-12 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 px-4 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Youssouf Adoum Abakar. All rights reserved.</p>
          <div className="flex gap-4 text-slate-400 dark:text-slate-500 font-mono">
            <span>Built with React + Tailwind CSS</span>
          </div>
        </div>
      </footer>

      {/* 13. FLOATING BACK TO TOP BUTTON */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-6 right-6 p-3 rounded-xl bg-gradient-to-r from-brand-blue to-brand-purple text-white shadow-xl hover:scale-110 transition-all z-40 flex items-center justify-center cursor-pointer"
            aria-label="Back to top"
          >
            <ChevronUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

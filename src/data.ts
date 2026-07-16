import { Project, Skill, Experience, Certification } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'cyber-drill',
    title: 'Cyber Drill Dashboard & Feedback System',
    description: 'A web-based platform developed for Higher Education Institutions to manage cybersecurity drill sessions, collect feedback, evaluate participant performance, and render security data through interactive dashboards.',
    technologies: ['Vue.js', 'Tailwind CSS', 'Firebase', 'Firestore', 'ApexCharts'],
    features: ['Authentication', 'Interactive Dashboard', 'Drill Session Management', 'Feedback Surveys', 'Real-time Analytics', 'Responsive Design'],
    githubUrl: 'https://github.com/youssouf-abakar/cyber-drill-dashboard',
    liveUrl: 'https://cyber-drill-demo.vercel.app',
    image: '/src/assets/images/cyber_drill_dashboard_1784123875432.jpg',
    category: 'se'
  },
  {
    id: 'shyky-beauty',
    title: 'Shyky Beauty E-Commerce',
    description: 'A premium, responsive e-commerce storefront designed for a beauty and skincare brand. Features structured product catalogs, secure client-side cart operations, and streamlined checkout experience.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS', 'Pinia'],
    features: ['Dynamic Product Catalog', 'User Authentication', 'Interactive Shopping Cart', 'Admin Product Dashboard', 'Responsive Layouts'],
    githubUrl: 'https://github.com/youssouf-abakar/shyky-beauty',
    liveUrl: 'https://shyky-beauty.vercel.app',
    image: '/src/assets/images/beauty_ecommerce_1784123895016.jpg',
    category: 'se'
  },
  {
    id: 'antique-cafe',
    title: 'Antique Café Snack Website',
    description: 'A modern, high-conversion restaurant presentation landing page and customer portal, featuring fully-responsive menu navigation, elegant interactive galleries, and optimized layout assets.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel Deployment'],
    features: ['Visual Menu Display', 'Business Schedule & Details', 'Interactive Image Gallery', 'Fluid Mobile Navigation'],
    githubUrl: 'https://github.com/youssouf-abakar/antique-cafe',
    liveUrl: 'https://antique-cafe.vercel.app',
    image: '/src/assets/images/antique_cafe_1784123940973.jpg',
    category: 'se'
  },
  {
    id: 'bi-dashboard',
    title: 'Enterprise Business Intelligence Dashboard',
    description: 'An advanced executive dashboard built using business intelligence best practices, incorporating star schema structures, data warehouse tables, and interactive KPI cards for active decision support.',
    technologies: ['Power BI', 'SQL Server', 'SSIS (ETL)', 'Microsoft Excel'],
    features: ['Interactive Multi-Page Reports', 'Key Performance Indicators (KPIs)', 'Predictive Sales Analytics', 'Actionable Executive Insights'],
    githubUrl: '#',
    image: '/src/assets/images/bi_dashboard_1784123918060.jpg',
    category: 'bi'
  },
  {
    id: 'data-warehouse',
    title: 'Data Warehouse Implementation',
    description: 'A full-cycle data warehousing solution spanning dimensional modeling, Star Schema design, complex SSIS ETL mapping, and robust business logic layers.',
    technologies: ['SQL', 'SQL Server Integration Services (SSIS)', 'Power BI', 'Star Schema'],
    features: ['Dimensional Modeling', 'Advanced ETL Pipelines', 'Data Cleansing Processes', 'Operational Reporting Integration'],
    githubUrl: '#',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
    category: 'bi'
  }
];

export const SKILLS: Skill[] = [
  // Languages
  { name: 'Python', category: 'languages', proficiency: 50 },
  { name: 'Java', category: 'languages', proficiency: 50 },
  { name: 'JavaScript', category: 'languages', proficiency: 92 },
  { name: 'PHP', category: 'languages', proficiency: 78 },
  { name: 'SQL', category: 'languages', proficiency: 95 },
  { name: 'HTML', category: 'languages', proficiency: 95 },
  { name: 'CSS', category: 'languages', proficiency: 90 },

  // Frontend
  { name: 'Vue.js', category: 'frontend', proficiency: 95 },
  { name: 'React', category: 'frontend', proficiency: 88 },
  { name: 'Tailwind CSS', category: 'frontend', proficiency: 95 },
  { name: 'Vite', category: 'frontend', proficiency: 90 },

  // Backend
  { name: 'Firebase', category: 'backend', proficiency: 90 },
  { name: 'MySQL', category: 'backend', proficiency: 88 },
  { name: 'PostgreSQL', category: 'backend', proficiency: 85 },

  // BI
  { name: 'Power BI', category: 'bi', proficiency: 92 },
  { name: 'Tableau', category: 'bi', proficiency: 80 },
  { name: 'SSIS (ETL)', category: 'bi', proficiency: 88 },
  { name: 'Star Schema & Data Modeling', category: 'bi', proficiency: 90 },
  { name: 'Data Warehousing', category: 'bi', proficiency: 90 },

  // Tools
  { name: 'Git', category: 'tools', proficiency: 90 },
  { name: 'GitHub', category: 'tools', proficiency: 95 },
  { name: 'VS Code', category: 'tools', proficiency: 95 },

  // AI
  { name: 'ChatGPT', category: 'ai', proficiency: 95 },
  { name: 'Claude', category: 'ai', proficiency: 95 },
  { name: 'Gemini', category: 'ai', proficiency: 95 },
  { name: 'OpenAI API', category: 'ai', proficiency: 88 },
  { name: 'AI-assisted Dev (Cursor/Github Copilot)', category: 'ai', proficiency: 95 },

  // Soft Skills
  { name: 'Leadership', category: 'soft', proficiency: 90 },
  { name: 'Problem Solving', category: 'soft', proficiency: 95 },
  { name: 'Communication', category: 'soft', proficiency: 92 },
  { name: 'Teamwork', category: 'soft', proficiency: 95 },
  { name: 'Adaptability', category: 'soft', proficiency: 90 }
];

export const EXPERIENCE: Experience[] = [
  {
    role: 'Freelance Web Developer',
    company: 'Self-employed / Client Contracts',
    period: '2023 - Present',
    points: [
      'Engineered high-performance, responsive business websites tailored to match precise client operational workflows.',
      'Designed user interfaces and interactive visual mockups following clean Apple and Linear UI patterns.',
      'Integrated serverless server-side mechanisms using Firebase Authentication, Firestore database engines, and Cloud Functions.',
      'Delivered fully functional, production-ready, client-manageable web products under tight schedules.'
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Google Data Analytics Professional Certificate',
    issuer: 'Google',
    date: '2025',
    credentialId: 'GDAPC-PLACEHOLDER-8938',
    link: 'https://coursera.org'
  },
  {
    title: 'Microsoft Certified: Power BI Data Analyst Associate',
    issuer: 'Microsoft',
    date: '2025',
    credentialId: 'PL-300-PLACEHOLDER-2384',
    link: 'https://learn.microsoft.com'
  }
];

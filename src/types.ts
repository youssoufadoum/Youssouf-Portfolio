export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
  category: 'se' | 'bi' | 'all';
}

export interface Skill {
  name: string;
  category: 'languages' | 'frontend' | 'backend' | 'bi' | 'tools' | 'ai' | 'soft';
  proficiency: number; // 0-100 for visual indicators
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  points: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

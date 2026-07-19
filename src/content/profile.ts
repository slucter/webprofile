/**
 * SUMBER TUNGGAL SELURUH KONTEN SITUS.
 *
 * Semua teks, pengalaman, skill, dan project diambil dari sini — komponen tidak
 * menyimpan konten apa pun. Mau mengubah isi situs? Cukup edit file ini.
 */

export type SkillLevel = 'Expert' | 'Advanced' | 'Intermediate'

export type SkillCategory = 'cyber' | 'front' | 'server'

export interface Skill {
  name: string
  /** Level dari CV. Kosongkan bila memang tidak diklaim di CV. */
  level?: SkillLevel
}

export interface SkillGroup {
  title: string
  desc: string
  category: SkillCategory
  skills: Skill[]
}

export interface ExperienceEntry {
  period: string
  role: string
  company: string
  bullets: string[]
  tags: string[]
}

export interface Project {
  name: string
  desc: string
  /** Filter di UI. */
  category: 'security' | 'web' | 'mobile'
  /** Perusahaan tempat project ini dikerjakan. */
  context: string
  stack: string[]
  /** Null = tidak ada tautan publik (project internal perusahaan). Link tidak dirender. */
  liveUrl?: string | null
  sourceUrl?: string | null
}

export interface EducationEntry {
  period: string
  title: string
  institution: string
  bullets: string[]
}

export interface Certificate {
  name: string
  issuer: string
}

export interface Language {
  name: string
  level: string
}

// ============================================================
// IDENTITAS
// ============================================================

export const profile = {
  name: 'Muhamad Irhashdianto',
  firstName: 'Muhamad',
  lastName: 'Irhashdianto',
  role: 'Software Engineer',
  secondaryRole: 'Security Practitioner',
  since: 2019,
  email: 'dev.irhashdianto@gmail.com',
  phone: '+6285523509300',
  /** Dipakai untuk tautan wa.me — tanpa "+" dan tanpa spasi. */
  whatsapp: '6285523509300',
  website: 'https://irhash.my.id',
  location: 'Bandung, Jawa Barat, Indonesia',
  locationShort: 'Bandung, Indonesia',
  availability: 'Open to Opportunities',
  socials: {
    github: 'https://github.com/slcuter',
    linkedin: 'https://linkedin.com/in/irhashdianto',
  },
} as const

// ============================================================
// HERO & ABOUT
// ============================================================

export const hero = {
  tagline:
    'Bridging the gap between secure infrastructure and clean, modern web applications. Building systems that are hardened from the ground up.',
}

/** Teks about sengaja DIPERTAHANKAN dari desain asli — bukan summary dari CV. */
export const about = {
  paragraphs: [
    'I started in cybersecurity -- running penetration tests, mapping attack surfaces, and learning how systems break before they break in production. That foundation shaped everything about how I build software today. Security is never an afterthought in my work; it is the starting point.',
    'Over time, I moved deeper into full-stack development and server infrastructure. I build end-to-end web applications with Vue, React, and Node.js on the frontend and backend, and I manage the servers they run on -- from bare-metal VPS provisioning to containerized deployments behind Nginx and Cloudflare. My goal is to deliver fast, secure, and reliable systems that work cleanly at every layer.',
  ],
  stats: [
    { value: '6+ yr', label: 'experience' },
    { value: '4 companies', label: 'worked with' },
    { value: '3 domains', label: 'covered' },
  ],
}

// ============================================================
// SKILLS — level sesuai CV
// ============================================================

export const skillGroups: SkillGroup[] = [
  {
    title: 'Cybersecurity',
    desc: 'Security assessment and hardening of web applications and the infrastructure behind them.',
    category: 'cyber',
    skills: [
      { name: 'Cyber Security', level: 'Expert' },
      { name: 'Vulnerability Assessment' },
      { name: 'Application Hardening' },
      { name: 'OWASP Top 10' },
    ],
  },
  {
    title: 'Frontend & Backend',
    desc: 'Building responsive interfaces and robust APIs with modern frameworks and clean architecture.',
    category: 'front',
    skills: [
      { name: 'HTML/CSS', level: 'Expert' },
      { name: 'Javascript', level: 'Advanced' },
      { name: 'Typescript', level: 'Advanced' },
      { name: 'React & Next.js', level: 'Advanced' },
      { name: 'Vue & Nuxt.js', level: 'Advanced' },
      { name: 'Tailwind CSS', level: 'Advanced' },
      { name: 'SASS / Stylus CSS', level: 'Advanced' },
      { name: 'Node.js', level: 'Advanced' },
      { name: 'Express.js', level: 'Advanced' },
      { name: 'Python & FastAPI', level: 'Advanced' },
      { name: 'AI-assisted Development', level: 'Advanced' },
    ],
  },
  {
    title: 'Database & Infrastructure',
    desc: 'Managing databases and running development and production server environments.',
    category: 'server',
    skills: [
      { name: 'PostgreSQL', level: 'Advanced' },
      { name: 'MySQL', level: 'Advanced' },
      { name: 'MongoDB', level: 'Advanced' },
      { name: 'System Administration', level: 'Intermediate' },
      { name: 'Server Management' },
    ],
  },
]

// ============================================================
// EXPERIENCE — urut terbaru ke terlama
// ============================================================

export const experience: ExperienceEntry[] = [
  {
    period: 'Apr 2024 -- Present',
    role: 'Fullstack Developer',
    company: 'PT Kawan Solusi Teknologi',
    bullets: [
      'Developed SIMPATI, a POLRI-integrated web app for managing detainees and evidence',
      'Maintained Digi PDAM App (SPK)',
      'Maintained KIOSK PDAM Android (Payment)',
      'Managed development and production servers',
      'Maintained web application security through cybersecurity assessments and hardening',
    ],
    tags: ['Fullstack', 'Server', 'Security'],
  },
  {
    period: 'May 2023 -- Aug 2023',
    role: 'Frontend Developer',
    company: 'PT Nexcast Indonesia',
    bullets: [
      'Maintained and improved main applications',
      'Enhanced user experience and functionality',
      'Developed dynamic pages and components using HTML Canvas',
    ],
    tags: ['Frontend', 'HTML Canvas', 'UI/UX'],
  },
  {
    period: 'Apr 2022 -- Feb 2023',
    role: 'Frontend Developer',
    company: 'PT Vodjo Teknologi Indonesia',
    bullets: [
      'Developed Booking & RSVP, Realtime Chat, and Group Chat features',
      'Created responsive UI/UX pages and submission forms with chart analysis',
      'Maintained and improved web applications',
    ],
    tags: ['Frontend', 'Realtime Chat', 'Data Viz'],
  },
  {
    period: 'Feb 2021 -- Mar 2022',
    role: 'Frontend Developer',
    company: 'PT Sahaware Teknologi Indonesia',
    bullets: [
      'Built Progressive Web Applications (PWA) and CMS for main app',
      'Developed Course, Pathway, Article, and Video Content features',
      'Implemented Gamification and improved UI/UX',
    ],
    tags: ['PWA', 'CMS', 'Gamification'],
  },
]

// ============================================================
// PROJECTS — diturunkan dari pengalaman kerja di CV
//
// CATATAN: tag `stack` di bawah sengaja berisi DOMAIN/FITUR, bukan teknologi,
// karena CV tidak menyebut tech stack per project. Ganti dengan teknologi asli
// yang kamu pakai bila ingin lebih spesifik.
// `liveUrl`/`sourceUrl` bernilai null karena ini project internal perusahaan —
// baris tautan otomatis tidak dirender. Isi bila memang ada tautan publik.
// ============================================================

export const projects: Project[] = [
  {
    name: 'SIMPATI',
    desc: 'POLRI-integrated web application for managing detainee records and case evidence, built with hardened access control.',
    category: 'security',
    context: 'PT Kawan Solusi Teknologi',
    stack: ['Web App', 'POLRI Integration', 'Case Management'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Digi PDAM App (SPK)',
    desc: 'Work-order (SPK) application for a regional water utility, covering field task assignment and reporting.',
    category: 'web',
    context: 'PT Kawan Solusi Teknologi',
    stack: ['Web App', 'Work Order', 'Reporting'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'KIOSK PDAM',
    desc: 'Android self-service kiosk for water utility bill payments, maintained end to end in production.',
    category: 'mobile',
    context: 'PT Kawan Solusi Teknologi',
    stack: ['Android', 'Payment', 'Kiosk'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Booking & RSVP Platform',
    desc: 'Booking and RSVP system with realtime one-to-one and group chat, plus submission forms with chart analysis.',
    category: 'web',
    context: 'PT Vodjo Teknologi Indonesia',
    stack: ['Realtime Chat', 'Booking', 'Charts'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Learning Platform PWA',
    desc: 'Progressive Web App and CMS delivering course, pathway, article, and video content with gamification.',
    category: 'web',
    context: 'PT Sahaware Teknologi Indonesia',
    stack: ['PWA', 'CMS', 'Gamification'],
    liveUrl: null,
    sourceUrl: null,
  },
  {
    name: 'Canvas Dashboard',
    desc: 'Dynamic pages and interactive components rendered with HTML Canvas for the company main application.',
    category: 'web',
    context: 'PT Nexcast Indonesia',
    stack: ['HTML Canvas', 'UI/UX', 'Frontend'],
    liveUrl: null,
    sourceUrl: null,
  },
]

export const projectFilters = [
  { label: 'All', value: 'all' },
  { label: 'Security', value: 'security' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
] as const

// ============================================================
// EDUCATION, CERTIFICATES, LANGUAGES
// ============================================================

export const education: EducationEntry[] = [
  {
    period: 'Feb 2020 -- May 2020',
    title: 'Junior Web Full Stack Developer',
    institution: 'Arkademy Tech Education Platform',
    bullets: [
      '3-month intensive Full Stack Web Development Bootcamp',
      'Learned from fundamentals to full-stack web application development',
      'Built weekly projects for portfolio',
    ],
  },
  {
    period: 'May 2015 -- May 2018',
    title: 'Industrial Automation Engineering',
    institution: 'SMK Negeri 1 Jamblang',
    bullets: ['Active member of the Scout organization and school music extracurricular activities'],
  },
]

export const certificates: Certificate[] = [
  {
    name: 'Certified Full Stack Junior Web Developer',
    issuer: 'Arkademy Tech Education Platform',
  },
]

export const languages: Language[] = [
  { name: 'English', level: 'Conversational' },
  { name: 'Indonesia', level: 'Native' },
]

// ============================================================
// NAVIGASI
// ============================================================

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
] as const

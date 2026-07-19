import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { profile } from '@/content/profile'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
})

const title = `${profile.name} — Software Engineer | Cybersecurity & Full-Stack Developer`
const description =
  'Muhamad Irhashdianto is a Software Engineer specializing in Cybersecurity, Full-Stack Development, and Server Architecture. Building secure, scalable systems with Vue, React, Node.js, and more.'

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),
  title,
  description,
  keywords: [
    'software engineer',
    'cybersecurity',
    'full-stack developer',
    'web developer',
    'frontend developer',
    'Vue',
    'React',
    'Next.js',
    'Node.js',
    'portfolio',
    'Bandung',
    'Indonesia',
  ],
  authors: [{ name: profile.name, url: profile.website }],
  creator: profile.name,
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: profile.website,
    title,
    description,
    siteName: `${profile.name} Portfolio`,
    locale: 'en_US',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} — Software Engineer`,
    description,
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
}

export const viewport: Viewport = {
  themeColor: '#041C1C',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  url: profile.website,
  email: profile.email,
  telephone: profile.phone,
  jobTitle: profile.role,
  description,
  knowsAbout: [
    'Cybersecurity',
    'Vulnerability Assessment',
    'Full-Stack Development',
    'Vue.js',
    'React',
    'Next.js',
    'Node.js',
    'Server Administration',
  ],
  sameAs: [profile.socials.github, profile.socials.linkedin],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Bandung',
    addressRegion: 'Jawa Barat',
    addressCountry: 'ID',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        {children}
      </body>
    </html>
  )
}

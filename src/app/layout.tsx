import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/common/WhatsAppButton';
import CompareDrawer from '@/components/common/CompareDrawer';
import MobileNav from '@/components/layout/MobileNav';
import { CompareProvider } from '@/context/CompareContext';
import { SavedProvider } from '@/context/SavedContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://l2hsolution.com'),
  title: {
    default: 'L2H Solution — Luxury Real Estate Advisory & Property Discovery | Delhi NCR, Noida & Gurugram',
    template: '%s | L2H Solution'
  },
  description: 'Independent real-estate advisory and curated property marketplace for Delhi NCR. Discover RERA-verified luxury apartments, villas, plots, farmhouses, commercial offices, and investment opportunities with due diligence.',
  keywords: [
    'L2H Solution',
    'Real estate advisory Delhi NCR',
    'Luxury apartments Noida Expressway',
    'Golf Course Road Gurgaon penthouses',
    'Sector 150 Noida real estate',
    'Yamuna Expressway plots Jewar Airport',
    'Commercial property investment Noida',
    'Freehold residential plots Greater Noida',
    'Real estate consultancy India',
    'RERA approved properties NCR'
  ],
  authors: [{ name: 'L2H Solution Advisory & Research Team', url: 'https://l2hsolution.com/about' }],
  creator: 'L2H Solution',
  publisher: 'L2H Solution',
  openGraph: {
    title: 'L2H Solution — Real Estate, Chosen Around You',
    description: 'Understand → Analyse → Shortlist → Deliver → Decide Better. Independent real-estate advisory and verified property portfolio across Delhi NCR.',
    url: 'https://l2hsolution.com',
    siteName: 'L2H Solution',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'L2H Solution Luxury Real Estate Portfolio'
      }
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'L2H Solution — Real Estate, Chosen Around You',
    description: 'Independent real-estate advisory and verified property portfolio across Delhi NCR.',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://l2hsolution.com',
  }
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['RealEstateAgent', 'Organization'],
      '@id': 'https://l2hsolution.com/#organization',
      name: 'L2H Solution',
      legalName: 'L2H Solution Advisory LLP',
      url: 'https://l2hsolution.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80',
        caption: 'L2H Solution'
      },
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      description: 'Premier real estate advisory, property discovery, and market intelligence platform dealing across luxury residential, villas, plots, farmhouses, and commercial assets across Delhi NCR.',
      telephone: '+91 98765 43210',
      email: 'advisory@l2hsolution.com',
      priceRange: '₹50 Lakhs - ₹50+ Crores',
      areaServed: [
        { '@type': 'City', name: 'Noida' },
        { '@type': 'City', name: 'Greater Noida' },
        { '@type': 'AdministrativeArea', name: 'Yamuna Expressway' },
        { '@type': 'City', name: 'Gurugram' },
        { '@type': 'City', name: 'Goa' },
        { '@type': 'City', name: 'Rishikesh' },
        { '@type': 'AdministrativeArea', name: 'Tehri Garhwal' },
        { '@type': 'AdministrativeArea', name: 'Jim Corbett' },
        { '@type': 'AdministrativeArea', name: 'Dholera SIR' },
        { '@type': 'AdministrativeArea', name: 'Delhi NCR' }
      ],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Advant Navis Business Park, Tower B, Sector 142, Noida Expressway',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201305',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.4988,
        longitude: 77.4122
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:30',
          closes: '20:00'
        }
      ],
      sameAs: [
        'https://linkedin.com/company/l2h-solution',
        'https://instagram.com/l2hsolution'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://l2hsolution.com/#website',
      url: 'https://l2hsolution.com',
      name: 'L2H Solution',
      description: 'Real Estate Advisory & Property Discovery Platform',
      publisher: {
        '@id': 'https://l2hsolution.com/#organization'
      },
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://l2hsolution.com/properties?search={search_term_string}',
        'query-input': 'required name=search_term_string'
      }
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-white text-zinc-950 selection:bg-zinc-900 selection:text-white font-sans antialiased">
        <SavedProvider>
          <CompareProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <CompareDrawer />
            <MobileNav />
            <WhatsAppButton />
          </CompareProvider>
        </SavedProvider>
      </body>
    </html>
  );
}

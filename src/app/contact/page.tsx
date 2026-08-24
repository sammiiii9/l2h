import React from 'react';
import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'Contact L2H Solution — Real Estate Advisory Desk & VIP Inspections',
  description: 'Connect with L2H Solution advisors at Advant Navis Business Park, Sector 142 Noida Expressway or Two Horizon Centre Gurgaon. Schedule VIP site inspections, property evaluations, and strategy meetings.',
  alternates: {
    canonical: 'https://l2hsolution.com/contact',
  },
  openGraph: {
    title: 'Contact L2H Solution — Advisory Desk & VIP Site Visits',
    description: 'Schedule in-person consultations or escorted VIP property tours across Noida, Greater Noida, Yamuna Expressway, and Gurugram.',
    url: 'https://l2hsolution.com/contact',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80']
  }
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://l2hsolution.com'
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact & Advisory Desk',
          item: 'https://l2hsolution.com/contact'
        }
      ]
    },
    {
      '@type': 'ContactPage',
      '@id': 'https://l2hsolution.com/contact#webpage',
      url: 'https://l2hsolution.com/contact',
      name: 'Contact L2H Solution Advisory Team',
      description: 'Corporate headquarters and advisory desk contacts for L2H Solution.',
      mainEntity: {
        '@type': 'RealEstateAgent',
        name: 'L2H Solution',
        telephone: '+91 8439654385',
        email: 'infol2h@gmail.com',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Tower B, 14th Floor, Advant Navis Business Park, Sector 142',
          addressLocality: 'Noida',
          addressRegion: 'Uttar Pradesh',
          postalCode: '201305',
          addressCountry: 'IN'
        }
      }
    }
  ]
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <ContactClient />
    </>
  );
}

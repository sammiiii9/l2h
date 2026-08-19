import React from 'react';
import type { Metadata } from 'next';
import FindPropertyClient from './FindPropertyClient';

export const metadata: Metadata = {
  title: 'Find Your Property Match — Intelligent Requirement Wizard',
  description: 'Answer 5 curated questions to receive custom property recommendations matching your budget, location, and investment timeline across Delhi NCR.',
  keywords: [
    'Property finder Delhi NCR',
    'Real estate requirement matcher',
    'Buy luxury apartment Noida',
    'Property recommendations Gurgaon',
    'L2H Solution matchmaker'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/find-property',
  },
  openGraph: {
    title: 'Find Your Property Match — L2H Solution',
    description: 'Get matched with verified properties tailored strictly around your family and investment criteria.',
    url: 'https://l2hsolution.com/find-property',
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
          name: 'Find Your Property Match',
          item: 'https://l2hsolution.com/find-property'
        }
      ]
    },
    {
      '@type': 'WebPage',
      '@id': 'https://l2hsolution.com/find-property#webpage',
      url: 'https://l2hsolution.com/find-property',
      name: 'Find Your Property Match — Intelligent Requirement Wizard',
      description: 'Interactive real estate advisory questionnaire to generate tailored property recommendations.'
    }
  ]
};

export default function FindPropertyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <FindPropertyClient />
    </>
  );
}

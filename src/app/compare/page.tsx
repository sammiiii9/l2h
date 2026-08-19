import React from 'react';
import type { Metadata } from 'next';
import CompareClient from './CompareClient';

export const metadata: Metadata = {
  title: 'Side-by-Side Property Comparison Matrix | L2H Solution',
  description: 'Evaluate up to 4 properties side-by-side: compare RERA registrations, ticket prices, ₹/sq.ft. metrics, possession timelines, and L2H advisory perspectives across Delhi NCR.',
  keywords: [
    'Property comparison Delhi NCR',
    'Compare real estate Noida',
    'Apartment price comparison Gurgaon',
    'Real estate investment matrix',
    'L2H Solution compare'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/compare',
  },
  openGraph: {
    title: 'Side-by-Side Property Comparison Matrix — L2H Solution',
    description: 'Compare RERA registrations, ticket prices, and investment yields side-by-side.',
    url: 'https://l2hsolution.com/compare',
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
          name: 'Property Comparison',
          item: 'https://l2hsolution.com/compare'
        }
      ]
    },
    {
      '@type': 'WebPage',
      '@id': 'https://l2hsolution.com/compare#webpage',
      url: 'https://l2hsolution.com/compare',
      name: 'Side-by-Side Property Comparison Matrix',
      description: 'Multi-factor property comparison tool evaluating price, area, developer, and investment yield.'
    }
  ]
};

export default function ComparePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <CompareClient />
    </>
  );
}

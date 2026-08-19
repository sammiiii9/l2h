import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { PropertyService } from '@/lib/data-store';
import PropertiesClient from './PropertiesClient';

export const metadata: Metadata = {
  title: 'Luxury Properties, Apartments & Villas for Sale in Noida & Gurgaon',
  description: 'Browse verified luxury apartments, penthouses, golf villas, freehold plots, and grade-A commercial offices across Delhi NCR, Noida Expressway, and Golf Course Road.',
  keywords: [
    'Properties for sale in Noida',
    'Luxury apartments Noida Expressway',
    '3 BHK Noida Sector 150',
    'Luxury villas Gurgaon Golf Course Road',
    'Plots in Greater Noida',
    'Yamuna Expressway real estate',
    'Commercial property investment Noida',
    'L2H Solution verified properties'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/properties',
  },
  openGraph: {
    title: 'Curated Property Portfolio — L2H Solution',
    description: 'Explore verified residential, villa, land, and commercial properties across premier NCR corridors.',
    url: 'https://l2hsolution.com/properties',
    images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80']
  }
};

export default function PropertiesPage() {
  const { properties } = PropertyService.getAll({ limit: 50 });

  // JSON-LD ItemList Schema
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
            name: 'Properties',
            item: 'https://l2hsolution.com/properties'
          }
        ]
      },
      {
        '@type': 'ItemList',
        '@id': 'https://l2hsolution.com/properties#list',
        name: 'Curated Real Estate Portfolio in Delhi NCR',
        description: 'Verified luxury apartments, villas, plots, and commercial properties.',
        numberOfItems: properties.length,
        itemListElement: properties.map((p, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `https://l2hsolution.com/properties/${p.slug}`,
          name: p.title
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />
      <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center text-zinc-400">Loading Portfolio...</div>}>
        <PropertiesClient />
      </Suspense>
    </>
  );
}

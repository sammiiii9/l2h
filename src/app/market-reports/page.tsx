import React from 'react';
import type { Metadata } from 'next';
import { MarketReportService } from '@/lib/data-store';
import MarketReportsClient from '@/components/reports/MarketReportsClient';

export const metadata: Metadata = {
  title: 'Real Estate Market Intelligence Reports, Price Trends & Forecasts',
  description: 'Download institutional research reports, corridor growth analytics, capital appreciation forecasts, and Jewar Airport impact analysis published by L2H Solution strategists.',
  keywords: [
    'Delhi NCR real estate reports',
    'Noida property market intelligence',
    'Jewar Airport real estate whitepaper',
    'Gurgaon luxury housing price trends',
    'L2H Solution research reports'
  ],
  alternates: {
    canonical: 'https://l2hsolution.com/market-reports',
  },
  openGraph: {
    title: 'Market Intelligence Reports & Real Estate Analytics — L2H Solution',
    description: 'Download authoritative NCR market reports, rental yield studies, and macroeconomic research.',
    url: 'https://l2hsolution.com/market-reports',
    images: ['https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80']
  }
};

export default function MarketReportsPage() {
  const reports = MarketReportService.getAll();

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
            name: 'Market Intelligence Reports',
            item: 'https://l2hsolution.com/market-reports'
          }
        ]
      },
      {
        '@type': 'ItemList',
        '@id': 'https://l2hsolution.com/market-reports#list',
        name: 'L2H Market Intelligence Research Papers',
        description: 'Institutional research briefs on Delhi NCR real estate corridors.',
        numberOfItems: reports.length,
        itemListElement: reports.map((r, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: r.title,
          description: r.subtitle
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
      <MarketReportsClient reports={reports} />
    </>
  );
}

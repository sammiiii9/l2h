import { Metadata } from 'next';
import { PropertyService } from '@/lib/data-store';
import PlotsClient from './PlotsClient';

export const metadata: Metadata = {
  title: 'Plots & Land Opportunities (Pan-India) — Independent Advisory | L2H Solution',
  description: 'Research-led plot opportunities across India, with location, title, approval, and exit considerations made visible. Explore verified freehold land parcels on Yamuna Expressway, Dholera SIR, and high-growth belts.',
  openGraph: {
    title: 'Plots & Land Opportunities — L2H Solution',
    description: 'Research-led plot opportunities across India with title and zoning due diligence.',
  }
};

export default async function PlotsPage() {
  const { properties } = PropertyService.getAll({ category: 'plots' });
  return <PlotsClient initialProperties={properties} />;
}

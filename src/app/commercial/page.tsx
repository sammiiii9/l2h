import { Metadata } from 'next';
import { PropertyService } from '@/lib/data-store';
import CommercialClient from './CommercialClient';

export const metadata: Metadata = {
  title: 'Commercial Investment Opportunities (Offices & Pre-Leased Retail) | L2H Solution',
  description: 'Commercial opportunities assessed through tenant quality, rental structure, location demand, resale potential, and appreciation logic. Discover pre-leased corporate offices and high-street retail.',
  openGraph: {
    title: 'Commercial Investment Opportunities — L2H Solution',
    description: 'Independent advisory for commercial real estate, pre-leased offices, and high-yield retail.',
  }
};

export default async function CommercialPage() {
  const { properties } = PropertyService.getAll({ category: 'commercial' });
  return <CommercialClient initialProperties={properties} />;
}

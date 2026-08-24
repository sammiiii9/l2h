import { Metadata } from 'next';
import { PropertyService } from '@/lib/data-store';
import ResidentialClient from './ResidentialClient';

export const metadata: Metadata = {
  title: 'Residential Apartments & Luxury Homes (Noida, NCR, Gurgaon) | L2H Solution',
  description: 'Apartments framed around daily life, connectivity, builder context, ownership fit, and current availability. Explore verified luxury residences in Noida Expressway, Gurgaon, and key metros.',
  openGraph: {
    title: 'Residential Apartments & Luxury Homes — L2H Solution',
    description: 'Independent buyer-side advisory for residential apartments and luxury homes.',
  }
};

export default async function ResidentialPage() {
  const { properties } = PropertyService.getAll({ category: 'residential' });
  return <ResidentialClient initialProperties={properties} />;
}

import React from 'react';
import type { Metadata } from 'next';
import SavedClient from './SavedClient';

export const metadata: Metadata = {
  title: 'Your Saved Properties Shortlist | L2H Solution',
  description: 'Review your bookmarked luxury properties, compare configurations, and schedule confidential advisory site visits across Delhi NCR.',
  alternates: {
    canonical: 'https://l2hsolution.com/saved',
  },
  robots: {
    index: false,
    follow: true
  }
};

export default function SavedPage() {
  return <SavedClient />;
}

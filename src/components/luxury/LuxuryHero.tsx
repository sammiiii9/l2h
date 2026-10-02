'use client';

import Hero from '@/components/hero/Hero';

export interface LuxuryHeroProps {
  onOpenTourModal: () => void;
}

export default function LuxuryHero({ onOpenTourModal }: LuxuryHeroProps) {
  return <Hero onOpenTourModal={onOpenTourModal} nextSectionSelector="#about" />;
}

'use client';

import React, { useState } from 'react';
import LuxuryHeader from '@/components/luxury/LuxuryHeader';
import Hero from '@/components/hero/Hero';
import CurrentOpportunities from '@/components/home/CurrentOpportunities';
import PurposeDiscovery from '@/components/home/PurposeDiscovery';
import BrandPhilosophy from '@/components/home/BrandPhilosophy';
import HowItWorks from '@/components/home/HowItWorks';
import DestinationsExplorer from '@/components/home/DestinationsExplorer';
import SmartPropertyMatching from '@/components/home/SmartPropertyMatching';
import WhyChooseL2H from '@/components/home/WhyChooseL2H';
import LeadGenerationSection from '@/components/home/LeadGenerationSection';
import AboutL2HPreview from '@/components/home/AboutL2HPreview';
import LuxuryFooter from '@/components/luxury/LuxuryFooter';
import LuxuryTourModal from '@/components/luxury/LuxuryTourModal';

export default function HomePage() {
  const [isTourModalOpen, setIsTourModalOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F1EB] dark:bg-[#0E0D0C] text-[#171513] dark:text-[#F5F1EB] transition-colors duration-300">
      
      {/* 1. Header Navigation */}
      <LuxuryHeader onOpenTourModal={() => setIsTourModalOpen(true)} />

      {/* 2. Hero Section */}
      <Hero onOpenTourModal={() => setIsTourModalOpen(true)} nextSectionSelector="#opportunities" />

      {/* 3. Active Property Portfolio (4 Verified Active Opportunities) */}
      <CurrentOpportunities />

      {/* 4. Purpose-Based Property Discovery */}
      <PurposeDiscovery />

      {/* 5. Brand Philosophy ("We Don't Sell Properties. We Serve People.") */}
      <BrandPhilosophy />

      {/* 6. How It Works (01 Understand, 02 Shortlist, 03 Evaluate, 04 Stay Connected) */}
      <HowItWorks />

      {/* 7. Featured Locations & Pipeline (Active vs Exploring) */}
      <DestinationsExplorer />

      {/* 8. Smart Property Matching (Find Your Property Flow) */}
      <SmartPropertyMatching />

      {/* 9. Trust Section (Why People Choose L2H Solution) */}
      <WhyChooseL2H />

      {/* 10. Lead Generation Form ("Tell Us What You're Looking For") */}
      <LeadGenerationSection />

      {/* 11. About L2H Preview ("A Property Company Built Around People.") */}
      <AboutL2HPreview />

      {/* 12. Footer */}
      <LuxuryFooter />

      {/* Tour / Advisory Modal */}
      <LuxuryTourModal
        isOpen={isTourModalOpen}
        onClose={() => setIsTourModalOpen(false)}
      />

    </div>
  );
}

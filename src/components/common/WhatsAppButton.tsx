'use client';

import React from 'react';
import { MessageSquare } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';

export default function WhatsAppButton() {
  const whatsappUrl = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am exploring real estate opportunities in Delhi NCR. Please connect me with an advisory consultant.'
  });

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group">
      <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-charcoal-900/95 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-lg border border-gold/20 shadow-luxury pointer-events-none">
        Chat with a Property Advisor
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with L2H Solution Advisor"
        className="w-13 h-13 p-3.5 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center ring-4 ring-white/20 hover:ring-[#25D366]/40"
      >
        <MessageSquare className="w-6 h-6 fill-current text-white" />
      </a>
    </div>
  );
}

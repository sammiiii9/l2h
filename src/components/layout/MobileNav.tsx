'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageSquare, Phone, Send, Compass, Home, Info, Sparkles } from 'lucide-react';
import { createWhatsAppUrl } from '@/lib/utils';
import LeadModal from '@/components/common/LeadModal';

export default function MobileNav() {
  const pathname = usePathname();
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  // Hide on admin routes
  if (pathname.startsWith('/admin')) return null;

  const whatsappUrl = createWhatsAppUrl({
    customMessage: 'Hi L2H Solution, I am inquiring from the website and would like to talk to an advisor.'
  });

  return (
    <>
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#171513]/95 text-white backdrop-blur-xl border-t border-white/10 shadow-2xl safe-area-pb">
        
        {/* Sticky Action CTA Bar (WhatsApp | Call | Enquire) */}
        <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-white/10 bg-black/40">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#25D366] text-white text-[11px] font-semibold tracking-wide shadow-sm active:scale-95 transition-transform"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>

          <a
            href="tel:+918439654385"
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-white/10 border border-white/20 text-white text-[11px] font-semibold tracking-wide hover:bg-white/20 active:scale-95 transition-transform"
          >
            <Phone className="w-3.5 h-3.5 text-[#B8945B]" />
            <span>Call</span>
          </a>

          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-xl bg-[#B8945B] text-black text-[11px] font-bold tracking-wide active:scale-95 transition-transform shadow-sm"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Enquire</span>
          </button>
        </div>

        {/* Secondary Micro-Navigation Row */}
        <div className="flex items-center justify-around py-1.5 px-2 text-[10px] text-white/70">
          <Link
            href="/"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${pathname === '/' ? 'text-[#B8945B] font-semibold' : 'hover:text-white'}`}
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>

          <Link
            href="/properties"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${pathname.startsWith('/properties') ? 'text-[#B8945B] font-semibold' : 'hover:text-white'}`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Properties</span>
          </Link>

          <Link
            href="/why-l2h"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${pathname === '/why-l2h' ? 'text-[#B8945B] font-semibold' : 'hover:text-white'}`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Why L2H</span>
          </Link>

          <Link
            href="/find-property"
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg ${pathname === '/find-property' ? 'text-[#B8945B] font-semibold' : 'hover:text-white'}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Match</span>
          </Link>
        </div>

      </div>

      {/* Advisory Quick Enquire Modal */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        title="Talk to a Property Advisor"
        subtitle="We will listen to your requirements, budget, and purpose first before suggesting verified options."
      />
    </>
  );
}

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Compass, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white px-4 sm:px-6 py-24">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center mx-auto shadow-sm">
          <Compass className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
            404 Error • Page Not Located
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
            Opportunity Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
            The property dossier or page you are seeking may have been leased, sold, updated, or relocated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/properties"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Search className="w-4 h-4" />
            <span>Browse Portfolio</span>
          </Link>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-zinc-200"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

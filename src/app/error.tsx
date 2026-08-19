'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertCircle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error securely
    console.error('L2H Application Error:', error.message);
  }, [error]);

  return (
    <div className="min-h-[75vh] flex items-center justify-center bg-white px-4 sm:px-6 py-24">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="w-16 h-16 rounded-3xl bg-zinc-100 border border-zinc-200 text-zinc-900 flex items-center justify-center mx-auto shadow-sm">
          <AlertCircle className="w-8 h-8 stroke-[1.5]" />
        </div>

        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
            System Notice
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-zinc-950 tracking-tight">
            Unexpected Condition
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 font-light leading-relaxed">
            We encountered an unexpected issue while retrieving data. Our advisory engineering team has been notified.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-semibold text-xs transition-colors flex items-center justify-center gap-2 border border-zinc-200"
          >
            <Home className="w-4 h-4" />
            <span>Return to Overview</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

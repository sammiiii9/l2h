'use client';

import React, { useState } from 'react';
import { FloorPlan } from '@/types';
import { Maximize2, Sparkles, FileText, Download, CheckCircle2 } from 'lucide-react';

interface FloorPlanViewerProps {
  floorPlans: FloorPlan[];
  propertyName: string;
  onConsultClick?: () => void;
}

export default function FloorPlanViewer({ floorPlans, propertyName, onConsultClick }: FloorPlanViewerProps) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!floorPlans || floorPlans.length === 0) return null;

  const currentPlan = floorPlans[selectedIdx] || floorPlans[0];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-6">
      {/* Top Selector Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100">
        <div>
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Architectural Layouts
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
            Floor Plans &amp; Layout Dimensions
          </h3>
        </div>

        {/* Tab Buttons */}
        <div className="flex flex-wrap gap-2">
          {floorPlans.map((plan, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedIdx(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all border ${
                selectedIdx === idx
                  ? 'bg-black text-white border-black shadow-md'
                  : 'bg-zinc-100 text-zinc-800 border-zinc-200 hover:bg-zinc-200'
              }`}
            >
              {plan.title || `${plan.bhk}`}
            </button>
          ))}
        </div>
      </div>

      {/* Plan Visual and Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Visual Preview */}
        <div className="lg:col-span-8 bg-black rounded-2xl overflow-hidden relative group min-h-[380px] flex items-center justify-center p-4">
          <img
            src={currentPlan.image}
            alt={`${propertyName} - ${currentPlan.title}`}
            className="max-h-[380px] w-auto object-contain rounded-lg group-hover:scale-105 transition-transform duration-500"
          />

          <button
            type="button"
            onClick={() => setIsZoomOpen(true)}
            className="absolute bottom-4 right-4 p-2.5 rounded-xl bg-black/90 text-white border border-white/20 hover:bg-white hover:text-black text-xs font-medium flex items-center gap-1.5 backdrop-blur-md transition-colors shadow-lg"
          >
            <Maximize2 className="w-4 h-4" />
            <span>Enlarge Blueprint</span>
          </button>
        </div>

        {/* Specs Details Column */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 rounded-2xl bg-zinc-50 border border-zinc-200 space-y-4">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                Configuration
              </span>
              <h4 className="text-xl font-serif font-bold text-zinc-950">
                {currentPlan.title}
              </h4>
            </div>

            <div className="space-y-3 pt-2 text-xs border-t border-zinc-200">
              <div className="flex justify-between py-1">
                <span className="text-zinc-500">Super Built-up Area:</span>
                <span className="font-bold text-zinc-950">{currentPlan.superArea}</span>
              </div>

              {currentPlan.carpetArea && (
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Carpet Area:</span>
                  <span className="font-bold text-zinc-950">{currentPlan.carpetArea}</span>
                </div>
              )}

              {currentPlan.price && (
                <div className="flex justify-between py-1 border-t border-zinc-200 pt-2 text-sm">
                  <span className="text-zinc-500">Starting Price:</span>
                  <span className="font-bold text-zinc-950">{currentPlan.price}</span>
                </div>
              )}
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="button"
                onClick={onConsultClick}
                className="w-full py-3 rounded-xl bg-black hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
              >
                Request Detailed PDF Brochure
              </button>

              <button
                type="button"
                onClick={onConsultClick}
                className="w-full py-2.5 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-100 text-zinc-900 font-semibold text-xs transition-colors"
              >
                Schedule Site Visit for this Unit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setIsZoomOpen(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <img
              src={currentPlan.image}
              alt="Floor Plan Fullscreen"
              className="max-h-[85vh] w-auto object-contain rounded-xl shadow-2xl"
            />
            <button
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-4 right-4 px-4 py-2 rounded-lg bg-black text-white text-xs font-bold uppercase tracking-wider border border-white/20 hover:bg-white hover:text-black transition-colors"
            >
              Close (ESC)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { 
  Sparkles, 
  Dumbbell, 
  Waves, 
  Shield, 
  TreePine, 
  Car, 
  Film, 
  Wifi, 
  Coffee,
  Check
} from 'lucide-react';
import { Amenity } from '@/types';

interface AmenityGridProps {
  amenities: Amenity[];
}

export default function AmenityGrid({ amenities }: AmenityGridProps) {
  if (!amenities || amenities.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {amenities.map((amenity, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-black transition-all group"
          >
            <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200 group-hover:bg-black text-zinc-900 group-hover:text-white flex items-center justify-center shrink-0 transition-colors shadow-sm">
              <Check className="w-4 h-4 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-950">
                {amenity.name}
              </div>
              <div className="text-[10px] text-zinc-500 font-medium">
                {amenity.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';
import { 
  MapPin, 
  Plane, 
  Train, 
  Car, 
  GraduationCap, 
  Building, 
  Cross, 
  Navigation,
  ExternalLink
} from 'lucide-react';
import { ConnectivityItem } from '@/types';

interface LocationMatrixProps {
  location: {
    address: string;
    locality: string;
    sector?: string;
    city: string;
    state: string;
    landmark?: string;
    latitude?: number;
    longitude?: number;
  };
  connectivity: ConnectivityItem[];
}

export default function LocationMatrix({ location, connectivity }: LocationMatrixProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'Airport':
        return Plane;
      case 'Metro':
        return Train;
      case 'Highway':
        return Car;
      case 'School':
        return GraduationCap;
      case 'Hospital':
        return Building;
      default:
        return MapPin;
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address || ''}, ${location.locality}, ${location.city}`
  )}`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-zinc-200 shadow-sm space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100">
        <div className="space-y-1">
          <span className="text-xs uppercase tracking-wider text-zinc-500 font-semibold">
            Strategic Location
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-zinc-950">
            Location &amp; Micro-Market Connectivity
          </h3>
          <p className="text-xs text-zinc-500 flex items-center gap-1.5 pt-1">
            <MapPin className="w-3.5 h-3.5 text-zinc-800 shrink-0" />
            <span>{location.address || `${location.locality}, ${location.city}`}</span>
          </p>
        </div>

        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-semibold text-xs transition-colors self-start sm:self-auto border border-zinc-200"
        >
          <Navigation className="w-3.5 h-3.5 text-black" />
          <span>Open in Google Maps</span>
          <ExternalLink className="w-3 h-3 text-zinc-400" />
        </a>
      </div>

      {/* Connectivity Points Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {connectivity.map((item, idx) => {
          const Icon = getIcon(item.type);
          return (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-black transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-black text-white flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-zinc-950 line-clamp-1">
                    {item.destination}
                  </div>
                  <div className="text-[10px] text-zinc-500 font-medium">
                    {item.type} • {item.distance}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="inline-block px-2.5 py-1 rounded-lg bg-white border border-zinc-200 text-[11px] font-bold text-zinc-950">
                  {item.time || `${item.distance}`}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Map Visual Frame */}
      <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-black h-64 relative flex items-center justify-center">
        <div className="relative z-10 text-center space-y-3 p-6 max-w-md bg-[#121214]/90 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
          <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center mx-auto">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="text-sm font-bold text-white font-serif">
            {location.landmark || `${location.locality}, ${location.city}`}
          </div>
          <p className="text-[11px] text-zinc-400 font-light">
            Immediate proximity to expressways, metro stations, and key social infrastructure hubs.
          </p>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[11px] font-bold text-white uppercase tracking-wider hover:underline"
          >
            <span>View Micro-Market on Maps</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

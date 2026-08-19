'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/types';

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => boolean;
  removeFromCompare: (propertyId: string) => void;
  isInCompare: (propertyId: string) => boolean;
  clearCompare: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Property[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load from local storage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('l2h_compare_items');
      if (saved) {
        setCompareList(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save to local storage
  useEffect(() => {
    try {
      localStorage.setItem('l2h_compare_items', JSON.stringify(compareList));
    } catch (e) {
      console.error(e);
    }
  }, [compareList]);

  const addToCompare = (property: Property): boolean => {
    if (compareList.some(p => p.id === property.id)) {
      return false;
    }
    if (compareList.length >= 4) {
      alert('You can compare a maximum of 4 properties side-by-side.');
      return false;
    }
    setCompareList(prev => [...prev, property]);
    setIsDrawerOpen(true);
    return true;
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  };

  const isInCompare = (propertyId: string) => {
    return compareList.some(p => p.id === propertyId);
  };

  const clearCompare = () => {
    setCompareList([]);
    setIsDrawerOpen(false);
  };

  return (
    <CompareContext.Provider
      value={{
        compareList,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        isDrawerOpen,
        setIsDrawerOpen
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}

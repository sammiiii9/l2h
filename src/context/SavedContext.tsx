'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '@/types';
import { trackEvent } from '@/lib/analytics';

interface SavedContextType {
  savedList: Property[];
  saveProperty: (property: Property, notes?: string) => void;
  removeSavedProperty: (propertyId: string) => void;
  isSaved: (propertyId: string) => boolean;
  clearSaved: () => void;
}

const SavedContext = createContext<SavedContextType | undefined>(undefined);

export function SavedProvider({ children }: { children: React.ReactNode }) {
  const [savedList, setSavedList] = useState<Property[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('l2h_saved_properties');
      if (stored) {
        setSavedList(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Error loading saved properties:', e);
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    try {
      localStorage.setItem('l2h_saved_properties', JSON.stringify(savedList));
    } catch (e) {
      console.error('Error saving properties to localStorage:', e);
    }
  }, [savedList]);

  const saveProperty = (property: Property, notes?: string) => {
    if (savedList.some(p => p.id === property.id)) {
      return;
    }
    setSavedList(prev => [...prev, property]);
    trackEvent('property_save', { propertyId: property.id, propertyTitle: property.title });
  };

  const removeSavedProperty = (propertyId: string) => {
    setSavedList(prev => prev.filter(p => p.id !== propertyId));
  };

  const isSaved = (propertyId: string) => {
    return savedList.some(p => p.id === propertyId);
  };

  const clearSaved = () => {
    setSavedList([]);
  };

  return (
    <SavedContext.Provider
      value={{
        savedList,
        saveProperty,
        removeSavedProperty,
        isSaved,
        clearSaved
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

export function useSaved() {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error('useSaved must be used within a SavedProvider');
  }
  return context;
}

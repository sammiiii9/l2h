'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Laptop, Check } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'dropdown' | 'pill';
  className?: string;
}

export default function ThemeToggle({ variant = 'icon', className = '' }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!mounted) {
    return (
      <div className={`w-9 h-9 rounded-xl bg-white/5 border border-white/10 ${className}`} />
    );
  }

  if (variant === 'pill') {
    return (
      <div className={`inline-flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 ${className}`}>
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            theme === 'light'
              ? 'bg-white text-zinc-950 shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="Light Theme"
        >
          <Sun className="w-3.5 h-3.5" />
          <span>Light</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            theme === 'dark'
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="Dark Theme"
        >
          <Moon className="w-3.5 h-3.5" />
          <span>Dark</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('system')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
            theme === 'system'
              ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-sm'
              : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
          }`}
          title="System Preference"
        >
          <Laptop className="w-3.5 h-3.5" />
          <span>Auto</span>
        </button>
      </div>
    );
  }

  if (variant === 'dropdown') {
    return (
      <div className="relative" ref={menuRef}>
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-700 text-xs font-semibold transition-colors ${className}`}
          aria-label="Theme Selection Menu"
        >
          {resolvedTheme === 'dark' ? (
            <Moon className="w-3.5 h-3.5 text-zinc-300" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-zinc-700" />
          )}
          <span className="capitalize">{theme}</span>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-36 rounded-2xl bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
            <button
              type="button"
              onClick={() => {
                setTheme('light');
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Sun className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>Light</span>
              </span>
              {theme === 'light' && <Check className="w-3.5 h-3.5 text-black dark:text-white" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('dark');
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Moon className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>Dark</span>
              </span>
              {theme === 'dark' && <Check className="w-3.5 h-3.5 text-black dark:text-white" />}
            </button>

            <button
              type="button"
              onClick={() => {
                setTheme('system');
                setMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <span className="flex items-center gap-2">
                <Laptop className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400" />
                <span>System</span>
              </span>
              {theme === 'system' && <Check className="w-3.5 h-3.5 text-black dark:text-white" />}
            </button>
          </div>
        )}
      </div>
    );
  }

  // Default Quick Icon Toggle
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors border ${
        resolvedTheme === 'dark'
          ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border-zinc-700'
          : 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300'
      } ${className}`}
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'Light' : 'Dark'} mode`}
      title={`Current: ${theme.toUpperCase()} (${resolvedTheme}). Click to toggle mode.`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-zinc-800 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}

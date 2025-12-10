/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeProvider';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-card/50 border border-border hover:border-nobel-gold/50 transition-all duration-300 group"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Sun Icon - visible in dark mode */}
        <Sun
          className={`absolute inset-0 w-5 h-5 text-nobel-gold transition-all duration-300 ${
            theme === 'dark'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 rotate-90 scale-0'
          }`}
        />
        {/* Moon Icon - visible in light mode */}
        <Moon
          className={`absolute inset-0 w-5 h-5 text-primary transition-all duration-300 ${
            theme === 'light'
              ? 'opacity-100 rotate-0 scale-100'
              : 'opacity-0 -rotate-90 scale-0'
          }`}
        />
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-full bg-nobel-gold/0 group-hover:bg-nobel-gold/10 transition-all duration-300" />
    </button>
  );
};

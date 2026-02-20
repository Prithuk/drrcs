/**
 * Theme Context
 * Manages light/dark mode state and preferences
 */

import React, { createContext, useState, useEffect, useCallback } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [systemPreference, setSystemPreference] = useState('light');
  const [isClient, setIsClient] = useState(false);

  // Initialize on client side only
  useEffect(() => {
    setIsClient(true);
    
    try {
      // Detect system preference
      if (window.matchMedia) {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setSystemPreference(prefersDark ? 'dark' : 'light');

        // Get saved preference from localStorage
        const savedTheme = localStorage.getItem('app-theme');
        setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));
      }
    } catch (error) {
      console.error('Error initializing theme:', error);
    }
  }, []);

  // Apply theme to document
  useEffect(() => {
    if (!isClient) return;
    
    try {
      const root = document.documentElement;
      root.setAttribute('data-theme', theme);
      root.classList.toggle('dark-mode', theme === 'dark');
      localStorage.setItem('app-theme', theme);
    } catch (error) {
      console.error('Error applying theme:', error);
    }
  }, [theme, isClient]);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const setAutoTheme = useCallback(() => {
    setTheme(systemPreference);
  }, [systemPreference]);

  const value = {
    theme,
    systemPreference,
    toggleTheme,
    setAutoTheme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export { ThemeProvider, ThemeContext };

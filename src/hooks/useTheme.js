import { useEffect, useRef, useState } from 'react';
import { getInitialTheme, getSavedTheme, saveTheme, THEME_STORAGE_KEY } from '../utils/theme';

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);
  const hasPreference = useRef(Boolean(getSavedTheme()));

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-color-scheme: dark)');
    const followSystem = (event) => { if (!hasPreference.current) setTheme(event.matches ? 'dark' : 'light'); };
    const followStorage = (event) => {
      if (event.key === THEME_STORAGE_KEY || event.key === null) {
        hasPreference.current = Boolean(getSavedTheme());
        setTheme(getInitialTheme());
      }
    };
    media?.addEventListener('change', followSystem);
    window.addEventListener('storage', followStorage);
    return () => {
      media?.removeEventListener('change', followSystem);
      window.removeEventListener('storage', followStorage);
    };
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    hasPreference.current = true;
    saveTheme(next);
    setTheme(next);
  };
  return { theme, toggleTheme };
}

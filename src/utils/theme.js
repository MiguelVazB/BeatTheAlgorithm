export const THEME_STORAGE_KEY = 'beat-the-algorithm-theme';

export function getSavedTheme() {
  try {
    const value = window.localStorage.getItem(THEME_STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch { return null; }
}

export function getInitialTheme() {
  return getSavedTheme() ?? (typeof window !== 'undefined' && window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function saveTheme(theme) {
  try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* The toggle still works without persistence. */ }
}

import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { before, after, test } from 'node:test';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import { createServer } from 'vite';
import { getInitialTheme, THEME_STORAGE_KEY } from '../src/utils/theme.js';

const { act, create } = TestRenderer;
let server;
let NavBar;
before(async () => {
  server = await createServer({ server: { middlewareMode: true, watch: null, hmr: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] } });
  ({ default: NavBar } = await server.ssrLoadModule('/src/components/NavBar.jsx'));
});
after(async () => { await server?.close(); });

function environment(context, { saved = null, dark = false, blocked = false } = {}) {
  const store = new Map(saved === null ? [] : [[THEME_STORAGE_KEY, saved]]);
  const mediaListeners = new Set();
  const windowListeners = new Map();
  const media = {
    matches: dark,
    addEventListener: (_, callback) => mediaListeners.add(callback),
    removeEventListener: (_, callback) => mediaListeners.delete(callback),
  };
  const document = { documentElement: { dataset: {} } };
  const window = {
    localStorage: {
      getItem: (key) => { if (blocked) throw new Error('Storage blocked'); return store.get(key) ?? null; },
      setItem: (key, value) => { if (blocked) throw new Error('Storage blocked'); store.set(key, value); },
    },
    matchMedia: () => media,
    addEventListener: (name, callback) => windowListeners.set(name, callback),
    removeEventListener: (name) => windowListeners.delete(name),
  };
  for (const [name, value] of Object.entries({ window, document })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, writable: true, value });
    context.after(() => { if (previous) Object.defineProperty(globalThis, name, previous); else delete globalThis[name]; });
  }
  return {
    window, document, store, mediaListeners, windowListeners,
    setSystem(value) { media.matches = value; for (const callback of mediaListeners) callback({ matches: value }); },
    storageChanged(value) {
      if (value === null) store.delete(THEME_STORAGE_KEY); else store.set(THEME_STORAGE_KEY, value);
      windowListeners.get('storage')?.({ key: THEME_STORAGE_KEY });
    },
  };
}

const mountHeader = () => {
  let renderer;
  act(() => { renderer = create(React.createElement(MemoryRouter, {}, React.createElement(NavBar))); });
  return renderer;
};
const toggle = (renderer) => renderer.root.findByProps({ className: 'theme-toggle' });

test('first-paint initialization honors valid saved preferences and falls back to the system', (context) => {
  const source = readFileSync(new URL('../index.html', import.meta.url), 'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
  for (const options of [{ saved: 'light', dark: true }, { saved: 'dark', dark: false }, { saved: 'invalid', dark: true }, { dark: false }, { blocked: true, dark: true }]) {
    const env = environment(context, options);
    runInNewContext(source, { window: env.window, document: env.document });
    const expected = options.saved === 'light' || options.saved === 'dark' ? options.saved : options.dark ? 'dark' : 'light';
    assert.equal(env.document.documentElement.dataset.theme, expected);
    assert.equal(getInitialTheme(), expected);
  }
});

test('header toggle changes the whole page, saves the choice, and restores it on remount', (context) => {
  const env = environment(context);
  let renderer = mountHeader();
  assert.equal(toggle(renderer).props['aria-label'], 'Switch to dark mode');
  act(() => toggle(renderer).props.onClick());
  assert.equal(env.document.documentElement.dataset.theme, 'dark');
  assert.equal(env.store.get(THEME_STORAGE_KEY), 'dark');
  assert.equal(toggle(renderer).props['aria-pressed'], true);
  act(() => renderer.unmount());
  renderer = mountHeader();
  assert.equal(toggle(renderer).props['aria-label'], 'Switch to light mode');
  act(() => toggle(renderer).props.onClick());
  assert.equal(env.document.documentElement.dataset.theme, 'light');
  assert.equal(env.store.get(THEME_STORAGE_KEY), 'light');
  act(() => renderer.unmount());
});

test('system changes are followed until the user chooses a theme', (context) => {
  const env = environment(context);
  const renderer = mountHeader();
  act(() => env.setSystem(true));
  assert.equal(env.document.documentElement.dataset.theme, 'dark');
  act(() => toggle(renderer).props.onClick());
  assert.equal(env.document.documentElement.dataset.theme, 'light');
  act(() => env.setSystem(false));
  act(() => env.setSystem(true));
  assert.equal(env.document.documentElement.dataset.theme, 'light');
  act(() => renderer.unmount());
  assert.equal(env.mediaListeners.size, 0);
  assert.equal(env.windowListeners.size, 0);
});

test('a disabled storage API still allows a manual theme choice for the session', (context) => {
  const env = environment(context, { blocked: true });
  const renderer = mountHeader();
  act(() => toggle(renderer).props.onClick());
  assert.equal(env.document.documentElement.dataset.theme, 'dark');
  act(() => env.setSystem(true));
  act(() => env.setSystem(false));
  assert.equal(env.document.documentElement.dataset.theme, 'dark');
  act(() => renderer.unmount());
});

test('theme choices synchronize from another tab and clearing a choice restores system behavior', (context) => {
  const env = environment(context, { saved: 'light', dark: true });
  const renderer = mountHeader();
  act(() => env.storageChanged('dark'));
  assert.equal(env.document.documentElement.dataset.theme, 'dark');
  act(() => env.storageChanged(null));
  act(() => env.setSystem(false));
  assert.equal(env.document.documentElement.dataset.theme, 'light');
  act(() => renderer.unmount());
});

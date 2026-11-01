import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon';
import { useTheme } from '../hooks/useTheme';
import './componentStyles/NavBar.css';

export function BrandMark() {
  return <span className="brand-mark" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 16v3m5-8v8m5-13v13m5-8v8" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" /></svg></span>;
}
const links = [{ to: '/', label: 'Playground', end: true }, { to: '/moreOnAlgorithms', label: 'Algorithms' }, { to: '/about', label: 'About' }];
export default function NavBar() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef(null);
  const menuButtonRef = useRef(null);
  const { pathname } = useLocation();
  useEffect(() => { setMenuOpen(false); }, [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') { setMenuOpen(false); menuButtonRef.current?.focus(); }
    };
    const onPointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) setMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => { document.removeEventListener('keydown', onKeyDown); document.removeEventListener('pointerdown', onPointerDown); };
  }, [menuOpen]);
  return (
    <header className="navbar-container" ref={headerRef}>
      <div className="navbar-inner">
        <Link to="/" className="brand" aria-label="Beat the Algorithm home" onClick={() => setMenuOpen(false)}><BrandMark /><span>Beat the<span className="brand-second-line">Algorithm<span className="brand-period">.</span></span></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} className={({ isActive }) => `nav-link${isActive ? ' is-active' : ''}`}>{link.label}</NavLink>)}</nav>
        <div className="nav-actions">
          <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} aria-pressed={theme === 'dark'} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={19} /></button>
          <Link className="nav-challenge-link" to="/algo/bubble_sort">Start a challenge <Icon name="arrow-up-right" size={16} /></Link>
          <button className="mobile-menu-button" ref={menuButtonRef} onClick={() => setMenuOpen(!menuOpen)} type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation"><Icon name={menuOpen ? 'close' : 'menu'} size={23} /></button>
        </div>
      </div>
      {menuOpen && <nav id="mobile-navigation" className="mobile-navigation" aria-label="Mobile navigation">{links.map((link) => <NavLink key={link.to} to={link.to} end={link.end} onClick={() => setMenuOpen(false)}>{link.label}<Icon name="arrow-up-right" size={18} /></NavLink>)}<Link to="/algo/bubble_sort" onClick={() => setMenuOpen(false)} className="mobile-challenge">Start a challenge <Icon name="play" size={18} /></Link></nav>}
    </header>
  );
}

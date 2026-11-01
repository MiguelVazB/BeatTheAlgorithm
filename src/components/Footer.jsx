import { Link } from 'react-router-dom';
import { BrandMark } from './NavBar';
import Icon from './Icon';
export default function Footer() {
  return <footer className="site-footer"><Link className="footer-brand" to="/"><BrandMark />Beat the Algorithm.</Link><span className="footer-caption">A playground for curious minds.</span><nav className="footer-links" aria-label="Footer navigation"><Link to="/about">About</Link><a href="https://github.com/MiguelVazB/BeatTheAlgorithm" target="_blank" rel="noopener noreferrer">View source <Icon name="arrow-up-right" size={13} /></a></nav></footer>;
}

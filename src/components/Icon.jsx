import PropTypes from 'prop-types';

const paths = {
  sun: 'M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4',
  moon: 'M20.5 13A8.5 8.5 0 0 1 11 3.5 8.5 8.5 0 1 0 20.5 13Z',
  'arrow-right': 'M4 12h16m-6-6 6 6-6 6', 'arrow-left': 'M20 12H4m6-6-6 6 6 6',
  'arrow-up-right': 'M6 18 18 6M6 6h12v12', 'chevron-right': 'm9 5 7 7-7 7',
  'chevron-left': 'm15 5-7 7 7 7', 'chevron-down': 'm5 9 7 7 7-7',
  play: 'm9 5 11 7-11 7V5Z', pause: 'M9 5v14M15 5v14',
  menu: 'M4 7h16M4 12h16M4 17h16', close: 'm6 6 12 12M6 18 18 6',
  check: 'm5 12 4 4L19 6', code: 'm8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18',
  book: 'M12 5c-3-2-6-2-9-1v15c3-1 6-1 9 1m0-15c3-2 6-2 9-1v15c-3-1-6-1-9 1V5Z',
  search: 'M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z',
  refresh: 'M20 7v5h-5M4 17v-5h5m-4.5-4A8 8 0 0 1 18 5l2 3M4 16l2 3a8 8 0 0 0 13.5-3',
  clock: 'M12 8v5l3 2m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  spark: 'm12 3 2.6 6.4L21 12l-6.4 2.6L12 21l-2.6-6.4L3 12l6.4-2.6L12 3Z',
  layers: 'm12 3 10 5-10 5L2 8l10-5Zm-10 9 10 5 10-5M2 16l10 5 10-5',
  target: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-4 0a5 5 0 1 1-10 0 5 5 0 0 1 10 0Zm-5 0h.01',
  trophy: 'M8 3h8v6a4 4 0 0 1-8 0V3Zm0 2H4v3a4 4 0 0 0 4 4m8-7h4v3a4 4 0 0 1-4 4m-4 1v6m-4 2h8',
  volume: 'm11 4-6 5H2v6h3l6 5V4Zm4 4a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14',
  'volume-off': 'm11 4-6 5H2v6h3l6 5V4Zm5 5 6 6m-6 0 6-6',
  shuffle: 'M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 4-3 6-6m3-5c1-1 2-1 3-1h3m-4-4 4 4-4 4',
};
export default function Icon({ name = 'arrow-right', size = 20, className = '' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}><path d={paths[name] || paths['arrow-right']} /></svg>;
}

Icon.propTypes = { name: PropTypes.string, size: PropTypes.number, className: PropTypes.string };

import PropTypes from 'prop-types';

export default function AlgorithmArt({ algorithm = 'bubble_sort', compact = false }) {
  const ink = 'var(--art-ink, #3e5043)', sage = 'var(--art-sage, #d9e4d3)', orange = 'var(--primary-color)', peach = 'var(--art-peach, #f7dfd2)';
  let art;
  if (algorithm === 'heap_sort') {
    const nodes = [[160, 28], [98, 78], [222, 78], [63, 128], [130, 128], [190, 128], [257, 128]];
    art = <>
      <path d="M160 28 98 78 63 128M98 78l32 50M160 28l62 50-32 50m32-50 35 50" fill="none" stroke="var(--art-line, #a7b69e)" strokeWidth="1.5" />
      {nodes.map(([cx, cy], i) => <g key={i}><circle cx={cx} cy={cy} r="17" fill={i === 0 ? orange : sage} /><text x={cx} y={cy + 4} textAnchor="middle" fontSize="11" fill={i === 0 ? '#29170e' : ink}>{[9, 7, 8, 2, 4, 3, 6][i]}</text></g>)}
    </>;
  } else if (algorithm === 'merge_sort') {
    art = <>
      <path d="m62 38 34 29m30-29-30 29m94-29 34 29m30-29-30 29M96 89l64 31 64-31" stroke="var(--art-line, #afbaaa)" strokeWidth="1.4" fill="none" />
      {[38, 101, 165, 229].map((x, i) => <g key={x}><rect x={x} y="16" width="50" height="30" rx="7" fill={i < 2 ? sage : peach} /><text x={x + 25} y="35" textAnchor="middle" fontSize="11" fill={ink}>{['6  2', '8  3', '5  1', '7  4'][i]}</text></g>)}
      {[57, 187].map((x, i) => <g key={x}><rect x={x} y="67" width="78" height="29" rx="7" fill={i === 0 ? sage : peach} /><text x={x + 39} y="85" textAnchor="middle" fontSize="10" fill={ink}>{i === 0 ? '2 3 6 8' : '1 4 5 7'}</text></g>)}
      <rect x="86" y="119" width="148" height="29" rx="7" fill="var(--art-solid, #3e5043)" /><text x="160" y="137" textAnchor="middle" fontSize="10" fill="var(--art-on-solid, #fff)">1 2 3 4 5 6 7 8</text>
    </>;
  } else if (algorithm === 'selection_sort') {
    art = <>
      <path d="M25 136h270" stroke="var(--art-line, #cdd4c6)" />
      {[66, 91, 41, 110, 58, 81, 30, 100].map((height, i) => <g key={i}><rect x={31 + i * 33} y={132 - height} width="23" height={height} rx="5" fill={i === 6 ? orange : sage} /><text x={42.5 + i * 33} y="151" fontSize="9" textAnchor="middle" fill="var(--text-muted, #74816e)">{[5, 7, 3, 8, 4, 6, 1, 9][i]}</text></g>)}
      <path d="M245 80V54H43v18m-4-4 4 4 4-4" stroke={orange} strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
    </>;
  } else {
    art = <>
      <path d="M37 96h246" stroke="var(--art-line, #c9d2c2)" strokeDasharray="3 5" />
      {[5, 2, 7, 3, 6, 1].map((value, i) => <g key={i}><circle cx={48 + i * 45} cy={i === 1 || i === 2 ? 75 : 96} r="19" fill={i === 1 || i === 2 ? peach : sage} stroke={i === 1 || i === 2 ? orange : 'none'} /><text x={48 + i * 45} y={(i === 1 || i === 2 ? 75 : 96) + 4} fontSize="12" fill={i === 1 || i === 2 ? orange : ink} textAnchor="middle">{value}</text></g>)}
      <path d="M94 43c10-16 35-16 44 0m-7-2 7 2 1-7M139 111c-10 16-35 16-44 0m7 2-7-2-1 7" stroke={orange} fill="none" strokeWidth="1.5" />
    </>;
  }
  return <div className={`algorithm-art${compact ? ' algorithm-art-compact' : ''}`} aria-hidden="true"><svg viewBox="0 0 320 165" fill="none">{art}</svg></div>;
}

AlgorithmArt.propTypes = { algorithm: PropTypes.string, compact: PropTypes.bool };

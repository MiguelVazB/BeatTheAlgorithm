import { useEffect, useState } from 'react';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { createSwapBoard, selectSwapValue } from '../utils/sortingGameState';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/QuickSort.css';

export const QuickSort = (props) => {
  const frame = useSortingAnimation('quick_sort', props);
  const activeIndices = [...frame.comparedIndices, ...frame.swappedIndices];
  return (
    <div className="quick-sort">
      <div className="quick-sort-status">
        <span>{frame.partitionRange ? `Working on positions ${frame.partitionRange[0] + 1} to ${frame.partitionRange[1]}` : frame.type === 'done' ? 'Every value is in its final position' : 'Choose a pivot. Split the problem.'}</span>
        <span className="quick-sort-pivot-label">Pivot <strong>{frame.pivotIndex === null ? '\u2014' : frame.values[frame.pivotIndex]}</strong></span>
      </div>
      <div className="quick-sort-row" role="list" aria-label="Quick sort values" style={{ '--quick-sort-columns': Math.max(frame.values.length, 1) }}>
        {frame.values.map((value, index) => (
          <div className="quick-sort-slot" role="listitem" key={index} aria-label={`${value}, position ${index + 1}${frame.pivotIndex === index ? ', pivot' : ''}${frame.sortedIndices.includes(index) ? ', final position' : ''}`}>
            <div className={`quick-sort-card${activeIndices.includes(index) ? ' is-active' : ''}${frame.sortedIndices.includes(index) ? ' is-sorted' : ''}${frame.pivotIndex === index ? ' is-pivot' : ''}`}>{value}</div>
            <span className="quick-sort-position" aria-hidden="true">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="quick-sort-legend"><span><i className="is-pivot" />Pivot</span><span><i className="is-active" />Comparing / swapping</span><span><i className="is-sorted" />Final position</span></div>
      <p className="sort-step-description">{frame.description}</p>
    </div>
  );
};
QuickSort.propTypes = sortingProps;

export const QuickSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [board, setBoard] = useState(() => createSwapBoard(randomNumbers));
  useEffect(() => setBoard(createSwapBoard(randomNumbers)), [randomNumbers]);
  useEffect(() => {
    if (active && board.moves > 0 && isSortedAnswer(board.values, randomNumbers)) setWinner('user');
  }, [active, board, randomNumbers, setWinner]);
  return (
    <div className="quick-sort quick-sort-player">
      <p className="quick-sort-player-hint" aria-live="polite">{board.selected === null ? 'Choose a number, then another to swap their places.' : `${board.values[board.selected]} selected. Choose another number to swap, or select it again to cancel.`}</p>
      <div className="quick-sort-row" style={{ '--quick-sort-columns': Math.max(board.values.length, 1) }}>
        {board.values.map((value, index) => (
          <div className="quick-sort-slot" key={index}>
            <button type="button" className={`quick-sort-card${board.selected === index ? ' is-selected' : ''}`} aria-label={`Select ${value} at position ${index + 1}`} aria-pressed={board.selected === index} disabled={!active} onClick={() => { if (active) setBoard((previous) => selectSwapValue(previous, index)); }}>{value}</button>
            <span className="quick-sort-position" aria-hidden="true">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="quick-sort-player-controls"><span>Swaps: {board.moves}</span><button type="button" disabled={!active} onClick={() => { if (active) setBoard(createSwapBoard(randomNumbers)); }}>Reset</button></div>
    </div>
  );
};
QuickSortUser.propTypes = playerProps;

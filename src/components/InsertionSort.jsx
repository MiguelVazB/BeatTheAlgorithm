import { useEffect, useState } from 'react';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { createInsertionBoard, selectInsertionValue } from '../utils/sortingGameState';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/InsertionSort.css';

export const InsertionSort = (props) => {
  const frame = useSortingAnimation('insertion_sort', props);
  const activeIndices = [...frame.comparedIndices, ...frame.swappedIndices];
  return (
    <div className="insertion-sort">
      <div className="insertion-sort-status">
        <span>Ordered prefix: <strong>{frame.sortedPrefixLength}</strong> of {frame.values.length}</span>
        <span className="insertion-sort-key-label">Key <strong>{frame.insertionIndex === null ? '\u2014' : frame.values[frame.insertionIndex]}</strong></span>
      </div>
      <div className="insertion-sort-row" role="list" aria-label="Insertion sort values" style={{ '--insertion-sort-columns': Math.max(frame.values.length, 1) }}>
        {frame.values.map((value, index) => (
          <div className="insertion-sort-slot" role="listitem" key={index} aria-label={`${value}, position ${index + 1}${index === frame.insertionIndex ? ', key' : ''}${frame.sortedIndices.includes(index) ? ', final position' : index < frame.sortedPrefixLength ? ', ordered prefix, may move later' : ''}`}>
            <div className={`insertion-sort-card${index < frame.sortedPrefixLength ? ' is-ordered' : ''}${activeIndices.includes(index) ? ' is-active' : ''}${frame.sortedIndices.includes(index) ? ' is-final' : ''}${frame.insertionIndex === index ? ' is-key' : ''}`}>{value}</div>
            <span className="insertion-sort-position" aria-hidden="true">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="insertion-sort-legend"><span><i className="is-key" />Key</span><span><i className="is-active" />Comparing / swapping</span><span><i className="is-ordered" />Ordered prefix</span></div>
      <p className="insertion-sort-note">{frame.type === 'done' ? 'Every value is now in its final position.' : 'The green prefix is ordered. Later values can still move into it.'}</p>
      <p className="sort-step-description">{frame.description}</p>
    </div>
  );
};
InsertionSort.propTypes = sortingProps;

export const InsertionSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [board, setBoard] = useState(() => createInsertionBoard(randomNumbers));
  useEffect(() => setBoard(createInsertionBoard(randomNumbers)), [randomNumbers]);
  useEffect(() => {
    if (active && board.moves > 0 && isSortedAnswer(board.values, randomNumbers)) setWinner('user');
  }, [active, board, randomNumbers, setWinner]);
  return (
    <div className="insertion-sort insertion-sort-player">
      <p className="insertion-sort-player-hint" aria-live="polite">{board.selected === null ? 'Choose a number, then its new position. The values between them shift to make room.' : `${board.values[board.selected]} selected. Choose its new position, or select it again to cancel.`}</p>
      <div className="insertion-sort-row" style={{ '--insertion-sort-columns': Math.max(board.values.length, 1) }}>
        {board.values.map((value, index) => (
          <div className="insertion-sort-slot" key={index}>
            <button type="button" className={`insertion-sort-card${board.selected === index ? ' is-selected' : ''}`} aria-label={board.selected === null ? `Select ${value} at position ${index + 1}` : board.selected === index ? `Cancel selection of ${value} at position ${index + 1}` : `Insert ${board.values[board.selected]} at position ${index + 1}`} aria-pressed={board.selected === index} disabled={!active} onClick={() => { if (active) setBoard((previous) => selectInsertionValue(previous, index)); }}>{value}</button>
            <span className="insertion-sort-position" aria-hidden="true">{index + 1}</span>
          </div>
        ))}
      </div>
      <div className="insertion-sort-player-controls"><span>Insertions: {board.moves}</span><button type="button" disabled={!active} onClick={() => { if (active) setBoard(createInsertionBoard(randomNumbers)); }}>Reset</button></div>
    </div>
  );
};
InsertionSortUser.propTypes = playerProps;

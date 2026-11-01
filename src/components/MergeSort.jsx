import { useEffect, useRef, useState } from 'react';
import { ArrowsComponent } from './ArrowsComponent';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { createMergeBoard, moveMergeValue } from '../utils/sortingGameState';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/MergeSort.css';

export const MergeSort = (props) => {
  const frame = useSortingAnimation('merge_sort', props);
  const valuesRef = useRef(null);
  return (
    <div className="mergeSort">
      <div className="merge-current-board">
        <div ref={valuesRef} className="merge-current-values" style={{ '--value-count': frame.values.length }}>{frame.values.map((value, index) => <div className={`merge-current-value ${frame.comparedIndices.includes(index) ? 'sort-value-active' : ''} ${frame.sortedIndices.includes(index) ? 'sort-value-sorted' : ''}`} key={index}>{value}</div>)}</div>
        {frame.comparedIndices.length > 0 && <ArrowsComponent firstArrowPos={frame.comparedIndices[0]} secondArrowPos={frame.comparedIndices[1]} valuesRef={valuesRef} />}
      </div>
      <p className="sort-step-description">{frame.description}</p>
      {frame.mergeBuffer && <div className="merge-buffer">Merge buffer: {frame.mergeBuffer.length ? frame.mergeBuffer.join(', ') : 'empty'}</div>}
      <div className="merge-pass-history" aria-label="Completed merge passes">{frame.passes.map((pass) => <div className="merge-pass" key={pass.size}><span>Runs of {pass.size}</span><div>{pass.values.map((value, index) => <span className={index > 0 && index % pass.size === 0 ? 'merge-run-start' : ''} key={index}>{value}</span>)}</div></div>)}</div>
    </div>
  );
};
MergeSort.propTypes = sortingProps;

export const MergeSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [board, setBoard] = useState(() => createMergeBoard(randomNumbers));
  useEffect(() => setBoard(createMergeBoard(randomNumbers)), [randomNumbers]);
  useEffect(() => {
    if (active && isSortedAnswer(board.answer, randomNumbers)) setWinner('user');
  }, [active, board.answer, randomNumbers, setWinner]);
  const move = (row, index) => { if (active) setBoard((previous) => moveMergeValue(previous, row, index)); };
  return (
    <div className="mergeSortUser">
      <div className="userAttemptContainer" aria-label="Your sorted answer">{board.answer.map((value, index) => <button type="button" className="userAttempt" key={index} disabled={!active || value === null} onClick={() => move('answer', index)} aria-label={`Return ${value ?? 'empty slot'} from answer position ${index + 1}`}>{value ?? '—'}</button>)}</div>
      <div className="valuesToSortUserContainer" aria-label="Numbers to choose">{board.source.map((value, index) => <button type="button" className="valueToSortMerge" key={index} disabled={!active || value === null} onClick={() => move('source', index)} aria-label={`Choose ${value ?? 'empty slot'} from position ${index + 1}`}>{value ?? '—'}</button>)}</div>
    </div>
  );
};
MergeSortUser.propTypes = playerProps;

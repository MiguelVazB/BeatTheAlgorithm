import { useEffect, useRef, useState } from 'react';
import { ArrowsComponent } from './ArrowsComponent';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { createSwapBoard, selectSwapValue } from '../utils/sortingGameState';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/SelectionSort.css';

export const SelectionSort = (props) => {
  const frame = useSortingAnimation('selection_sort', props);
  const valuesRef = useRef(null);
  const activeIndices = frame.comparedIndices.length ? frame.comparedIndices : frame.swappedIndices;
  return (
    <div className="selectionSort">
      <div ref={valuesRef} className="numbersToSort">{frame.values.map((value, index) => <div className={`values ${frame.sortedIndices.includes(index) ? 'valueSorted sort-value-sorted' : ''} ${activeIndices.includes(index) ? 'sort-value-active' : ''}`} key={index}>{value}</div>)}</div>
      {activeIndices.length > 0 && <ArrowsComponent firstArrowPos={activeIndices[0]} secondArrowPos={activeIndices[1]} valuesRef={valuesRef} />}
      <div className="colorMeanings"><span className="sortedColor"><i id="sorted" />Final positions</span><span className="unsortedColor"><i id="unsorted" />Still sorting</span></div>
      <div className="currentValues">Current minimum: {frame.minimumIndex === null ? '—' : frame.values[frame.minimumIndex]}</div>
      <p className="sort-step-description">{frame.description}</p>
    </div>
  );
};
SelectionSort.propTypes = sortingProps;

export const SelectionSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [board, setBoard] = useState(() => createSwapBoard(randomNumbers));
  useEffect(() => setBoard(createSwapBoard(randomNumbers)), [randomNumbers]);
  useEffect(() => {
    if (active && board.moves > 0 && isSortedAnswer(board.values, randomNumbers)) setWinner('user');
  }, [active, board, randomNumbers, setWinner]);
  return <div className="selectionSortUser"><div className="userValuesToSort">{board.values.map((value, index) => <button type="button" className={`values userValues ${board.selected === index ? 'highlightBox' : ''}`} key={index} aria-pressed={board.selected === index} aria-label={`Select ${value} at position ${index + 1}`} disabled={!active} onClick={() => { if (active) setBoard((previous) => selectSwapValue(previous, index)); }}>{value}</button>)}</div></div>;
};
SelectionSortUser.propTypes = playerProps;

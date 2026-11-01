import { useEffect, useRef, useState } from 'react';
import { ArrowsComponent } from './ArrowsComponent';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/BubbleSort.css';

export const BubbleSort = (props) => {
  const frame = useSortingAnimation('bubble_sort', props);
  const bubblesRef = useRef(null);
  const activeIndices = frame.comparedIndices.length ? frame.comparedIndices : frame.swappedIndices;
  return (
    <div className="bubbleSort">
      <div ref={bubblesRef} className="algorithm">
        {frame.values.map((value, index) => <div className={`valueToSort valueToSortComputer ${frame.sortedIndices.includes(index) ? 'sort-value-sorted' : ''} ${activeIndices.includes(index) ? 'sort-value-active' : ''}`} key={index}><p>{value}</p></div>)}
      </div>
      {activeIndices.length > 0 && <ArrowsComponent firstArrowPos={activeIndices[0]} secondArrowPos={activeIndices[1]} valuesRef={bubblesRef} />}
      <div className="temporaryBubble"><p>Swap buffer:</p><div className="tempBubble"><p className="tempBubbleValue">{frame.temporaryValue ?? '—'}</p></div><div className="sortedValues">{frame.values.map((value, index) => <span key={index}>{value}</span>)}</div></div>
      <p className="sort-step-description">{frame.description}</p>
    </div>
  );
};
BubbleSort.propTypes = sortingProps;

export const BubbleSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [attempt, setAttempt] = useState([]);
  useEffect(() => setAttempt([]), [randomNumbers]);
  const answer = attempt.map((index) => randomNumbers[index]);
  useEffect(() => {
    if (active && isSortedAnswer(answer, randomNumbers)) setWinner('user');
  }, [active, answer, randomNumbers, setWinner]);
  const popBubble = (index) => {
    if (!active) return;
    setAttempt((previous) => previous.includes(index) ? previous : [...previous, index]);
  };
  return (
    <div className="bubbleSortUser">
      <div className="userCLickableBubbles">{randomNumbers.map((value, index) => <button type="button" className={`valueToSort userBubbles ${attempt.includes(index) ? 'bubblePopAnimate' : ''}`} key={index} disabled={!active || attempt.includes(index)} onClick={() => popBubble(index)} aria-label={`Choose ${value}, position ${index + 1}`}><p>{value}</p></button>)}</div>
      <div className="userAttempt" aria-label="Your answer">{answer.map((value, index) => <span key={index}>{value}</span>)}</div>
      <div className="buttonWrapper"><button type="button" className="resetBtn" disabled={!active} onClick={() => setAttempt([])}>Reset</button></div>
    </div>
  );
};
BubbleSortUser.propTypes = playerProps;

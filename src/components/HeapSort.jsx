import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowsComponent } from './ArrowsComponent';
import { useSortingAnimation } from '../hooks/useSortingAnimation';
import { getRelativePoint } from '../utils/elementGeometry';
import { isSortedAnswer } from '../utils/sortingAlgorithms';
import { createCarryBoard, moveCarriedValue } from '../utils/sortingGameState';
import { sortingProps, playerProps } from './common/sortingProps';
import './componentStyles/HeapSort.css';

export const HeapSort = (props) => {
  const frame = useSortingAnimation('heap_sort', props);
  const heapRef = useRef(null);
  const binaryTreeRef = useRef(null);
  const [lines, setLines] = useState([]);
  const activeIndices = frame.comparedIndices.length ? frame.comparedIndices : frame.swappedIndices;
  useLayoutEffect(() => {
    const heap = heapRef.current;
    const tree = binaryTreeRef.current;
    if (!heap || !tree) return;
    const updateLines = () => {
      const origin = heap.getBoundingClientRect();
      const centers = Array.from(tree.children, (node) => getRelativePoint(node.getBoundingClientRect(), origin));
      setLines(centers.slice(1).map((child, index) => {
        const parent = centers[Math.floor(index / 2)];
        return { x1: parent.x, y1: parent.y, x2: child.x, y2: child.y };
      }));
    };
    updateLines();
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(updateLines);
    observer?.observe(heap);
    observer?.observe(tree);
    for (const node of tree.children) observer?.observe(node);
    window.addEventListener('resize', updateLines);
    return () => { observer?.disconnect(); window.removeEventListener('resize', updateLines); };
  }, [frame.values]);
  return (
    <div className="heapSort" ref={heapRef}>
      <div className="originalValues"><span className="orValues">Original:</span>{props.randomNumbers.map((value, index) => <span key={index}>{value}</span>)}</div>
      <div ref={binaryTreeRef} className="binaryTree">{frame.values.map((value, index) => <div className={`circleValue circleValue${index} ${frame.sortedIndices.includes(index) ? 'sort-value-sorted' : ''} ${activeIndices.includes(index) ? 'sort-value-active' : ''}`} key={index}>{value}</div>)}</div>
      <svg className="heap-tree-edges" aria-hidden="true">{lines.map((line, index) => index + 1 < frame.heapSize && <line key={index} className="treeEdge" {...line} />)}</svg>
      {activeIndices.length > 0 && <ArrowsComponent firstArrowPos={activeIndices[0]} secondArrowPos={activeIndices[1]} valuesRef={binaryTreeRef} />}
      <div className="heap-array-order"><span>Array order:</span>{frame.values.map((value, index) => <span className={frame.sortedIndices.includes(index) ? 'sort-value-sorted' : ''} key={index}>{value}</span>)}</div>
      <p className="sort-step-description">{frame.description} <span className="sort-heap-size">Heap size: {frame.heapSize}. Green nodes are outside the active heap.</span></p>
    </div>
  );
};
HeapSort.propTypes = sortingProps;

export const HeapSortUser = ({ randomNumbers, setWinner, active = false }) => {
  const [board, setBoard] = useState(() => createCarryBoard(randomNumbers));
  useEffect(() => setBoard(createCarryBoard(randomNumbers)), [randomNumbers]);
  useEffect(() => {
    if (active && board.moves > 0 && board.carried === null && isSortedAnswer(board.values, randomNumbers)) setWinner('user');
  }, [active, board, randomNumbers, setWinner]);
  return (
    <div className="heapSortUser">
      <div className="selectedValueContainer"><div className={`selectedValue ${board.carried === null ? 'nonHighlightSelectedValue' : ''}`} aria-label="Number in hand">{board.carried ?? '—'}</div></div>
      <div className="valuesToSortUser">{board.values.map((value, index) => <button type="button" className="userValues" key={index} disabled={!active} aria-label={`${value === null ? 'Empty' : value}, position ${index + 1}`} onClick={() => { if (active) setBoard((previous) => moveCarriedValue(previous, index)); }}><span className="indexPos">{index + 1}</span>{value ?? '—'}</button>)}</div>
    </div>
  );
};
HeapSortUser.propTypes = playerProps;

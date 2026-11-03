import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { createSortingSteps } from '../utils/sortingAlgorithms';
import Icon from './Icon';
import './componentStyles/StepByStepVisualizer.css';

export default function StepByStepVisualizer({ algorithm, sampleData }) {
  const frames = useMemo(() => createSortingSteps(algorithm, sampleData), [algorithm, sampleData]);
  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const last = frames.length - 1;
  const currentIndex = Math.min(index, last);
  const frame = frames[currentIndex];
  useEffect(() => { setIndex(0); setIsPlaying(false); }, [frames]);
  useEffect(() => {
    if (!isPlaying) return;
    if (currentIndex === last) { setIsPlaying(false); return; }
    const timer = setTimeout(() => setIndex((step) => step + 1), 1200);
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, last]);
  const goTo = (step) => { setIsPlaying(false); setIndex(step); };
  const runs = algorithm === 'merge_sort' ? frame.passes.at(-1) : null;
  const isInsertion = algorithm === 'insertion_sort';
  return (
    <div className="step-visualizer">
      <div className="step-display">
        <div className="step-counter">Step {currentIndex + 1} of {frames.length}</div>
        <div className="step-content" aria-live={isPlaying ? 'off' : 'polite'} aria-atomic="true">{frame.description}</div>
        <div className="current-step"><div className="step-example">
          <h4>The working array</h4>
          {algorithm === 'heap_sort' && <p className="example-description">Max heap: the largest active value rises to the root. Heap size: {frame.heapSize}.</p>}
          {frame.partitionRange && <p className="example-description">Active partition: positions {frame.partitionRange[0] + 1} to {frame.partitionRange[1]}. Pivot: <strong>{frame.values[frame.pivotIndex]}</strong>. Values at or below the pivot go left; larger values go right.</p>}
          {isInsertion && <p className="example-description">Ordered prefix: {frame.sortedPrefixLength} of {frame.values.length} values.{frame.insertionIndex !== null && <> Key: <strong>{frame.values[frame.insertionIndex]}</strong>. Move it left past larger neighbors.</>}</p>}
          <div className="array-visualization">{frame.values.map((value, position) => <div key={position} className={`array-element ${isInsertion && position < frame.sortedPrefixLength ? 'ordered-prefix' : ''} ${frame.comparedIndices.includes(position) ? 'comparing' : ''} ${frame.swappedIndices.includes(position) ? 'swapping' : ''} ${frame.minimumIndex === position ? 'minimum' : ''} ${frame.sortedIndices.includes(position) ? 'settled' : ''} ${frame.pivotIndex === position ? 'pivot' : ''} ${frame.insertionIndex === position ? 'insertion-key' : ''}`} aria-label={frame.pivotIndex === position ? `${value}, pivot` : frame.insertionIndex === position ? `${value}, key` : undefined}>{value}</div>)}</div>
          {frame.mergeBuffer && <p className="example-description">Merge buffer: [{frame.mergeBuffer.join(', ')}]</p>}
          {runs && <div className="subarrays-visualization" aria-label="Sorted runs from the last completed pass">{Array.from({ length: Math.ceil(runs.values.length / runs.size) }, (_, run) => <span className="subarray" key={run}>[{runs.values.slice(run * runs.size, (run + 1) * runs.size).join(', ')}]</span>)}</div>}
          <p className="example-description example-legend">{isInsertion ? 'Amber: comparing · Orange: swapped · Outline: key · Green: ordered prefix (can move until sorting is complete)' : <>Amber: comparing · Orange: swapped · Green: final position{algorithm === 'selection_sort' ? ' or current minimum' : ''}{algorithm === 'quick_sort' ? ' · Outline: pivot' : ''}</>}</p>
        </div></div>
      </div>
      <div className="step-controls">
        <button type="button" className="step-btn" disabled={currentIndex === 0} onClick={() => goTo(currentIndex - 1)}><Icon name="arrow-left" size={15} />Previous</button>
        <button type="button" className="step-btn play-btn" aria-pressed={isPlaying} onClick={() => { if (currentIndex === last) setIndex(0); setIsPlaying((playing) => !playing); }}><Icon name={isPlaying ? 'pause' : currentIndex === last ? 'refresh' : 'play'} size={14} />{isPlaying ? 'Pause' : currentIndex === last ? 'Replay' : 'Play'}</button>
        <button type="button" className="step-btn" disabled={currentIndex === last} onClick={() => goTo(currentIndex + 1)}>Next<Icon name="arrow-right" size={15} /></button>
      </div>
      <label className="step-scrubber">Jump to a step<input type="range" min="0" max={last} value={currentIndex} onChange={(event) => goTo(Number(event.target.value))} aria-label="Visualization step" aria-valuetext={`Step ${currentIndex + 1}: ${frame.description}`} /></label>
    </div>
  );
}
StepByStepVisualizer.propTypes = { algorithm: PropTypes.string.isRequired, sampleData: PropTypes.arrayOf(PropTypes.number).isRequired };

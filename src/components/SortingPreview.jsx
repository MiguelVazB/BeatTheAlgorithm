import { useEffect, useState } from 'react';
import Icon from './Icon';

const initialValues = [6, 3, 8, 2, 7, 4, 5, 1];

function createFrames() {
  const values = [...initialValues];
  const frames = [{ values: [...values], active: [], sortedFrom: values.length, caption: 'Every sorted list starts with a little curiosity.' }];
  for (let end = values.length - 1; end > 0; end -= 1) {
    for (let i = 0; i < end; i += 1) {
      frames.push({ values: [...values], active: [i, i + 1], sortedFrom: end + 1, caption: `Compare ${values[i]} and ${values[i + 1]}. Which belongs first?` });
      if (values[i] > values[i + 1]) {
        [values[i], values[i + 1]] = [values[i + 1], values[i]];
        frames.push({ values: [...values], active: [i, i + 1], sortedFrom: end + 1, caption: 'Swap them. One small move toward a sorted list.' });
      }
    }
  }
  frames.push({ values: [...values], active: [], sortedFrom: 0, caption: 'All sorted. Now see if you can beat the algorithm.' });
  return frames;
}

const frames = createFrames();

export default function SortingPreview() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const frame = frames[step];
  const complete = step === frames.length - 1;

  useEffect(() => {
    if (!playing) return;
    if (complete) { setPlaying(false); return; }
    const timer = setTimeout(() => setStep((current) => current + 1), 650);
    return () => clearTimeout(timer);
  }, [playing, step, complete]);

  const togglePlaying = () => {
    if (complete) setStep(0);
    setPlaying((current) => !current);
  };

  return (
    <div className="sorting-preview">
      <div className="preview-topline"><span className="preview-window-dots" aria-hidden="true"><i /><i /><i /></span><span>BUBBLE_SORT.JS</span><span className="preview-live"><i /> Interactive</span></div>
      <div className="preview-body">
        <div className="preview-heading"><div><span className="eyebrow">A look under the hood</span><h2>Small steps. Sorted.</h2></div><span className="preview-step">{String(step).padStart(2, '0')}<span> / {frames.length - 1}</span></span></div>
        <div className="preview-chart" role="img" aria-label={`Bubble sort values: ${frame.values.join(', ')}. ${frame.caption}`}>
          {frame.values.map((value, index) => <div className="preview-bar-slot" key={index}><div className={`preview-bar${frame.active.includes(index) ? ' is-comparing' : ''}${index >= frame.sortedFrom ? ' is-sorted' : ''}`} style={{ height: `${value / 8 * 100}%` }}><span>{value}</span></div><span className="preview-bar-index">{index}</span></div>)}
        </div>
        <div className="preview-legend"><span><i /> Unsorted</span><span><i /> Comparing</span><span><i /> Sorted</span></div>
        <div className="preview-code"><span className="preview-code-line">01</span><code><span>if</span> (a[i] &gt; a[i + 1]) swap(i, i + 1);</code></div>
        <p className="preview-caption" aria-live={playing ? 'off' : 'polite'}>{frame.caption}</p>
      </div>
      <div className="preview-controls"><button type="button" onClick={togglePlaying} className="preview-play" aria-pressed={playing}><Icon name={playing ? 'pause' : complete ? 'refresh' : 'play'} size={15} />{playing ? 'Pause demo' : complete ? 'Replay demo' : 'Play demo'}</button><button type="button" className="preview-next" onClick={() => { setPlaying(false); setStep((current) => current === frames.length - 1 ? 0 : current + 1); }}>{complete ? 'Start again' : 'Next step'}<Icon name="arrow-right" size={16} /></button></div>
    </div>
  );
}

// One timer at a time; cancellation also works from inside an onStep callback.
export function playSortingSteps(steps, delay, onStep, onComplete, timers = globalThis) {
  let cancelled = false;
  let timer;
  let index = 0;
  const stop = () => { cancelled = true; timers.clearTimeout(timer); };
  const advance = () => {
    if (cancelled) return;
    index += 1;
    const step = steps[index];
    if (!step) { cancelled = true; return; }
    onStep(step);
    if (cancelled) return;
    if (step.type === 'done') {
      cancelled = true;
      onComplete();
    } else timer = timers.setTimeout(advance, delay);
  };
  if (steps.length > 1) timer = timers.setTimeout(advance, delay);
  return stop;
}

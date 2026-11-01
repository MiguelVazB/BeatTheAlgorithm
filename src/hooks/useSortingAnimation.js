import { useEffect, useMemo, useState } from 'react';
import { createSortingSteps } from '../utils/sortingAlgorithms';
import { getDifficultyTimeInterval } from '../utils/difficultyConfig';
import { playSortingSteps } from '../utils/sortingPlayback';

export function useSortingAnimation(algorithm, { randomNumbers, difficulty, countDownOver, winner, setWinner }) {
  const steps = useMemo(() => createSortingSteps(algorithm, randomNumbers), [algorithm, randomNumbers]);
  const [current, setCurrent] = useState(null);
  const delay = getDifficultyTimeInterval(algorithm, difficulty);
  useEffect(() => {
    if (!countDownOver || winner || !randomNumbers.length) return;
    setCurrent(null);
    return playSortingSteps(steps, delay, (step) => setCurrent({ steps, step }), () => setWinner('computer'));
  }, [countDownOver, winner, randomNumbers.length, steps, delay, setWinner]);
  return current?.steps === steps ? current.step : steps[0];
}

// src/utils/animationUtils.js
import { SoundManager } from './soundManager';

export const animateSwap = (element1, element2, duration = 300, isEasy = false) => {
  if (!element1 || !element2) return;

  const rect1 = element1.getBoundingClientRect();
  const rect2 = element2.getBoundingClientRect();
  const distanceX = rect2.x - rect1.x;

  const timing = isEasy ? duration : duration / 3;

  element1.animate(
    [{ transform: `translateX(${distanceX}px)` }],
    { duration: timing, easing: 'ease-in-out' }
  );

  element2.animate(
    [{ transform: `translateX(${-distanceX}px)` }],
    { duration: timing, easing: 'ease-in-out' }
  );
};

export const createCountDown = (countDownRef, onComplete) => {
  let countDownValue = 3;
  const interval = setInterval(() => {
    if (countDownRef.current) {
      countDownRef.current.innerHTML = countDownValue;
      // Only play sound for 3, 2, 1 (not for 0)
      if (countDownValue > 0) {
        SoundManager.play('countDown', 0.6);
      }
    }
    countDownValue -= 1;

    if (countDownValue < 0) {
      if (countDownRef.current) {
        countDownRef.current.style.display = "none";
      }
      clearInterval(interval);
      onComplete?.();
    }
  }, 1000);

  return interval;
};
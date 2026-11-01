// src/utils/animationUtils.js
import { SoundManager } from './soundManager.js';

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
  const showValue = () => {
    if (!countDownRef.current) return;
    countDownRef.current.textContent = String(countDownValue);
    SoundManager.play('countDown', 0.6);
  };
  showValue();
  const interval = setInterval(() => {
    countDownValue -= 1;
    if (countDownValue === 0) {
      if (countDownRef.current) {
        countDownRef.current.style.display = "none";
      }
      clearInterval(interval);
      onComplete?.();
    } else {
      showValue();
    }
  }, 1000);

  return interval;
};

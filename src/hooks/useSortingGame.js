import { useState, useEffect, useRef, useCallback } from 'react';
import { SoundManager } from '../utils/soundManager';
import { createCountDown } from '../utils/animationUtils';

export const useSortingGame = () => {
  const [countDownOver, setCountDownOver] = useState(false);
  const [winner, setWinnerState] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [songPlaying, setSongPlaying] = useState(true);
  const winnerRef = useRef('');
  const startedRef = useRef(false);
  const backgroundMusicRef = useRef(null);
  const countDownTimerRef = useRef(null);
  const countDownRef = useRef(null);
  const difficultyOverlayRef = useRef(null);

  // Claim the winner synchronously: a pending computer tick cannot overwrite a user win.
  const setWinner = useCallback((contender) => {
    if (!startedRef.current || winnerRef.current || !['user', 'computer'].includes(contender)) return;
    winnerRef.current = contender;
    setWinnerState(contender);
  }, []);

  useEffect(() => {
    if (winner === 'user') SoundManager.play('userWon');
    if (winner === 'computer') SoundManager.play('algoWon');
  }, [winner]);

  useEffect(() => {
    let timer;
    if (countDownOver && !winner && songPlaying) {
      if (!backgroundMusicRef.current) backgroundMusicRef.current = SoundManager.createBackgroundMusic();
      timer = setTimeout(() => { backgroundMusicRef.current?.play().catch(() => {}); }, 100);
    } else {
      backgroundMusicRef.current?.pause();
      if (winner && backgroundMusicRef.current) backgroundMusicRef.current.currentTime = 0;
    }
    return () => { clearTimeout(timer); backgroundMusicRef.current?.pause(); };
  }, [countDownOver, winner, songPlaying]);

  useEffect(() => () => {
    clearInterval(countDownTimerRef.current);
    backgroundMusicRef.current?.pause();
  }, []);

  const startCountDown = useCallback(() => {
    if (!difficulty || countDownOver || countDownTimerRef.current !== null || !countDownRef.current) return;
    if (difficultyOverlayRef.current) difficultyOverlayRef.current.style.display = 'none';
    countDownRef.current.style.visibility = 'visible';
    countDownTimerRef.current = createCountDown(countDownRef, () => {
      countDownTimerRef.current = null;
      startedRef.current = true;
      setCountDownOver(true);
      SoundManager.play('start', 0.4);
    });
  }, [difficulty, countDownOver]);

  return {
    countDownOver, showWinner: Boolean(winner), winner, difficulty, selectedDifficulty, songPlaying,
    countDownRef, difficultyOverlayRef, setWinner, setDifficulty, setSelectedDifficulty,
    startCountDown, toggleMusic: () => setSongPlaying((playing) => !playing),
    resetGame: () => window.location.reload(),
  };
};

// src/hooks/useSortingGame.js
import { useState, useEffect, useRef } from 'react';
import { SoundManager } from '../utils/soundManager';
import { getDifficultyTimeInterval } from '../utils/difficultyConfig';
import { createCountDown } from '../utils/animationUtils';

export const useSortingGame = (algorithm) => {
  const [countDownOver, setCountDownOver] = useState(false);
  const [showWinner, setShowWinner] = useState(false);
  const [winner, setWinner] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [songPlaying, setSongPlaying] = useState(true);

  const winnerRef = useRef(winner);
  const backgroundMusicRef = useRef(null);
  const countDownRef = useRef(null);
  const difficultyOverlayRef = useRef(null);

  // Update winner ref when winner changes
  useEffect(() => {
    winnerRef.current = winner;
  }, [winner]);

  // Handle winner sounds and display
  useEffect(() => {
    setShowWinner(winner);
    if (winner === "user") {
      SoundManager.play('userWon');
    } else if (winner === "computer") {
      SoundManager.play('algoWon');
    }
  }, [winner]);

  // Handle background music
  useEffect(() => {
    if (countDownOver && !winner.length) {
      if (!backgroundMusicRef.current) {
        backgroundMusicRef.current = SoundManager.createBackgroundMusic();
      }
      setTimeout(() => {
        backgroundMusicRef.current?.play();
      }, 100);
    } else {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    }

    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.pause();
        backgroundMusicRef.current.currentTime = 0;
      }
    };
  }, [countDownOver, winner]);

  const startCountDown = () => {
    if (difficulty.length > 0 && !countDownOver) {
      difficultyOverlayRef.current.style.display = "none";
      countDownRef.current.style.visibility = "visible";

      createCountDown(countDownRef, () => {
        setCountDownOver(true);
        SoundManager.play('start', 0.4);
      });
    }
  };

  const toggleMusic = () => {
    if (backgroundMusicRef.current) {
      if (backgroundMusicRef.current.paused) {
        backgroundMusicRef.current.play();
        setSongPlaying(true);
      } else {
        backgroundMusicRef.current.pause();
        setSongPlaying(false);
      }
    }
  };

  const resetGame = () => {
    window.location.reload(false);
  };

  return {
    // State
    countDownOver,
    showWinner,
    winner,
    difficulty,
    selectedDifficulty,
    songPlaying,

    // Refs
    countDownRef,
    difficultyOverlayRef,

    // Actions
    setWinner,
    setDifficulty,
    setSelectedDifficulty,
    startCountDown,
    toggleMusic,
    resetGame
  };
};
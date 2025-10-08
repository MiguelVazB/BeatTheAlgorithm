// src/utils/difficultyConfig.js
export const DIFFICULTY_CONFIG = {
  bubble_sort: {
    easy: 500,
    intermediate: 200,
    hard: 100,
    impossible: 10
  },
  selection_sort: {
    easy: 700,
    intermediate: 500,
    hard: 300,
    impossible: 10
  },
  heap_sort: {
    easy: 3000,
    intermediate: 2000,
    hard: 1000,
    impossible: 100
  },
  merge_sort: {
    easy: 2500,
    intermediate: 1000,
    hard: 500,
    impossible: 100
  }
};

export const getDifficultyTimeInterval = (algorithm, difficulty) => {
  return DIFFICULTY_CONFIG[algorithm]?.[difficulty?.toLowerCase()] || 500;
};
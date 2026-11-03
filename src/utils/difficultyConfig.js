// A step is one comparison, swap, merge, or completed pass in the visualization.
const intervals = { easy: 500, intermediate: 250, hard: 100, impossible: 10 };
export const DIFFICULTY_CONFIG = {
  bubble_sort: { ...intervals }, selection_sort: { ...intervals },
  heap_sort: { ...intervals }, merge_sort: { ...intervals },
  quick_sort: { ...intervals },
  insertion_sort: { ...intervals },
};
export const getDifficultyTimeInterval = (algorithm, difficulty) =>
  DIFFICULTY_CONFIG[algorithm]?.[difficulty?.toLowerCase()] ?? intervals.easy;
export const getDifficultyDescription = (algorithm, difficulty) =>
  `The computer takes one visual step every ${getDifficultyTimeInterval(algorithm, difficulty)} milliseconds.`;

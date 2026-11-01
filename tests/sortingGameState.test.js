import assert from 'node:assert/strict';
import test from 'node:test';
import { createSwapBoard, selectSwapValue, createCarryBoard, moveCarriedValue, createMergeBoard, moveMergeValue } from '../src/utils/sortingGameState.js';
import { isSortedAnswer } from '../src/utils/sortingAlgorithms.js';

test('rapid consecutive selection moves keep all values and allow deselection', () => {
  let board = createSwapBoard([3, 2, 1]);
  board = selectSwapValue(board, 0);
  board = selectSwapValue(board, 0);
  assert.equal(board.selected, null);
  assert.equal(board.moves, 0);
  for (const index of [0, 2, 1, 1]) board = selectSwapValue(board, index);
  assert.deepEqual(board.values, [1, 2, 3]);
  assert.equal(board.moves, 1);
  assert.equal(selectSwapValue(board, -1), board);
});

test('the heap player can move zero and duplicate values without losing the number in hand', () => {
  let board = createCarryBoard([2, 0, 0]);
  for (const index of [0, 2, 0]) board = moveCarriedValue(board, index);
  assert.deepEqual(board.values, [0, 0, 2]);
  assert.equal(board.carried, null);
  assert.equal(isSortedAnswer(board.values, [2, 0, 0]), true);
});

test('merge player ignores empty/full slots, supports undo, duplicates, and variable lengths', () => {
  let board = createMergeBoard([2, 1, 1]);
  assert.equal(moveMergeValue(board, 'answer', 0), board);
  for (const index of [1, 2, 0]) board = moveMergeValue(board, 'source', index);
  assert.deepEqual(board.answer, [1, 1, 2]);
  assert.deepEqual(board.source, [null, null, null]);
  assert.equal(moveMergeValue(board, 'source', 0), board);
  board = moveMergeValue(board, 'answer', 1);
  assert.deepEqual(board.answer, [1, null, 2]);
  assert.deepEqual(board.source, [1, null, null]);
  assert.equal(isSortedAnswer(board.answer, [2, 1, 1]), false);
  board = moveMergeValue(board, 'source', 0);
  assert.equal(isSortedAnswer(board.answer, [2, 1, 1]), true);
});

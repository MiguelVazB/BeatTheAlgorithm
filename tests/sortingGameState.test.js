import assert from 'node:assert/strict';
import test from 'node:test';
import { createSwapBoard, selectSwapValue, createCarryBoard, moveCarriedValue, createMergeBoard, moveMergeValue, createInsertionBoard, selectInsertionValue } from '../src/utils/sortingGameState.js';
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

test('insertion moves shift every intervening value in either direction without mutating earlier boards', () => {
  const original = Object.freeze([4, 0, 2, 2, 1]);
  const initial = createInsertionBoard(original);
  assert.notEqual(initial.values, original);
  Object.freeze(initial.values);
  Object.freeze(initial);
  const forwardSelection = selectInsertionValue(initial, 0);
  Object.freeze(forwardSelection);
  const movedForward = selectInsertionValue(forwardSelection, 4);
  assert.deepEqual(movedForward, { values: [0, 2, 2, 1, 4], selected: null, moves: 1 });
  assert.deepEqual(initial, { values: [4, 0, 2, 2, 1], selected: null, moves: 0 });
  assert.equal(forwardSelection.selected, 0);
  Object.freeze(movedForward.values);
  Object.freeze(movedForward);
  const movedBackward = selectInsertionValue(selectInsertionValue(movedForward, 3), 1);
  assert.deepEqual(movedBackward, { values: [0, 1, 2, 2, 4], selected: null, moves: 2 });
  assert.deepEqual(movedForward.values, [0, 2, 2, 1, 4]);
  assert.deepEqual(original, [4, 0, 2, 2, 1]);
  assert.equal(isSortedAnswer(movedBackward.values, original), true);
});

test('insertion selection handles index zero, cancellation, invalid destinations, and empty boards', () => {
  let board = createInsertionBoard([0, 2, 1, 1]);
  for (const index of [-1, 4, 0.5, NaN, Infinity, '0', null, undefined]) assert.equal(selectInsertionValue(board, index), board);
  board = selectInsertionValue(board, 0);
  assert.equal(board.selected, 0);
  for (const index of [-1, 4, 0.5, NaN, Infinity, '1', null, undefined]) assert.equal(selectInsertionValue(board, index), board);
  board = selectInsertionValue(board, 0);
  assert.deepEqual(board, { values: [0, 2, 1, 1], selected: null, moves: 0 });
  for (const index of [0, 1, 0, 3]) board = selectInsertionValue(board, index);
  assert.deepEqual(board, { values: [0, 1, 1, 2], selected: null, moves: 2 });
  assert.equal(isSortedAnswer(board.values, [0, 2, 1, 1]), true);
  const empty = createInsertionBoard([]);
  assert.equal(selectInsertionValue(empty, 0), empty);
});

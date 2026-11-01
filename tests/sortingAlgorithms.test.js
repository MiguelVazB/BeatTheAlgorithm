import assert from 'node:assert/strict';
import test from 'node:test';
import { SORTING_ALGORITHMS, createSortingSteps, isSortedAnswer } from '../src/utils/sortingAlgorithms.js';

const sorted = (values) => [...values].sort((a, b) => a - b);
const cases = [[], [1], [2, 1], [1, 2, 3, 4], [4, 3, 2, 1], [3, 3, 3], [0, -4, 0, 2, -4], [1.5, -2.5, 0.5], [38, 27, 43, 3, 9, 82, 10]];
// Reproducible examples, including many duplicates and odd-length inputs.
for (let length = 2; length <= 20; length += 1) {
  for (let seed = 1; seed <= 10; seed += 1) {
    let state = seed;
    cases.push(Array.from({ length }, () => { state = (Math.imul(state, 1664525) + 1013904223) >>> 0; return (state % 21) - 10; }));
  }
}

for (const algorithm of SORTING_ALGORITHMS) {
  test(`${algorithm}: every frame preserves the values, valid indices, and final positions across ${cases.length} inputs`, () => {
    for (const input of cases) {
      const original = [...input];
      const expected = sorted(input);
      const frames = createSortingSteps(algorithm, input);
      assert.deepEqual(input, original, 'must not mutate the caller');
      assert.equal(frames[0].type, 'start');
      assert.equal(frames.at(-1).type, 'done');
      assert.equal(frames.filter((frame) => frame.type === 'done').length, 1);
      assert.deepEqual(frames.at(-1).values, expected);
      for (const frame of frames) {
        assert.deepEqual(sorted(frame.values), expected, `${algorithm} ${frame.type}: lost or duplicated a value`);
        for (const index of [...frame.comparedIndices, ...frame.swappedIndices, ...frame.sortedIndices]) assert.ok(index >= 0 && index < input.length, 'index outside the list');
        for (const index of frame.sortedIndices) assert.equal(frame.values[index], expected[index], 'highlighted a value as final too soon');
      }
    }
  });
}

test('bubble sort compares adjacent unsorted neighbors and exits after a swap-free pass', () => {
  assert.equal(createSortingSteps('bubble_sort', [1, 2, 3, 4, 5]).filter((f) => f.type === 'compare').length, 4);
  for (const frame of createSortingSteps('bubble_sort', [5, 4, 3, 2, 1])) {
    if (frame.type !== 'compare') continue;
    assert.equal(frame.comparedIndices[1], frame.comparedIndices[0] + 1);
    assert.ok(frame.comparedIndices.every((i) => !frame.sortedIndices.includes(i)));
  }
});

test('selection sort scans every remaining candidate and swaps at most once per pass', () => {
  const frames = createSortingSteps('selection_sort', [5, 4, 3, 2, 1]);
  assert.equal(frames.filter((f) => f.type === 'compare').length, 10);
  let swaps = 0;
  for (const frame of frames) {
    if (frame.type === 'swap') swaps += 1;
    if (frame.type === 'pass') { assert.ok(swaps <= 1); swaps = 0; }
  }
});

test('heap sort builds and restores a max heap and extracts into a sorted suffix', () => {
  for (const input of cases) {
    for (const frame of createSortingSteps('heap_sort', input)) {
      if (!['heap-built', 'heap-restored'].includes(frame.type)) continue;
      for (let child = 1; child < frame.heapSize; child += 1) assert.ok(frame.values[Math.floor((child - 1) / 2)] >= frame.values[child]);
      if (frame.heapSize) assert.equal(frame.values[0], Math.max(...frame.values.slice(0, frame.heapSize)));
    }
  }
});

test('merge sort produces sorted runs for odd lengths and chooses the left equal value', () => {
  for (const input of cases) {
    for (const frame of createSortingSteps('merge_sort', input)) {
      if (frame.type === 'pass') {
        const pass = frame.passes.at(-1);
        for (let start = 0; start < pass.values.length; start += pass.size) {
          const run = pass.values.slice(start, start + pass.size);
          assert.deepEqual(run, sorted(run));
        }
      }
      if (frame.type === 'compare') {
        const [left, right] = frame.comparedIndices;
        if (frame.values[left] === frame.values[right]) assert.equal(frame.chosenIndex, left);
      }
    }
  }
});

test('frames are independent snapshots, including completed merge passes', () => {
  const frames = createSortingSteps('merge_sort', [3, 2, 1]);
  frames.at(-1).values[0] = 999;
  frames.at(-1).passes[0].values[0] = 999;
  assert.deepEqual(frames[0].values, [3, 2, 1]);
  assert.deepEqual(frames[0].passes[0].values, [3, 2, 1]);
});

test('quick sort partitions around the last value and never touches a fixed pivot again', () => {
  for (const input of cases) {
    const fixed = new Set();
    for (const frame of createSortingSteps('quick_sort', input)) {
      for (const index of [...frame.comparedIndices, ...frame.swappedIndices]) assert.ok(!fixed.has(index), 'revisited a final pivot');
      if (frame.partitionRange) {
        const [start, end] = frame.partitionRange;
        assert.ok(start >= 0 && end <= input.length && start < end);
        assert.ok(frame.pivotIndex >= start && frame.pivotIndex < end);
        for (const index of [...frame.comparedIndices, ...frame.swappedIndices]) assert.ok(index >= start && index < end);
        if (frame.type === 'partition') assert.equal(frame.pivotIndex, end - 1);
        if (frame.type === 'compare') assert.equal(frame.comparedIndices[1], frame.pivotIndex);
        if (frame.type === 'pivot-fixed') {
          const pivot = frame.values[frame.pivotIndex];
          assert.ok(frame.values.slice(start, frame.pivotIndex).every((value) => value <= pivot));
          assert.ok(frame.values.slice(frame.pivotIndex + 1, end).every((value) => value > pivot));
          assert.ok(!fixed.has(frame.pivotIndex), 'fixed the same pivot twice');
          fixed.add(frame.pivotIndex);
        }
      }
    }
    assert.equal(fixed.size, input.length, 'every value must reach a final position');
  }
});

test('quick sort exposes the quadratic worst case for ordered or equal inputs', () => {
  for (const input of [[1, 2, 3, 4, 5], [5, 4, 3, 2, 1], [2, 2, 2, 2, 2]]) {
    const frames = createSortingSteps('quick_sort', input);
    assert.equal(frames.filter((frame) => frame.type === 'compare').length, input.length * (input.length - 1) / 2);
  }
  const frames = createSortingSteps('quick_sort', [8, 2, 7, 1, 3, 5]);
  const partition = frames.find((frame) => frame.type === 'partition');
  const fixed = frames.find((frame) => frame.type === 'pivot-fixed');
  assert.deepEqual(fixed.values, [2, 1, 3, 5, 7, 8]);
  assert.equal(fixed.pivotIndex, 3);
  fixed.values[0] = 999;
  fixed.partitionRange[0] = 999;
  assert.deepEqual(partition.values, [8, 2, 7, 1, 3, 5]);
  assert.deepEqual(partition.partitionRange, [0, 6]);
});

test('answer validation rejects incomplete, sparse, and duplicate-cheating answers', () => {
  assert.equal(isSortedAnswer([1, 1, 2], [2, 1, 1]), true);
  for (const answer of [[1, 2], [1, 2, 2], [null, 1, 2], Array(3), [1, 2, undefined], [2, 1, 1]]) assert.equal(isSortedAnswer(answer, [2, 1, 1]), false);
  assert.equal(isSortedAnswer([], []), false);
  assert.throws(() => createSortingSteps('unknown', []), RangeError);
  assert.throws(() => createSortingSteps('bubble_sort', [NaN]), TypeError);
  assert.throws(() => createSortingSteps('bubble_sort', Array(3)), TypeError);
});

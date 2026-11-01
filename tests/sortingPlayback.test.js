import assert from 'node:assert/strict';
import test from 'node:test';
import { playSortingSteps } from '../src/utils/sortingPlayback.js';
import { createSortingSteps } from '../src/utils/sortingAlgorithms.js';
import { FakeClock } from './helpers.js';

test('default browser timers keep their global receiver for scheduling and cleanup', (context) => {
  const clock = new FakeClock();
  let schedules = 0;
  let cleanups = 0;
  // Browser timer APIs can reject a receiver other than their Window object.
  context.mock.method(globalThis, 'setTimeout', function (callback, delay) {
    if (this !== globalThis) throw new TypeError('Illegal invocation');
    schedules += 1;
    return clock.setTimeout(callback, delay);
  });
  context.mock.method(globalThis, 'clearTimeout', function (id) {
    if (this !== globalThis) throw new TypeError('Illegal invocation');
    cleanups += 1;
    return clock.clearTimeout(id);
  });

  let completions = 0;
  const steps = createSortingSteps('bubble_sort', [3, 2, 1]);
  const cancel = playSortingSteps(steps, 10, () => {}, () => completions++);
  clock.tick(20);
  cancel();
  clock.tick(10000);
  assert.equal(completions, 0);
  assert.equal(clock.tasks.size, 0);

  const stop = playSortingSteps(steps, 10, () => {}, () => completions++);
  clock.tick(10000);
  stop();
  assert.equal(completions, 1);
  assert.ok(schedules > steps.length, 'must test repeated scheduling as well as startup');
  assert.equal(cleanups, 2);
});

test('playback completes exactly once without repeating terminal timers', () => {
  const clock = new FakeClock();
  const steps = createSortingSteps('merge_sort', [5, 1, 3, 2]);
  const observed = [];
  let completions = 0;
  playSortingSteps(steps, 10, (step) => observed.push(step), () => completions++, clock);
  clock.tick(10000);
  assert.deepEqual(observed, steps.slice(1));
  assert.equal(completions, 1);
  assert.equal(clock.tasks.size, 0);
});

test('cancelling while the user finishes prevents later frames and computer wins', () => {
  const clock = new FakeClock();
  const observed = [];
  let completions = 0;
  const stop = playSortingSteps(createSortingSteps('heap_sort', [4, 3, 2, 1]), 10, (step) => observed.push(step), () => completions++, clock);
  clock.tick(10);
  stop();
  stop();
  clock.tick(10000);
  assert.equal(observed.length, 1);
  assert.equal(completions, 0);
  assert.equal(clock.tasks.size, 0);
});

test('cancelling from a frame callback prevents completion in the same tick', () => {
  const clock = new FakeClock();
  let completions = 0;
  const stop = playSortingSteps(createSortingSteps('bubble_sort', [1]), 10, () => stop(), () => completions++, clock);
  clock.tick(1000);
  assert.equal(completions, 0);
  assert.equal(clock.tasks.size, 0);
});

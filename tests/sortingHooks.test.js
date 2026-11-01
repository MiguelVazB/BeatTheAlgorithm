import assert from 'node:assert/strict';
import { before, after, test } from 'node:test';
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { createServer } from 'vite';
import { FakeClock } from './helpers.js';
import { SORTING_ALGORITHMS, createSortingSteps } from '../src/utils/sortingAlgorithms.js';

const { act, create } = TestRenderer;
const mountRoute = (Page, path, url, options) => create(
  React.createElement(MemoryRouter, { initialEntries: [url] },
    React.createElement(React.Suspense, { fallback: null },
      React.createElement(Routes, null,
        React.createElement(Route, { path, element: React.createElement(Page) })
      )
    )
  ), options
);
let server;
let useSortingAnimation;
let useSortingGame;
let SoundManager;
let StepByStepVisualizer;
let QuickSort;
let GameLayout;
let AlgorithmsPage;
let HomePage;
let SpecificAlgoPage;
const players = {};
before(async () => {
  server = await createServer({ server: { middlewareMode: true, watch: null, hmr: false, ws: false }, appType: 'custom', optimizeDeps: { noDiscovery: true, include: [] }, ssr: { noExternal: ['react-use'] } });
  ({ useSortingAnimation } = await server.ssrLoadModule('/src/hooks/useSortingAnimation.js'));
  ({ useSortingGame } = await server.ssrLoadModule('/src/hooks/useSortingGame.js'));
  ({ SoundManager } = await server.ssrLoadModule('/src/utils/soundManager.js'));
  ({ default: StepByStepVisualizer } = await server.ssrLoadModule('/src/components/StepByStepVisualizer.jsx'));
  for (const name of ['BubbleSort', 'SelectionSort', 'HeapSort', 'MergeSort', 'QuickSort']) {
    players[name] = (await server.ssrLoadModule(`/src/components/${name}.jsx`))[`${name}User`];
  }
  ({ QuickSort } = await server.ssrLoadModule('/src/components/QuickSort.jsx'));
  ({ default: GameLayout } = await server.ssrLoadModule('/src/pages/GameLayout.jsx'));
  ({ default: AlgorithmsPage } = await server.ssrLoadModule('/src/pages/AlgorithmsPage.jsx'));
  ({ default: HomePage } = await server.ssrLoadModule('/src/pages/HomePage.jsx'));
  ({ default: SpecificAlgoPage } = await server.ssrLoadModule('/src/pages/SpecificAlgoPage.jsx'));
});
after(async () => { await server?.close(); });
const fakeClock = (context) => {
  const clock = new FakeClock();
  for (const method of ['setTimeout', 'clearTimeout', 'setInterval', 'clearInterval']) context.mock.method(globalThis, method, clock[method]);
  return clock;
};
const mockSounds = (context) => {
  const sounds = [];
  context.mock.method(SoundManager, 'play', (name) => sounds.push(name));
  context.mock.method(SoundManager, 'createBackgroundMusic', () => ({ play: () => Promise.resolve(), pause() {}, currentTime: 0 }));
  return sounds;
};

test('countdown is exactly 3–2–1, pre-start claims are ignored, and the first winner is final', (context) => {
  const clock = fakeClock(context);
  const sounds = mockSounds(context);
  let game;
  const Harness = () => { game = useSortingGame(); return null; };
  let renderer;
  act(() => { renderer = create(React.createElement(Harness)); });
  game.countDownRef.current = { style: {}, textContent: '' };
  game.difficultyOverlayRef.current = { style: {} };
  act(() => game.setWinner('computer'));
  assert.equal(game.winner, '');
  act(() => game.setDifficulty('Easy'));
  act(() => { game.startCountDown(); game.startCountDown(); });
  assert.equal(game.countDownRef.current.textContent, '3');
  assert.equal(clock.tasks.size, 1, 'a double click must not create another countdown');
  act(() => clock.tick(1000));
  assert.equal(game.countDownRef.current.textContent, '2');
  act(() => clock.tick(1000));
  assert.equal(game.countDownRef.current.textContent, '1');
  act(() => game.setWinner('user'));
  assert.equal(game.winner, '');
  act(() => clock.tick(1000));
  assert.equal(game.countDownOver, true);
  assert.equal(game.countDownRef.current.style.display, 'none');
  act(() => { game.setWinner('user'); game.setWinner('computer'); });
  assert.equal(game.winner, 'user');
  assert.equal(sounds.filter((name) => name === 'userWon').length, 1);
  assert.equal(sounds.includes('algoWon'), false);
  act(() => renderer.unmount());
  assert.equal(clock.tasks.size, 0);
});

test('leaving during the countdown cancels its timer and start sound', (context) => {
  const clock = fakeClock(context);
  const sounds = mockSounds(context);
  let game;
  const Harness = () => { game = useSortingGame(); return null; };
  let renderer;
  act(() => { renderer = create(React.createElement(Harness)); });
  game.countDownRef.current = { style: {}, textContent: '' };
  act(() => game.setDifficulty('Easy'));
  act(() => game.startCountDown());
  act(() => clock.tick(1000));
  act(() => renderer.unmount());
  act(() => clock.tick(10000));
  assert.equal(clock.tasks.size, 0);
  assert.equal(sounds.includes('start'), false);
});

test('each mounted animation finishes sorted, declares one computer win, and leaves no timers', (context) => {
  const clock = fakeClock(context);
  for (const algorithm of SORTING_ALGORITHMS) {
    const numbers = [4, 1, 3, 1, 2];
    const winners = [];
    const props = { randomNumbers: numbers, difficulty: 'Hard', countDownOver: true, winner: '', setWinner: (value) => winners.push(value) };
    let frame;
    const Harness = () => { frame = useSortingAnimation(algorithm, props); return null; };
    let renderer;
    act(() => { renderer = create(React.createElement(Harness)); });
    act(() => clock.tick(100000));
    assert.equal(frame.type, 'done', algorithm);
    assert.deepEqual(frame.values, [1, 1, 2, 3, 4], algorithm);
    assert.deepEqual(winners, ['computer'], algorithm);
    assert.equal(clock.tasks.size, 0, algorithm);
    act(() => renderer.unmount());
  }
});

test('a user win stops pending animation without resetting its displayed frame', (context) => {
  const clock = fakeClock(context);
  const winners = [];
  const numbers = [3, 2, 1];
  const props = { randomNumbers: numbers, difficulty: 'Hard', countDownOver: true, winner: '', setWinner: (value) => winners.push(value) };
  let frame;
  const Harness = ({ winner }) => { frame = useSortingAnimation('heap_sort', { ...props, winner }); return null; };
  let renderer;
  act(() => { renderer = create(React.createElement(Harness, { winner: '' })); });
  act(() => clock.tick(100));
  const stoppedFrame = frame;
  act(() => renderer.update(React.createElement(Harness, { winner: 'user' })));
  act(() => clock.tick(100000));
  assert.equal(frame, stoppedFrame);
  assert.deepEqual(winners, []);
  assert.equal(clock.tasks.size, 0);
  act(() => renderer.unmount());
});

test('unmounting and remounting cannot leave duplicate animation timers', (context) => {
  const clock = fakeClock(context);
  const numbers = [3, 2, 1];
  const winners = [];
  const props = { randomNumbers: numbers, difficulty: 'Hard', countDownOver: true, winner: '', setWinner: (value) => winners.push(value) };
  const Harness = () => { useSortingAnimation('bubble_sort', props); return null; };
  let renderer;
  act(() => { renderer = create(React.createElement(Harness)); });
  assert.equal(clock.tasks.size, 1);
  act(() => renderer.unmount());
  assert.equal(clock.tasks.size, 0);
  act(() => { renderer = create(React.createElement(Harness)); });
  assert.equal(clock.tasks.size, 1);
  act(() => clock.tick(100000));
  assert.deepEqual(winners, ['computer']);
  act(() => renderer.unmount());
});

test('bubble player blocks early input and handles repeated clicks on equal values', () => {
  const winners = [];
  const props = { randomNumbers: [2, 1, 1], active: false, setWinner: (value) => winners.push(value) };
  let renderer;
  act(() => { renderer = create(React.createElement(players.BubbleSort, props)); });
  assert.ok(renderer.root.findAllByType('button').every((button) => button.props.disabled));
  act(() => renderer.root.findAllByType('button')[1].props.onClick());
  act(() => renderer.update(React.createElement(players.BubbleSort, { ...props, active: true })));
  act(() => { for (const index of [1, 1, 2, 0]) renderer.root.findAllByType('button')[index].props.onClick(); });
  assert.deepEqual(winners, ['user']);
  act(() => renderer.unmount());
});

test('selection and heap players win only after completing valid moves', () => {
  for (const [name, numbers, moves] of [['SelectionSort', [3, 2, 1], [0, 2]], ['HeapSort', [2, 0, 0], [0, 2, 0]]]) {
    const winners = [];
    let renderer;
    act(() => { renderer = create(React.createElement(players[name], { randomNumbers: numbers, active: true, setWinner: (value) => winners.push(value) })); });
    assert.deepEqual(winners, []);
    act(() => { for (const index of moves) renderer.root.findAllByType('button')[index].props.onClick(); });
    assert.deepEqual(winners, ['user'], name);
    act(() => renderer.unmount());
  }
});

test('merge player supports duplicates and ignores a double click on a consumed source slot', () => {
  const winners = [];
  let renderer;
  act(() => { renderer = create(React.createElement(players.MergeSort, { randomNumbers: [2, 1, 1], active: true, setWinner: (value) => winners.push(value) })); });
  act(() => { for (const index of [4, 4, 5, 3]) renderer.root.findAllByType('button')[index].props.onClick(); });
  assert.deepEqual(winners, ['user']);
  assert.ok(renderer.root.findAllByType('button').slice(3).every((button) => button.props.disabled));
  act(() => renderer.unmount());
});

test('lesson controls show the same actual frames as the game, including odd merge runs', () => {
  for (const algorithm of SORTING_ALGORITHMS) {
    const sampleData = [4, 1, 3, 1, 2];
    const frames = createSortingSteps(algorithm, sampleData);
    let renderer;
    act(() => { renderer = create(React.createElement(StepByStepVisualizer, { algorithm, sampleData })); });
    for (const index of [0, 1, 5, frames.length - 1]) {
      act(() => renderer.root.findByType('input').props.onChange({ target: { value: String(index) } }));
      const values = renderer.root.findAll((element) => /(^|\s)array-element(\s|$)/.test(element.props.className ?? '')).map((element) => Number(element.children[0]));
      assert.deepEqual(values, frames[index].values, `${algorithm}, step ${index}`);
      assert.equal(renderer.root.findByProps({ className: 'step-content' }).children[0], frames[index].description);
    }
    act(() => renderer.unmount());
  }
});

test('lesson autoplay stops on the completed sorted frame and can replay', (context) => {
  const clock = fakeClock(context);
  const sampleData = [3, 1, 2];
  const frames = createSortingSteps('heap_sort', sampleData);
  let renderer;
  act(() => { renderer = create(React.createElement(StepByStepVisualizer, { algorithm: 'heap_sort', sampleData })); });
  act(() => renderer.root.findAllByType('button')[1].props.onClick());
  for (let i = 1; i < frames.length; i += 1) act(() => clock.tick(1200));
  assert.equal(renderer.root.findByType('input').props.value, frames.length - 1);
  assert.equal(renderer.root.findAllByType('button')[1].props['aria-pressed'], false);
  assert.equal(clock.tasks.size, 0);
  act(() => renderer.root.findAllByType('button')[1].props.onClick());
  assert.equal(renderer.root.findByType('input').props.value, 0);
  assert.equal(clock.tasks.size, 1);
  act(() => renderer.unmount());
  assert.equal(clock.tasks.size, 0);
});

test('quick sort shows the actual moving pivot, including zero at the first position', (context) => {
  const clock = fakeClock(context);
  const randomNumbers = [3, 2, 0];
  const frames = createSortingSteps('quick_sort', randomNumbers);
  const winners = [];
  let renderer;
  act(() => { renderer = create(React.createElement(QuickSort, { randomNumbers, difficulty: 'Hard', countDownOver: true, winner: '', setWinner: (value) => winners.push(value) })); });
  for (let index = 1; index < frames.length; index += 1) {
    act(() => clock.tick(100));
    const frame = frames[index];
    const cards = renderer.root.findAll((element) => element.props.className?.startsWith('quick-sort-card'));
    assert.deepEqual(cards.map((card) => Number(card.children[0])), frame.values);
    const pivots = cards.filter((card) => card.props.className.includes('is-pivot'));
    assert.equal(pivots.length, frame.pivotIndex === null ? 0 : 1);
    if (frame.pivotIndex !== null) assert.equal(Number(pivots[0].children[0]), frame.values[frame.pivotIndex]);
    assert.equal(renderer.root.findByProps({ className: 'sort-step-description' }).children[0], frame.description);
  }
  assert.deepEqual(winners, ['computer']);
  assert.equal(clock.tasks.size, 0);
  act(() => renderer.unmount());
});

test('quick sort player blocks early input, cancels selection, resets, and sorts duplicates', () => {
  const winners = [];
  const props = { randomNumbers: [2, 1, 1], active: false, setWinner: (value) => winners.push(value) };
  let renderer;
  act(() => { renderer = create(React.createElement(players.QuickSort, props)); });
  const buttons = () => renderer.root.findAllByType('button');
  assert.ok(buttons().every((button) => button.props.disabled));
  act(() => buttons()[0].props.onClick());
  assert.equal(buttons()[0].props['aria-pressed'], false);
  act(() => renderer.update(React.createElement(players.QuickSort, { ...props, active: true })));
  act(() => buttons()[0].props.onClick());
  assert.equal(buttons()[0].props['aria-pressed'], true);
  act(() => buttons()[0].props.onClick());
  assert.equal(buttons()[0].props['aria-pressed'], false);
  act(() => { buttons()[0].props.onClick(); buttons()[1].props.onClick(); });
  assert.deepEqual(buttons().slice(0, 3).map((button) => Number(button.children[0])), [1, 2, 1]);
  assert.deepEqual(winners, []);
  act(() => buttons()[3].props.onClick());
  assert.deepEqual(buttons().slice(0, 3).map((button) => Number(button.children[0])), [2, 1, 1]);
  act(() => { buttons()[0].props.onClick(); buttons()[2].props.onClick(); });
  assert.deepEqual(winners, ['user']);
  act(() => renderer.update(React.createElement(players.QuickSort, { ...props, randomNumbers: [3, 1, 2], active: false })));
  assert.deepEqual(buttons().slice(0, 3).map((button) => Number(button.children[0])), [3, 1, 2]);
  act(() => renderer.unmount());
});

test('quick sort is discoverable from home and the library, and its lesson route works', () => {
  for (const Page of [HomePage, AlgorithmsPage]) {
    let renderer;
    act(() => { renderer = create(React.createElement(MemoryRouter, {}, React.createElement(Page))); });
    assert.ok(renderer.root.findAllByType('a').some((link) => link.props.href === '/algo/quick_sort'));
    if (Page === AlgorithmsPage) {
      assert.equal(renderer.root.findByProps({ className: 'library-count' }).children[0], '05');
      assert.ok(renderer.root.findAllByType('a').some((link) => link.props.href === '/moreOnAlgorithms/quick_sort'));
    }
    act(() => renderer.unmount());
  }
  let renderer;
  act(() => { renderer = mountRoute(SpecificAlgoPage, '/moreOnAlgorithms/:algoname', '/moreOnAlgorithms/quick_sort'); });
  assert.equal(renderer.root.findByType('h1').children[0], 'Quick Sort');
  const frames = createSortingSteps('quick_sort', [8, 2, 7, 1, 3, 5]);
  const fixedIndex = frames.findIndex((frame) => frame.type === 'pivot-fixed');
  act(() => renderer.root.findByType('input').props.onChange({ target: { value: String(fixedIndex) } }));
  const pivot = renderer.root.findAll((element) => element.props.className?.split(' ').includes('pivot'));
  assert.equal(pivot.length, 1);
  assert.equal(pivot[0].props['aria-label'], '5, pivot');
  assert.ok(pivot[0].props.className.includes('settled'));
  act(() => renderer.unmount());
});

test('quick sort game route completes setup, waits for countdown, and finishes the race', async (context) => {
  const clock = fakeClock(context);
  const sounds = mockSounds(context);
  for (const [name, value] of Object.entries({
    document: { body: { style: { overflow: '' } } },
    requestAnimationFrame: (callback) => clock.setTimeout(() => callback(clock.now), 16),
    cancelAnimationFrame: (id) => clock.clearTimeout(id),
  })) {
    const previous = Object.getOwnPropertyDescriptor(globalThis, name);
    Object.defineProperty(globalThis, name, { configurable: true, value });
    context.after(() => { if (previous) Object.defineProperty(globalThis, name, previous); else delete globalThis[name]; });
  }
  let renderer;
  await act(async () => {
    renderer = mountRoute(GameLayout, '/algo/:algoname', '/algo/quick_sort', { createNodeMock: () => ({ style: {}, textContent: '' }) });
  });
  assert.equal(renderer.root.findByType('h1').children[0], 'Quick Sort');
  const player = () => renderer.root.findByType(players.QuickSort).findAllByType('button');
  assert.ok(player().every((button) => button.props.disabled));
  for (let step = 0; step < 3; step += 1) act(() => renderer.root.findByProps({ className: 'game-primary-button' }).props.onClick());
  assert.ok(player().every((button) => button.props.disabled));
  act(() => clock.tick(2000));
  assert.ok(player().every((button) => button.props.disabled));
  act(() => clock.tick(1000));
  assert.ok(player().every((button) => !button.props.disabled));
  act(() => clock.tick(100000));
  assert.equal(renderer.root.findByProps({ id: 'game-result-title' }).children[0], 'The algorithm takes this one.');
  assert.ok(player().every((button) => button.props.disabled));
  assert.equal(sounds.filter((sound) => sound === 'algoWon').length, 1);
  act(() => renderer.unmount());
  assert.equal(clock.tasks.size, 0);
  assert.equal(document.body.style.overflow, '');
});

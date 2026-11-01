import assert from 'node:assert/strict';
import test from 'node:test';
import { getRelativePoint } from '../src/utils/elementGeometry.js';

const viewportRect = (rect, scrollX, scrollY) => ({
  ...rect,
  left: rect.left - scrollX,
  top: rect.top - scrollY,
});

test('arrows and tree edge centers stay attached while scrolling in both directions', () => {
  const heap = { left: 80, top: 280, width: 1024, height: 360 };
  const node = { left: 360, top: 380, width: 48, height: 48 };

  for (const [scrollX, scrollY] of [[0, 0], [0, 160], [0, 640], [37, 320], [0, 80], [0, 0]]) {
    const target = viewportRect(node, scrollX, scrollY);
    const origin = viewportRect(heap, scrollX, scrollY);
    assert.deepEqual(getRelativePoint(target, origin), { x: 304, y: 124 });
    assert.deepEqual(getRelativePoint(target, origin, 0.5, 1), { x: 304, y: 148 });
  }
});

test('responsive node sizes keep the arrow centered and below the node', () => {
  const origin = { left: 20, top: -120, width: 335, height: 290 };
  const node = { left: 100, top: -70, width: 26, height: 26 };
  assert.deepEqual(getRelativePoint(node, origin), { x: 93, y: 63 });
  assert.deepEqual(getRelativePoint(node, origin, 0.5, 1), { x: 93, y: 76 });
});

test('fresh rectangles account for a layout shift while already scrolled', () => {
  const node = { left: 130.5, top: 47.25, width: 34, height: 34 };
  const origin = { left: 30.5, top: -84.75, width: 600, height: 335 };
  assert.deepEqual(getRelativePoint(node, origin), { x: 117, y: 149 });
  assert.deepEqual(getRelativePoint(node, { ...origin, top: -64.75 }), { x: 117, y: 129 });
});

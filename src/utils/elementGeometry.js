// Both rectangles must come from getBoundingClientRect(). Subtracting their
// viewport origins keeps the result local, even when the page is scrolled.
export function getRelativePoint(elementRect, containerRect, xRatio = 0.5, yRatio = 0.5) {
  return {
    x: elementRect.left - containerRect.left + elementRect.width * xRatio,
    y: elementRect.top - containerRect.top + elementRect.height * yRatio,
  };
}

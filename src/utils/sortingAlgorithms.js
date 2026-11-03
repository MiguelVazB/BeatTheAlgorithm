export const SORTING_ALGORITHMS = ['bubble_sort', 'selection_sort', 'heap_sort', 'merge_sort', 'quick_sort', 'insertion_sort'];

export function isSortedAnswer(answer, original) {
  if (!original.length || answer.length !== original.length || Array.from(answer).some((value) => !Number.isFinite(value))) return false;
  const expected = [...original].sort((a, b) => a - b);
  return answer.every((value, index) => value === expected[index]);
}

// Immutable frames let the game and lesson replay the same actual operations.
export function createSortingSteps(algorithm, input) {
  if (!SORTING_ALGORITHMS.includes(algorithm)) throw new RangeError(`Unknown sorting algorithm: ${algorithm}`);
  if (!Array.isArray(input) || Array.from(input).some((value) => !Number.isFinite(value))) throw new TypeError('Sorting needs finite numbers.');
  const values = [...input];
  const steps = [];
  let sortedIndices = [];
  const passes = algorithm === 'merge_sort' ? [{ size: 1, values: [...values] }] : [];
  const emit = (type, description, details = {}) => steps.push({
    type, description, values: [...values], comparedIndices: [], swappedIndices: [],
    sortedIndices: [...sortedIndices], heapSize: values.length, minimumIndex: null,
    pivotIndex: null, partitionRange: null, insertionIndex: null, sortedPrefixLength: 0,
    passes: passes.map((pass) => ({ ...pass, values: [...pass.values] })), ...details,
  });
  emit('start', 'Start with the unsorted list.');

  if (algorithm === 'bubble_sort') {
    for (let end = values.length - 1; end > 0; end -= 1) {
      let swapped = false;
      for (let i = 0; i < end; i += 1) {
        emit('compare', `Compare neighboring values ${values[i]} and ${values[i + 1]}.`, { comparedIndices: [i, i + 1] });
        if (values[i] > values[i + 1]) {
          const temporaryValue = values[i];
          [values[i], values[i + 1]] = [values[i + 1], values[i]];
          swapped = true;
          emit('swap', 'Swap the neighbors so the smaller value comes first.', { swappedIndices: [i, i + 1], temporaryValue });
        }
      }
      sortedIndices = Array.from({ length: values.length - end }, (_, i) => end + i);
      emit('pass', 'The largest remaining value is now in its final position.');
      if (!swapped) break;
    }
  }

  if (algorithm === 'selection_sort') {
    for (let start = 0; start < values.length - 1; start += 1) {
      let minimumIndex = start;
      for (let candidate = start + 1; candidate < values.length; candidate += 1) {
        emit('compare', `Compare ${values[candidate]} with the current minimum, ${values[minimumIndex]}.`, { comparedIndices: [minimumIndex, candidate], minimumIndex });
        if (values[candidate] < values[minimumIndex]) {
          minimumIndex = candidate;
          emit('minimum', `${values[minimumIndex]} is the new minimum in the unsorted part.`, { minimumIndex });
        }
      }
      if (minimumIndex !== start) {
        [values[start], values[minimumIndex]] = [values[minimumIndex], values[start]];
        emit('swap', 'Move the minimum into the first unsorted position.', { swappedIndices: [start, minimumIndex], minimumIndex: start });
      }
      sortedIndices = Array.from({ length: start + 1 }, (_, i) => i);
      emit('pass', `${values[start]} is now in its final position.`, { minimumIndex: start });
    }
  }

  if (algorithm === 'heap_sort') {
    const siftDown = (root, size) => {
      while (root * 2 + 1 < size) {
        let largest = root;
        const left = root * 2 + 1;
        const right = left + 1;
        emit('compare', `Compare ${values[left]} with ${values[largest]} in the max heap.`, { comparedIndices: [largest, left], heapSize: size });
        if (values[left] > values[largest]) largest = left;
        if (right < size) {
          emit('compare', `Compare ${values[right]} with the largest candidate, ${values[largest]}.`, { comparedIndices: [largest, right], heapSize: size });
          if (values[right] > values[largest]) largest = right;
        }
        if (largest === root) break;
        [values[root], values[largest]] = [values[largest], values[root]];
        emit('swap', 'Move the larger child up to restore the max-heap property.', { swappedIndices: [root, largest], heapSize: size });
        root = largest;
      }
    };
    for (let root = Math.floor(values.length / 2) - 1; root >= 0; root -= 1) siftDown(root, values.length);
    if (values.length) emit('heap-built', 'The max heap is built. Its root holds the largest remaining value.');
    for (let end = values.length - 1; end > 0; end -= 1) {
      [values[0], values[end]] = [values[end], values[0]];
      sortedIndices = Array.from({ length: values.length - end }, (_, i) => end + i);
      emit('extract', 'Move the maximum to the sorted end and shrink the heap.', { swappedIndices: [0, end], heapSize: end });
      siftDown(0, end);
      emit('heap-restored', 'The remaining max heap is ready for the next extraction.', { heapSize: end });
    }
  }

  if (algorithm === 'merge_sort') {
    for (let size = 1; size < values.length; size *= 2) {
      for (let start = 0; start + size < values.length; start += size * 2) {
        const middle = start + size;
        const end = Math.min(start + size * 2, values.length);
        const merged = [];
        let left = start;
        let right = middle;
        while (left < middle && right < end) {
          emit('compare', `Compare ${values[left]} with ${values[right]}; take ${Math.min(values[left], values[right])} next.`, { comparedIndices: [left, right], mergingRange: [start, end], mergeBuffer: [...merged], chosenIndex: values[left] <= values[right] ? left : right });
          // Taking the left value on equality makes merge sort stable.
          if (values[left] <= values[right]) merged.push(values[left++]);
          else merged.push(values[right++]);
        }
        while (left < middle) merged.push(values[left++]);
        while (right < end) merged.push(values[right++]);
        values.splice(start, merged.length, ...merged);
        emit('merge', `These two runs now form one sorted run of ${merged.length} values.`, { mergingRange: [start, end], mergeBuffer: [...merged] });
      }
      passes.push({ size: Math.min(size * 2, values.length), values: [...values] });
      emit('pass', `This pass is complete. Sorted runs now contain up to ${Math.min(size * 2, values.length)} values.`);
    }
  }

  if (algorithm === 'quick_sort') {
    // Lomuto partitioning: the last value is the pivot, and equal values go left.
    const sortPartition = (start, end) => {
      if (start > end) return;
      const details = (pivotIndex = end) => ({ pivotIndex, partitionRange: [start, end + 1] });
      if (start === end) {
        sortedIndices.push(start);
        emit('pivot-fixed', `${values[start]} is the only value in this partition, so it is in its final position.`, details());
        return;
      }
      const pivot = values[end];
      let boundary = start;
      emit('partition', `Choose ${pivot}, the last value in positions ${start + 1} to ${end + 1}, as the pivot.`, details());
      for (let index = start; index < end; index += 1) {
        emit('compare', `Compare ${values[index]} with pivot ${pivot}. ${values[index] <= pivot ? 'It belongs on the left, with values at or below the pivot.' : 'It belongs on the right, with values above the pivot.'}`, { ...details(), comparedIndices: [index, end] });
        if (values[index] <= pivot) {
          if (index !== boundary) {
            [values[boundary], values[index]] = [values[index], values[boundary]];
            emit('swap', `Move ${values[boundary]} into the left part of this partition.`, { ...details(), swappedIndices: [boundary, index] });
          }
          boundary += 1;
        }
      }
      if (boundary !== end) {
        [values[boundary], values[end]] = [values[end], values[boundary]];
        emit('swap', `Place pivot ${pivot} between the values at or below it and the larger values.`, { ...details(boundary), swappedIndices: [boundary, end] });
      }
      sortedIndices.push(boundary);
      emit('pivot-fixed', `Pivot ${pivot} is now in its final position. Sort the remaining partitions independently.`, details(boundary));
      sortPartition(start, boundary - 1);
      sortPartition(boundary + 1, end);
    };
    sortPartition(0, values.length - 1);
  }

  if (algorithm === 'insertion_sort') {
    if (values.length) {
      emit('prefix', 'The first value forms a sorted prefix. Later insertions may still move it.', { sortedPrefixLength: 1 });
    }
    for (let index = 1; index < values.length; index += 1) {
      const key = values[index];
      let cursor = index;
      const details = () => ({ insertionIndex: cursor, sortedPrefixLength: cursor });
      emit('insert', `Choose ${key} at position ${index + 1} to insert into the sorted prefix.`, details());
      while (cursor > 0) {
        emit('compare', `Compare ${values[cursor - 1]} with the selected value, ${key}.`, { ...details(), comparedIndices: [cursor - 1, cursor] });
        // Strictly greater neighbors move right, preserving the order of equal values.
        if (values[cursor - 1] <= key) break;
        [values[cursor - 1], values[cursor]] = [values[cursor], values[cursor - 1]];
        cursor -= 1;
        emit('swap', `Move ${key} one position left and its larger neighbor one position right.`, { ...details(), swappedIndices: [cursor, cursor + 1] });
      }
      emit('inserted', `${key} is inserted. The first ${index + 1} values are sorted, but later insertions may still move them.`, { sortedPrefixLength: index + 1 });
    }
  }

  sortedIndices = values.map((_, index) => index);
  emit('done', 'The entire list is sorted from smallest to largest.', {
    heapSize: algorithm === 'heap_sort' ? 0 : values.length,
    sortedPrefixLength: algorithm === 'insertion_sort' ? values.length : 0,
  });
  return steps;
}

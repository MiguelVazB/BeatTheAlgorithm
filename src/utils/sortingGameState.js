export const createSwapBoard = (values) => ({ values: [...values], selected: null, moves: 0 });
export function selectSwapValue(state, index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.values.length) return state;
  if (state.selected === null) return { ...state, selected: index };
  if (state.selected === index) return { ...state, selected: null };
  const values = [...state.values];
  [values[state.selected], values[index]] = [values[index], values[state.selected]];
  return { values, selected: null, moves: state.moves + 1 };
}

export const createInsertionBoard = (values) => ({ values: [...values], selected: null, moves: 0 });
export function selectInsertionValue(state, index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.values.length) return state;
  if (state.selected === null) return { ...state, selected: index };
  if (state.selected === index) return { ...state, selected: null };
  const values = [...state.values];
  const [value] = values.splice(state.selected, 1);
  values.splice(index, 0, value);
  return { values, selected: null, moves: state.moves + 1 };
}

export const createCarryBoard = (values) => ({ values: [...values], carried: null, moves: 0 });
export function moveCarriedValue(state, index) {
  if (!Number.isInteger(index) || index < 0 || index >= state.values.length) return state;
  if (state.carried === null && state.values[index] === null) return state;
  const values = [...state.values];
  const carried = values[index];
  values[index] = state.carried;
  return { values, carried, moves: state.moves + 1 };
}

export const createMergeBoard = (values) => ({ source: [...values], answer: Array(values.length).fill(null) });
export function moveMergeValue(state, row, index) {
  if (row !== 'source' && row !== 'answer') return state;
  const destination = row === 'source' ? 'answer' : 'source';
  if (!Number.isInteger(index) || index < 0 || index >= state[row].length || state[row][index] === null) return state;
  const slot = state[destination].indexOf(null);
  if (slot === -1) return state;
  const from = [...state[row]];
  const to = [...state[destination]];
  to[slot] = from[index];
  from[index] = null;
  return { ...state, [row]: from, [destination]: to };
}

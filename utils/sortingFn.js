export const sortFn = (a, b) => {
  if (typeof a === 'number' || typeof b === 'number') {
    return a - b;
  } else if (typeof a === 'string' || typeof b === 'string') {
    if (a > b) {
      return 1;
    } else if (a < b) {
      return -1;
    } else {
      return 0;
    }
  }
};
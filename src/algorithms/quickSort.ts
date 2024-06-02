function quickSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (compareFn(arr[i], pivot) < 0) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left, compareFn), pivot, ...quickSort(right, compareFn)];
}

export default quickSort;
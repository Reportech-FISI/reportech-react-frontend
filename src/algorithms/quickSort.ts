function quickSort<T>(arr: T[], attribute: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  if (arr.length < 2) {
    return arr;
  }

  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(item => compare(item, pivot, attribute, order) < 0);
  const right = arr.filter(item => compare(item, pivot, attribute, order) > 0);
  const middle = arr.filter(item => compare(item, pivot, attribute, order) === 0);

  return [
    ...quickSort(left, attribute, order),
    ...middle,
    ...quickSort(right, attribute, order),
  ];
}

function compare<T>(a: T, b: T, attribute: keyof T, order: 'asc' | 'desc'): number {
  const isNumeric = typeof a[attribute] === 'number';
  const comparison = isNumeric
    ? (+a[attribute] - +b[attribute])
    : String(a[attribute]).localeCompare(String(b[attribute]));

  return order === 'asc' ? comparison : -comparison;
}

export default quickSort;

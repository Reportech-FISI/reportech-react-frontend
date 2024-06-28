export function mergeSort<T>(arr: T[], attribute: keyof T, order: 'asc' | 'desc' = 'asc'): T[] {
  if (arr.length < 2) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left, attribute, order), mergeSort(right, attribute, order), attribute, order);
}

function merge<T>(left: T[], right: T[], attribute: keyof T, order: 'asc' | 'desc'): T[] {
  const array: T[] = [];
  const isNumeric = attribute === 'id';

  while (left.length && right.length) {
    const comparison = isNumeric
      ? +left[0][attribute] - +right[0][attribute]
      : String(left[0][attribute]).localeCompare(String(right[0][attribute]));

    if (order === 'asc' ? comparison < 0 : comparison > 0) {
      array.push(left.shift() as T);
    } else {
      array.push(right.shift() as T);
    }
  }

  return array.concat(left, right);
}

export default mergeSort;
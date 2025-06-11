// utils/sort.js

export const stableSort = (array, compareFn) => {
  return array
    .map((item, index) => ({ item, index }))
    .sort((a, b) => {
      const result = compareFn(a.item, b.item);
      return result !== 0 ? result : a.index - b.index; // stable fallback
    })
    .map(({ item }) => item);
};

export const sortData = (data, key, order = null) => {
  if (!order) return data;

  return stableSort(data, (a, b) => {
    const valA = a[key];
    const valB = b[key];

    const isNumber = !isNaN(valA) && !isNaN(valB);

    if (isNumber) {
      return order === "asc" ? valA - valB : valB - valA;
    }

    // Case-insensitive string compare
    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();

    return order === "asc"
      ? strA.localeCompare(strB)
      : strB.localeCompare(strA);
  });
};

export const getColumnUniqueValues = (data, columns) => {
  const uniqueValues = {};
  columns.forEach((col) => {
    if (col.key === "id") return;
    uniqueValues[col.key] = [...new Set(data.map((row) => row[col.key]))];
  });
  return uniqueValues;
};

export const applyFilters = (data, filters) => {
  return data.filter((row) => {
    return Object.entries(filters).every(([colKey, selectedValues]) => {
      if (selectedValues.length === 0) return true;
      return selectedValues.includes(row[colKey]);
    });
  });
};

export const generateData = (count = 2000) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: ["Alice", "Bob", "Charlie", "Diana"][i % 4],
    age: 20 + (i % 5),
    city: ["Delhi", "Mumbai", "Chennai", "Kolkata"][i % 4],
  }));
};
export const columns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "age", label: "Age" },
  { key: "city", label: "City" },
];

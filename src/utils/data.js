export const columns = [
  {
    key: "id",
    label: "ID",
  },
  {
    key: "firstName",
    label: "First Name",
    options: ["Alice", "Bob", "Charlie", "Diana", "Eva", "Frank"],
  },
  {
    key: "lastName",
    label: "Last Name",
    options: ["Smith", "Johnson", "Williams", "Brown", "Davis"],
  },
  {
    key: "age",
    label: "Age",
    options: [20, 21, 22, 23, 24, 25, 30, 35, 40],
  },
  {
    key: "city",
    label: "City",
    options: [
      "Delhi",
      "Mumbai",
      "Chennai",
      "Kolkata",
      "Bangalore",
      "Hyderabad",
    ],
  },
];

export const generateData = (count = 2000) => {
  return Array.from({ length: count }, (_, i) => {
    const row = { id: i + 1 };
    columns.forEach((col) => {
      if (col.key === "id") return;
      if (col.options) {
        row[col.key] =
          col.options[Math.floor(Math.random() * col.options.length)];
      }
    });
    return row;
  });
};

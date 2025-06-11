export const generateData = (count = 2000) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Name ${i + 1}`,
    age: 20 + (i % 50),
    city: ['Delhi', 'Mumbai', 'Chennai', 'Kolkata'][i % 4],
  }));
};
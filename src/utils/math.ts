export const average = (array: number[]): number => {
  const sum = array.reduce((a, b) => a + b, 0);
  return sum / array.length;
};

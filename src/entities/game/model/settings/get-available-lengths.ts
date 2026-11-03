export const getAvailableLengths = (base: number): number[] =>
  Array.from({ length: Math.min(6, base) - 1 }, (_, index) => index + 2);

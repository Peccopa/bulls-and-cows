export const generateSecret = (
  _length: number,
  _base: number,
  _random: () => number = Math.random,
): string => {
  _random();
  return '';
};

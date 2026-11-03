import { createDigitValidator } from './create-digit-validator';

export const isValidGuess = (
  guess: string,
  length: number,
  base: number,
): boolean => {
  if (guess.length !== length) {
    return false;
  }

  const isValidDigit = createDigitValidator(base);
  const digits = [...guess];

  return digits.every(isValidDigit) && new Set(digits).size === length;
};

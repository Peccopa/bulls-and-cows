export const createDigitValidator =
  (base: number): ((char: string) => boolean) =>
  (char: string): boolean => {
    if (char.length !== 1) {
      return false;
    }

    const digit = Number.parseInt(char, base);

    return !Number.isNaN(digit) && digit.toString(base) === char.toLowerCase();
  };

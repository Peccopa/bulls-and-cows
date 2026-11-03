import { describe, expect, it } from 'vitest';
import { createDigitValidator } from './create-digit-validator';

describe('createDigitValidator', () => {
  it('accepts only binary digits in base 2', () => {
    const isValidDigit = createDigitValidator(2);

    expect(isValidDigit('0')).toBe(true);
    expect(isValidDigit('1')).toBe(true);
    expect(isValidDigit('2')).toBe(false);
  });

  it('accepts decimal digits in base 10', () => {
    const isValidDigit = createDigitValidator(10);

    expect(isValidDigit('0')).toBe(true);
    expect(isValidDigit('9')).toBe(true);
    expect(isValidDigit('a')).toBe(false);
  });

  it('accepts hexadecimal digits in lowercase', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('a')).toBe(true);
    expect(isValidDigit('f')).toBe(true);
    expect(isValidDigit('g')).toBe(false);
  });

  it('accepts hexadecimal digits in uppercase', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('A')).toBe(true);
    expect(isValidDigit('F')).toBe(true);
  });

  it('rejects characters that are not digits', () => {
    const isValidDigit = createDigitValidator(16);

    expect(isValidDigit('!')).toBe(false);
    expect(isValidDigit(' ')).toBe(false);
    expect(isValidDigit('')).toBe(false);
  });
});

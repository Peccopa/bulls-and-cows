import { describe, expect, it } from 'vitest';
import { isValidGuess } from './is-valid-guess';

describe('isValidGuess', () => {
  it('accepts a valid decimal guess', () => {
    expect(isValidGuess('1234', 4, 10)).toBe(true);
  });

  it('rejects a guess with incorrect length', () => {
    expect(isValidGuess('123', 4, 10)).toBe(false);
  });

  it('rejects digits outside the selected base', () => {
    expect(isValidGuess('1284', 4, 8)).toBe(false);
  });

  it('rejects repeated digits', () => {
    expect(isValidGuess('1224', 4, 10)).toBe(false);
  });

  it('accepts a leading zero', () => {
    expect(isValidGuess('0123', 4, 10)).toBe(true);
  });

  it('accepts uppercase hexadecimal digits', () => {
    expect(isValidGuess('A1B2', 4, 16)).toBe(true);
  });

  it('accepts lowercase hexadecimal digits', () => {
    expect(isValidGuess('a1b2', 4, 16)).toBe(true);
  });

  it('rejects hexadecimal guesses with duplicate digits in different cases', () => {
    expect(isValidGuess('aA3', 3, 16)).toBe(false);
  });
});

import { describe, expect, it } from 'vitest';
import { getAvailableLengths } from './get-available-lengths';

describe('getAvailableLengths', () => {
  it('returns only length 2 for binary', () => {
    expect(getAvailableLengths(2)).toEqual([2]);
  });

  it('returns lengths from 2 to 6 for octal', () => {
    expect(getAvailableLengths(8)).toEqual([2, 3, 4, 5, 6]);
  });

  it('returns lengths from 2 to 6 for decimal', () => {
    expect(getAvailableLengths(10)).toEqual([2, 3, 4, 5, 6]);
  });

  it('returns lengths from 2 to 6 for hexadecimal', () => {
    expect(getAvailableLengths(16)).toEqual([2, 3, 4, 5, 6]);
  });
});

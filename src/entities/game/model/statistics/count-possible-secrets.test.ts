import { describe, expect, it } from 'vitest';
import { countPossibleSecrets } from './count-possible-secrets';

describe('countPossibleSecrets', () => {
  it('counts possible secrets in binary', () => {
    expect(countPossibleSecrets(2, 2)).toBe(2);
  });

  it('counts possible secrets in octal', () => {
    expect(countPossibleSecrets(3, 8)).toBe(336);
  });

  it('counts possible secrets in decimal', () => {
    expect(countPossibleSecrets(4, 10)).toBe(5040);
  });

  it('counts possible secrets in hexadecimal', () => {
    expect(countPossibleSecrets(6, 16)).toBe(5765760);
  });

  it('counts all permutations when length equals base', () => {
    expect(countPossibleSecrets(4, 4)).toBe(24);
  });
});

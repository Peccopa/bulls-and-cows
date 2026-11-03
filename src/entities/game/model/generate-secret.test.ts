import { describe, expect, it } from 'vitest';
import { generateSecret } from './generate-secret';

describe('generateSecret', () => {
  it('generates a secret with the requested length', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(secret).toHaveLength(4);
  });

  it('generates a secret with unique digits', () => {
    const secret = generateSecret(4, 10, () => 0);

    expect(new Set(secret).size).toBe(4);
  });

  it('uses only digits available in the selected base', () => {
    const binarySecret = generateSecret(2, 2, () => 0.5);
    const hexadecimalSecret = generateSecret(6, 16, () => 0.5);

    expect(binarySecret).toMatch(/^[01]{2}$/);
    expect(hexadecimalSecret).toMatch(/^[0-9a-f]{6}$/);
  });

  it('uses the provided random function', () => {
    const firstSecret = generateSecret(4, 10, () => 0);
    const secondSecret = generateSecret(4, 10, () => 0.99);

    expect(firstSecret).not.toBe(secondSecret);
  });
});

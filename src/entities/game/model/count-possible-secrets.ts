const memo = new Map<string, number>();

export const countPossibleSecrets = (length: number, base: number): number => {
  const key = `${length}-${base}`;
  const cachedResult = memo.get(key);

  if (cachedResult !== undefined) {
    return cachedResult;
  }

  if (length === 0) {
    return 1;
  }

  if (length > base) {
    return 0;
  }

  const result = (base - length + 1) * countPossibleSecrets(length - 1, base);

  memo.set(key, result);

  return result;
};

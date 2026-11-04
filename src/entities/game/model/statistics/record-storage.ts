import type { GameRecord } from '../state/types';

const STORAGE_KEY = 'bulls-and-cows-records';

const isObject = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
};

const isGameRecord = (value: unknown): value is GameRecord => {
  if (!isObject(value) || !isObject(value.settings)) {
    return false;
  }

  return (
    Number.isInteger(value.settings.base) &&
    Number.isInteger(value.settings.length) &&
    Number.isInteger(value.attempts) &&
    Number.isFinite(value.duration) &&
    Number.isFinite(value.achievedAt)
  );
};

export const loadRecords = (): GameRecord[] => {
  const storedRecords = localStorage.getItem(STORAGE_KEY);

  if (!storedRecords) {
    return [];
  }

  try {
    const parsedRecords: unknown = JSON.parse(storedRecords);

    if (!Array.isArray(parsedRecords)) {
      return [];
    }

    return parsedRecords.filter(isGameRecord);
  } catch {
    return [];
  }
};

export const saveRecords = (records: GameRecord[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
};

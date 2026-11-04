import { beforeEach, describe, expect, it } from 'vitest';
import type { GameRecord } from '../state/types';
import { loadRecords, saveRecords } from './record-storage';

const records: GameRecord[] = [
  {
    settings: { base: 10, length: 4 },
    attempts: 5,
    duration: 12000,
    achievedAt: 1000,
  },
];

describe('record storage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return an empty array when storage is empty', () => {
    expect(loadRecords()).toEqual([]);
  });

  it('should save and load records', () => {
    saveRecords(records);

    expect(loadRecords()).toEqual(records);
  });
});

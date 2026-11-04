import { describe, expect, it } from 'vitest';
import type { GameRecord } from '../state/types';
import { sortRecords } from './sort-records';

const createRecord = (attempts: number, duration: number): GameRecord => ({
  settings: { base: 10, length: 4 },
  attempts,
  duration,
  achievedAt: 0,
});

describe('sortRecords', () => {
  it('should sort records by attempts first', () => {
    const records = [
      createRecord(5, 10000),
      createRecord(3, 20000),
      createRecord(4, 15000),
    ];

    expect(sortRecords(records)).toEqual([
      createRecord(3, 20000),
      createRecord(4, 15000),
      createRecord(5, 10000),
    ]);
  });

  it('should sort records by duration when attempts are equal', () => {
    const records = [
      createRecord(3, 20000),
      createRecord(3, 10000),
      createRecord(3, 15000),
    ];

    expect(sortRecords(records)).toEqual([
      createRecord(3, 10000),
      createRecord(3, 15000),
      createRecord(3, 20000),
    ]);
  });

  it('should not mutate the original array', () => {
    const records = [createRecord(5, 10000), createRecord(3, 20000)];

    sortRecords(records);

    expect(records).toEqual([createRecord(5, 10000), createRecord(3, 20000)]);
  });

  it('should limit records to 10', () => {
    const records = Array.from({ length: 15 }, (_, index) =>
      createRecord(index + 1, 10000),
    );

    expect(sortRecords(records)).toHaveLength(10);
  });
});

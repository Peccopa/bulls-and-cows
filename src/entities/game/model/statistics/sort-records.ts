import type { GameRecord } from '../state/types';

export const sortRecords = (records: GameRecord[]): GameRecord[] => {
  return [...records]
    .sort((a, b) => a.attempts - b.attempts || a.duration - b.duration)
    .slice(0, 10);
};

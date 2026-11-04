import { describe, expect, it } from 'vitest';
import type { GameRecord } from '../../../entities/game/model/state/types';
import { createLeaderboardView } from './leaderboard-view';

const records: GameRecord[] = [
  {
    settings: { base: 10, length: 4 },
    attempts: 3,
    duration: 24000,
    achievedAt: 1000,
  },
  {
    settings: { base: 16, length: 5 },
    attempts: 4,
    duration: 31000,
    achievedAt: 2000,
  },
];

describe('createLeaderboardView', () => {
  it('should render a leaderboard heading', () => {
    const view = createLeaderboardView(records);

    expect(view.querySelector('h2')?.textContent).toBe('Leaderboard');
  });

  it('should render all records', () => {
    const view = createLeaderboardView(records);

    expect(view.querySelectorAll('tbody tr')).toHaveLength(2);
  });

  it('should display record settings, attempts and duration', () => {
    const view = createLeaderboardView(records);

    expect(view.textContent).toContain('10');
    expect(view.textContent).toContain('16');
    expect(view.textContent).toContain('4');
    expect(view.textContent).toContain('5');
    expect(view.textContent).toContain('3');
    expect(view.textContent).toContain('24s');
    expect(view.textContent).toContain('31s');
  });

  it('should display an empty state when there are no records', () => {
    const view = createLeaderboardView([]);

    expect(view.textContent).toContain('No records yet');
    expect(view.querySelectorAll('tbody tr')).toHaveLength(0);
  });
});

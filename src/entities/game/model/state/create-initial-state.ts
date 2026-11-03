import type { GameSettings, GameState } from './types';

export const createInitialState = (settings: GameSettings): GameState => ({
  settings: { ...settings },
  status: 'setup',
  secret: null,
  history: [],
  startedAt: null,
  finishedAt: null,
});

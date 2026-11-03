import { generateSecret } from '../algorithms/generate-secret';
import type { GameState } from './types';

export const startGame = (
  state: GameState,
  random: () => number = Math.random,
  now: number = Date.now(),
): GameState => ({
  ...state,
  status: 'playing',
  secret: generateSecret(state.settings.length, state.settings.base, random),
  startedAt: now,
});

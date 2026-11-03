import { evaluateGuess } from '../algorithms/evaluate-guess';
import { isValidGuess } from '../validation/is-valid-guess';
import type { GameState } from './types';

export const submitGuess = (
  state: GameState,
  guess: string,
  now: number = Date.now(),
): GameState => {
  if (
    state.status !== 'playing' ||
    state.secret === null ||
    !isValidGuess(guess, state.settings.length, state.settings.base)
  ) {
    return state;
  }

  const { bulls, cows } = evaluateGuess(state.secret, guess);

  const isWon = bulls === state.settings.length;

  return {
    ...state,
    status: isWon ? 'won' : 'playing',
    history: [...state.history, { guess, bulls, cows }],
    finishedAt: isWon ? now : null,
  };
};

import { describe, expect, it } from 'vitest';
import { createInitialState } from './create-initial-state';
import { startGame } from './start-game';
import { submitGuess } from './submit-guess';

describe('submitGuess', () => {
  it('adds guess result to history', () => {
    const state = startGame(
      createInitialState({ length: 3, base: 10 }),
      () => 0,
      1000,
    );

    const result = submitGuess(state, '345', 2000);

    expect(result.history).toEqual([{ guess: '345', bulls: 0, cows: 0 }]);
    expect(result.status).toBe('playing');
  });

  it('finishes the game when all digits are guessed', () => {
    const state = startGame(
      createInitialState({ length: 3, base: 10 }),
      () => 0,
      1000,
    );

    const result = submitGuess(state, '012', 2000);

    expect(result.status).toBe('won');
    expect(result.finishedAt).toBe(2000);
    expect(result.history).toEqual([{ guess: '012', bulls: 3, cows: 0 }]);
  });

  it('does not modify the original state', () => {
    const state = startGame(
      createInitialState({ length: 3, base: 10 }),
      () => 0,
      1000,
    );

    submitGuess(state, '345', 2000);

    expect(state.history).toEqual([]);
    expect(state.status).toBe('playing');
  });

  it('ignores invalid guesses', () => {
    const state = startGame(
      createInitialState({ length: 3, base: 10 }),
      () => 0,
      1000,
    );

    const result = submitGuess(state, '001', 2000);

    expect(result).toEqual(state);
  });
});

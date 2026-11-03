import { describe, expect, it } from 'vitest';
import { createInitialState } from './create-initial-state';
import { startGame } from './start-game';

describe('startGame', () => {
  it('starts a game with generated secret and provided time', () => {
    const state = createInitialState({ length: 3, base: 10 });

    const result = startGame(state, () => 0, 1000);

    expect(result).toEqual({
      ...state,
      status: 'playing',
      secret: '012',
      startedAt: 1000,
    });
  });

  it('does not modify the original state', () => {
    const state = createInitialState({ length: 3, base: 10 });

    startGame(state, () => 0, 1000);

    expect(state).toEqual(createInitialState({ length: 3, base: 10 }));
  });

  it('preserves game settings', () => {
    const state = createInitialState({ length: 4, base: 16 });

    const result = startGame(state, () => 0, 1000);

    expect(result.settings).toEqual({ length: 4, base: 16 });
  });
});

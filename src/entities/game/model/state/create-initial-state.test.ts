import { describe, expect, it } from 'vitest';
import { createInitialState } from './create-initial-state';

describe('createInitialState', () => {
  it('creates initial game state with provided settings', () => {
    const settings = { length: 4, base: 10 };

    expect(createInitialState(settings)).toEqual({
      settings,
      status: 'setup',
      secret: null,
      history: [],
      startedAt: null,
      finishedAt: null,
    });
  });

  it('does not modify provided settings', () => {
    const settings = { length: 4, base: 10 };

    createInitialState(settings);

    expect(settings).toEqual({ length: 4, base: 10 });
  });
});

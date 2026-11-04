import type { GameState } from '../../../entities/game/model/state/types';
import { createHistoryView } from './history-view';

export const createGameView = (
  length: number,
  onGuess: (guess: string) => GameState | null,
): HTMLElement => {
  const game = document.createElement('section');
  game.className = 'game';
  game.setAttribute('aria-label', 'Game');

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = length;
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Your guess');

  const guessButton = document.createElement('button');
  guessButton.type = 'button';
  guessButton.textContent = 'Guess';

  const result = document.createElement('p');
  const history = document.createElement('div');

  guessButton.addEventListener('click', () => {
    const nextState = onGuess(input.value);

    if (nextState === null) {
      result.textContent = 'Invalid or repeated guess.';
      return;
    }

    const entry = nextState.history[nextState.history.length - 1];

    result.textContent =
      nextState.status === 'won'
        ? `You won! ${entry.bulls} bulls.`
        : `Bulls: ${entry.bulls}, Cows: ${entry.cows}`;

    history.replaceChildren(createHistoryView(nextState.history));
  });

  game.append(input, guessButton, result, history);

  return game;
};

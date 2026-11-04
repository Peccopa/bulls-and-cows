import type { GameState } from '../../../entities/game/model/state/types';
import { createHistoryView } from './history-view';
import { isValidGuess } from '../../../entities/game/model/validation/is-valid-guess';
import { createDigitValidator } from '../../../entities/game/model/validation/create-digit-validator';

export const createGameView = (
  length: number,
  base: number,
  onGuess: (guess: string) => GameState | null,
  onNewGame: () => void,
): HTMLElement => {
  const game = document.createElement('section');
  game.className = 'game';
  game.setAttribute('aria-label', 'Game');

  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = length;
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Your guess');

  const isValidDigit = createDigitValidator(base);

  input.addEventListener('input', () => {
    const digits = [...input.value.toUpperCase()].filter(isValidDigit);

    input.value = [...new Set(digits)].join('');
  });

  const guessButton = document.createElement('button');
  guessButton.type = 'button';
  guessButton.textContent = 'Guess';

  const result = document.createElement('p');
  const history = document.createElement('div');

  guessButton.addEventListener('click', () => {
    const guess = input.value.trim();

    if (!isValidGuess(guess, length, base)) {
      result.textContent = 'Invalid guess. Check the length and digits.';
      return;
    }

    const nextState = onGuess(guess);

    if (nextState === null) {
      result.textContent = 'Invalid or repeated guess.';
      return;
    }

    const entry = nextState.history[nextState.history.length - 1];

    if (
      nextState.status === 'won' &&
      nextState.startedAt !== null &&
      nextState.finishedAt !== null
    ) {
      const attempts = nextState.history.length;
      const duration = Math.floor(
        (nextState.finishedAt - nextState.startedAt) / 1000,
      );

      const minutes = Math.floor(duration / 60);
      const seconds = duration % 60;

      result.textContent =
        `You won! ${entry.bulls} bulls. ` +
        `Attempts: ${attempts}. ` +
        `Time: ${minutes}m ${seconds}s.`;
    } else {
      result.textContent = `Bulls: ${entry.bulls}, Cows: ${entry.cows}`;
    }

    history.replaceChildren(createHistoryView(nextState.history));

    if (nextState.status === 'won') {
      input.disabled = true;
      guessButton.disabled = true;
    }
  });

  const newGameButton = document.createElement('button');
  newGameButton.type = 'button';
  newGameButton.textContent = 'New Game';
  newGameButton.addEventListener('click', onNewGame);

  const guessControls = document.createElement('div');
  guessControls.className = 'guess-controls';
  guessControls.append(input, guessButton);

  game.append(guessControls, result, history, newGameButton);

  return game;
};

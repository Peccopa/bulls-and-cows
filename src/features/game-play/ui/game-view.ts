export const createGameView = (
  length: number,
  onGuess: (guess: string) => string,
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

  guessButton.addEventListener('click', () => {
    result.textContent = onGuess(input.value);
  });

  game.append(input, guessButton, result);

  return game;
};

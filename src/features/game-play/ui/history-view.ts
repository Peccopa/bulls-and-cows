import type { GuessEntry } from '../../../entities/game/model/state/types';

export const createHistoryView = (history: GuessEntry[]): HTMLElement => {
  const container = document.createElement('div');
  container.className = 'game-history';

  const title = document.createElement('h2');
  title.textContent = 'Guess History';

  const list = document.createElement('ol');

  history.forEach((entry) => {
    const item = document.createElement('li');

    item.textContent = `${entry.guess} — Bulls: ${entry.bulls}, Cows: ${entry.cows}`;

    list.append(item);
  });

  container.append(title, list);

  return container;
};

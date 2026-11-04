import type { GameSettings } from '../../../entities/game/model/state/types';
import { getAvailableLengths } from '../../../entities/game/model/settings/get-available-lengths';

export const createSettingsView = (
  onStart: (settings: GameSettings) => void,
): HTMLElement => {
  const settings = document.createElement('section');
  settings.className = 'settings';

  const baseLabel = document.createElement('label');
  baseLabel.textContent = 'Number system';

  const baseSelect = document.createElement('select');

  [2, 8, 10, 16].forEach((base) => {
    const option = document.createElement('option');

    option.value = String(base);
    option.textContent = String(base);

    baseSelect.append(option);
  });

  const lengthLabel = document.createElement('label');
  lengthLabel.textContent = 'Secret length';

  const lengthSelect = document.createElement('select');

  const updateLengths = (): void => {
    const base = Number(baseSelect.value);
    const lengths = getAvailableLengths(base);

    lengthSelect.replaceChildren();

    lengths.forEach((length) => {
      const option = document.createElement('option');

      option.value = String(length);
      option.textContent = String(length);

      lengthSelect.append(option);
    });
  };

  baseSelect.addEventListener('change', updateLengths);

  updateLengths();

  const startButton = document.createElement('button');
  startButton.type = 'button';
  startButton.textContent = 'Start Game';

  startButton.addEventListener('click', () => {
    onStart({
      base: Number(baseSelect.value),
      length: Number(lengthSelect.value),
    });
  });

  baseLabel.append(baseSelect);
  lengthLabel.append(lengthSelect);
  settings.append(baseLabel, lengthLabel, startButton);

  return settings;
};

export const setSettingsDisabled = (
  settings: HTMLElement,
  disabled: boolean,
): void => {
  settings
    .querySelectorAll<HTMLSelectElement | HTMLButtonElement>('select, button')
    .forEach((control) => {
      control.disabled = disabled;
    });
};

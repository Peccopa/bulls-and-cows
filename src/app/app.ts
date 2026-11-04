import { createInitialState } from '../entities/game/model/state/create-initial-state';
import { startGame } from '../entities/game/model/state/start-game';
import type { GameState } from '../entities/game/model/state/types';
import { createSettingsView } from '../features/game-settings/ui/settings-view';

export const createApp = (): HTMLElement => {
  const app = document.createElement('main');
  app.className = 'app';

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  let gameState: GameState | null = null;

  const game = document.createElement('section');
  game.className = 'game';
  game.setAttribute('aria-label', 'Game');

  const settings = createSettingsView((gameSettings) => {
    const initialState = createInitialState(gameSettings);

    gameState = startGame(initialState);

    game.textContent = `Game started! Secret length: ${gameState.settings.length}`;
  });

  app.append(title, settings, game);

  return app;
};

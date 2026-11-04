import { createInitialState } from '../entities/game/model/state/create-initial-state';
import { startGame } from '../entities/game/model/state/start-game';
import { submitGuess } from '../entities/game/model/state/submit-guess';
import type { GameState } from '../entities/game/model/state/types';
import { createGameView } from '../features/game-play/ui/game-view';
import { createSettingsView } from '../features/game-settings/ui/settings-view';

export const createApp = (): HTMLElement => {
  const app = document.createElement('main');
  app.className = 'app';

  const title = document.createElement('h1');
  title.textContent = 'Bulls and Cows';

  let gameState: GameState | null = null;

  let game = document.createElement('section');
  game.className = 'game';

  const settings = createSettingsView((gameSettings) => {
    const initialState = createInitialState(gameSettings);

    gameState = startGame(initialState);

    console.log('Secret:', gameState.secret);

    const gameView = createGameView(
      gameSettings.length,
      gameSettings.base,
      (guess) => {
        if (gameState === null) {
          return null;
        }

        const nextState = submitGuess(gameState, guess);

        if (nextState === gameState) {
          return null;
        }

        gameState = nextState;

        return nextState;
      },
    );

    game.replaceWith(gameView);
    game = gameView;
  });

  app.append(title, settings, game);

  return app;
};

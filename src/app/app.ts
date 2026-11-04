import {
  loadRecords,
  saveRecords,
} from '../entities/game/model/statistics/record-storage';
import { createInitialState } from '../entities/game/model/state/create-initial-state';
import { startGame } from '../entities/game/model/state/start-game';
import { submitGuess } from '../entities/game/model/state/submit-guess';
import { sortRecords } from '../entities/game/model/statistics/sort-records';
import { createGameView } from '../features/game-play/ui/game-view';
import { createSettingsView } from '../features/game-settings/ui/settings-view';

import type { GameRecord, GameState } from '../entities/game/model/state/types';

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

        if (nextState.status === 'won') {
          const { startedAt, finishedAt } = nextState;

          if (startedAt !== null && finishedAt !== null) {
            const record: GameRecord = {
              settings: nextState.settings,
              attempts: nextState.history.length,
              duration: finishedAt - startedAt,
              achievedAt: finishedAt,
            };

            const records = loadRecords();
            saveRecords(sortRecords([...records, record]));
          }
        }

        return nextState;
      },
      () => {
        game.replaceWith(settings);
        game = settings;
      },
    );

    game.replaceWith(gameView);
    game = gameView;
  });

  app.append(title, settings, game);

  return app;
};

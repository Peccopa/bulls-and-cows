export type GameSettings = {
  length: number;
  base: number;
};

export type GuessEntry = {
  guess: string;
  bulls: number;
  cows: number;
};

export type GameStatus = 'setup' | 'playing' | 'won';

export type GameState = {
  settings: GameSettings;
  status: GameStatus;
  secret: string | null;
  history: GuessEntry[];
  startedAt: number | null;
  finishedAt: number | null;
};

export type GameRecord = {
  settings: GameSettings;
  attempts: number;
  duration: number;
  achievedAt: number;
};

import type { GameRecord } from '../../../entities/game/model/state/types';

const formatDuration = (duration: number): string => {
  const totalSeconds = Math.floor(duration / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
};

export const createLeaderboardView = (records: GameRecord[]): HTMLElement => {
  const section = document.createElement('section');
  section.className = 'leaderboard';

  const heading = document.createElement('h2');
  heading.textContent = 'Leaderboard';

  section.append(heading);

  if (records.length === 0) {
    const emptyMessage = document.createElement('p');
    emptyMessage.textContent = 'No records yet';

    section.append(emptyMessage);

    return section;
  }

  const table = document.createElement('table');

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');

  ['Place', 'Base', 'Length', 'Attempts', 'Time'].forEach((text) => {
    const th = document.createElement('th');
    th.textContent = text;
    headerRow.append(th);
  });

  thead.append(headerRow);

  const tbody = document.createElement('tbody');

  records.forEach((record, index) => {
    const row = document.createElement('tr');

    const values = [
      String(index + 1),
      String(record.settings.base),
      String(record.settings.length),
      String(record.attempts),
      formatDuration(record.duration),
    ];

    values.forEach((value) => {
      const cell = document.createElement('td');
      cell.textContent = value;
      row.append(cell);
    });

    tbody.append(row);
  });

  table.append(thead, tbody);
  section.append(table);

  return section;
};

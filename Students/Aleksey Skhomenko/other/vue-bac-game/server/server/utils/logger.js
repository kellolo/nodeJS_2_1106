const fs = require('fs');
const dayjs = require('dayjs');
const writer = require('./writer');

const fileUrl = './server/logs/logs.json';

module.exports = async (game) => {
  await fs.readFile(fileUrl, 'utf-8', (err, data) => {
    try {
      if (!err) {
        const logs = !data || data.length === 0 ? [] : JSON.parse(data);
        const log = {
          ...game,
          win: game.turns[game.turns.length - 1].win,
          id: `game-${(logs.length + 1).toString().padStart(4, '0')}`,
          serverDate: dayjs().format('DD MM YYYY, h:mm:ss'),
        };
        console.log(
          `Game log saved:
          id: ${log.id},
          ${log.win ? 'WIN' : 'LOSE'},
          serverEndTime: ${log.serverDate},
          localEndTime: ${log.localEndDate}.`,
        );
        logs.push(log);
        writer(fileUrl, logs);

        return true;
      }
    } catch (error) {
      console.log(error);
    }
    return false;
  });
};

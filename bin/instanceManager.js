const child_process = require('child_process');
const fs = require('fs');
const path = require('path');
const Promise = require('bluebird');

function run(sqliteDbPath) {
  return new Promise((resolve, reject) => {
    if (!sqliteDbPath) {
      return reject('No sqliteDBPath provided');
    }

    const resolvedsqliteDbPath = path.resolve(sqliteDbPath);

    if (!fs.existsSync(resolvedsqliteDbPath)) {
      return reject("Provided database files doesn't exist");
    }

    const serverProcess = child_process.fork('dist/server.js', [], {
      env: {
        SQLITEDBPATH: resolvedsqliteDbPath
      }
    });

    resolve(serverProcess.pid);
  });
}

module.exports = {
  run
};

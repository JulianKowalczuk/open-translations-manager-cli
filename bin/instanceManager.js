const child_process = require('child_process');
const fs = require('fs');
const path = require('path');

function run(sqliteDbPath, callback) {
  if (!sqliteDbPath) {
    return callback('No sqliteDBPath provided');
  }

  const resolvedsqliteDbPath = path.resolve(sqliteDbPath);

  if (!fs.existsSync(resolvedsqliteDbPath)) {
    return callback("Provided database files doesn't exist");
  }

  const serverProcess = child_process.fork('dist/server.js', [], {
    env: {
      SQLITEDBPATH: resolvedsqliteDbPath
    }
  });

  callback(undefined, serverProcess.pid);
}

module.exports = {
  run
};

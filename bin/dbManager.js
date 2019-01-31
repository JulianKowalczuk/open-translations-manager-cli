const child_process = require('child_process');
const Promise = require('bluebird');

function init() {
  return new Promise((resolve, reject) => {
    child_process
      .exec('npm run db-init', err => {
        if (err) {
          reject(err);
        }
      })
      .on('exit', code => {
        (code === 1 ? resolve : reject)();
      });
  });
}

module.exports = {
  init
};

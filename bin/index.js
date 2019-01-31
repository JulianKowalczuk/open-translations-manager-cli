#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const dbManager = require('./dbManager');
const instanceManager = require('./instanceManager');
const pkg = require(path.join(__dirname, '../package.json'));

program.version(pkg.version).description(chalk.blue('Open Translations Manager'));

program.command('init').action(() => {
  dbManager
    .init()
    .then(() => {
      console.log(chalk.green('Database file initialized'));
      process.exit(1);
    })
    .catch(err => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(1);
      }
    });
});

program.command('*').action(() => {
  const [maybePath] = program.args;

  instanceManager
    .run(maybePath)
    .then(pid => {
      console.log('PID: ', pid);
    })
    .catch(err => {
      if (err) {
        console.log(chalk.red(err));
        process.exit(1);
      }
    });
});

program.parse(process.argv);

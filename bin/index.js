#!/usr/bin/env node

const path = require('path');
const program = require('commander');
const chalk = require('chalk');

const instanceManager = require('./instanceManager');
const pkg = require(path.join(__dirname, '../package.json'));

program.version(pkg.version).description(chalk.blue('Open Translations Manager'));
program.parse(process.argv);

const [maybePath] = program.args;

instanceManager.run(maybePath, (err, pid) => {
  if (err) {
    console.log(chalk.red(err));

    process.exit(1);
  } else {
    console.log('PID: ', pid);
  }
});

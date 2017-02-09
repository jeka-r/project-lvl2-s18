#!/usr/bin/env node

import commander from 'commander';
import selector from '../selector';

const program = commander;

program
  .version('0.2.7')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'default')
  .arguments('<first_config> <second_config>');

program.parse(process.argv);

if (program.args[1] && program.args[0]) {
  selector(program.args[0], program.args[1]);
} else {
  console.log('no correct arguments given!');
}

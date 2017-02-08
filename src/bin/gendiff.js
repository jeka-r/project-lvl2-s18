#!/usr/bin/env node
import fs from 'fs';
import endswith from 'lodash.endswith';
import commander from 'commander';
import jsonParser from '../parsers/json-parser';

const program = commander;

program
  .version('0.2.7')
  .usage('[options] <first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'default')
  .arguments('<cmd1> <cmd2>');

program.parse(process.argv);

if (program.args[1] && program.args[0]) {
  const before = fs.readFileSync(program.args[0], 'utf8');
  const after = fs.readFileSync(program.args[1], 'utf8');
  if (endswith(program.args[0], 'json') && endswith(program.args[1], 'json')) {
    console.log(jsonParser(before, after));
  }
} else {
  console.error('no correct arguments given!');
}

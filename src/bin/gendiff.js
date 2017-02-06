#!/usr/bin/env node
import commander from 'commander';

const program = commander;

program
  .version('0.1.0')
  .usage('[options] <first_config> <second_config>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'default');

program.parse(process.argv);

console.log('---START GENDIFF--->');

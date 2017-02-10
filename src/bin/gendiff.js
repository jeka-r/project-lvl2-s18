#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../../';

commander
  .version('0.2.7')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format', 'default')
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig) => console.log(genDiff(firstConfig, secondConfig)));

commander.parse(process.argv);

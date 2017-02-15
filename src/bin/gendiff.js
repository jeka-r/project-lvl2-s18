#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../';

commander
  .version('1.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'Output format')
  .arguments('<first_config> <second_config>')
  .action((firstConfig, secondConfig, options) => {
    const result = genDiff(firstConfig, secondConfig, options.format);
    console.log(result);
  })
  .parse(process.argv);

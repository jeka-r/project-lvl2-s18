import fs from 'fs';
import jsonParser from '../src/parsers/json-parser';

test('calculator of JSON format differences #1', () => {
  const result = '{}';
  const path1 = '';
  const path2 = '';
  expect(jsonParser(path1, path2)).toBe(result);
});

test('calculator of JSON format differences #2', () => {
  const result = '{\n  - host: hexlet.io\n  - timeout: 50\n  - proxy: 123.234.53.22\n}';
  const path1 = fs.readFileSync('./__tests__/sampleFiles/before.json', 'utf8');
  const path2 = '';
  expect(jsonParser(path1, path2)).toBe(result);
});

test('calculator of JSON format differences #3', () => {
  const result = '{\n  + timeout: 20\n  + verbose: true\n  + host: hexlet.io\n}';
  const path1 = '';
  const path2 = fs.readFileSync('./__tests__/sampleFiles/after.json', 'utf8');
  expect(jsonParser(path1, path2)).toBe(result);
});

test('calculator of JSON format differences #4', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = fs.readFileSync('./__tests__/sampleFiles/before.json', 'utf8');
  const path2 = fs.readFileSync('./__tests__/sampleFiles/after.json', 'utf8');
  expect(jsonParser(path1, path2)).toBe(result);
});

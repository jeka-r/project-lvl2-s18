import genDiff from '../src/general-logic';

test('compare differences #1', () => {
  const result = '{}';
  const data1 = '';
  const data2 = '';
  expect(genDiff(data1, data2)).toBe(result);
});

test('compare differences #2', () => {
  const result = '{\n  - host: hexlet.io\n  - timeout: 50\n  - proxy: 123.234.53.22\n}';
  const data1 = { host: 'hexlet.io', timeout: '50', proxy: '123.234.53.22' };
  const data2 = '';
  expect(genDiff(data1, data2)).toBe(result);
});

test('compare differences #3', () => {
  const result = '{\n  + timeout: 20\n  + verbose: true\n  + host: hexlet.io\n}';
  const data1 = '';
  const data2 = { timeout: '20', verbose: 'true', host: 'hexlet.io' };
  expect(genDiff(data1, data2)).toBe(result);
});

test('compare differences #4', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const data1 = { host: 'hexlet.io', timeout: '50', proxy: '123.234.53.22' };
  const data2 = { timeout: '20', verbose: 'true', host: 'hexlet.io' };
  expect(genDiff(data1, data2)).toBe(result);
});

import genDiff from '../';

test('compare of JSON format differences', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = './__tests__/samplefiles/before.json';
  const path2 = './__tests__/samplefiles/after.json';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of YMAL format differences', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = './__tests__/samplefiles/before.yml';
  const path2 = './__tests__/samplefiles/after.yml';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of INI format differences', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = './__tests__/samplefiles/before.ini';
  const path2 = './__tests__/samplefiles/after.ini';
  expect(genDiff(path1, path2)).toBe(result);
});

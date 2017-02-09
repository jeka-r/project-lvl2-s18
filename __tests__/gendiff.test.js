import genDiff from '../src/genDiff';

test('compare of JSON format differences', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = './__tests__/sampleFiles/before.json';
  const path2 = './__tests__/sampleFiles/after.json';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of YMAL format differences', () => {
  const result = '{\n    host: hexlet.io\n  + timeout: 20\n  - timeout: 50\n  - proxy: 123.234.53.22\n  + verbose: true\n}';
  const path1 = './__tests__/sampleFiles/before.yml';
  const path2 = './__tests__/sampleFiles/after.yml';
  expect(genDiff(path1, path2)).toBe(result);
});

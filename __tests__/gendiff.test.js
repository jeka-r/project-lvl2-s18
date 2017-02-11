import genDiff from '../src';

const flatExpected = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;

test('compare of JSON flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.json';
  const path2 = './__tests__/samplefiles/after.json';
  expect(genDiff(path1, path2)).toBe(flatExpected);
});

test('compare of YMAL flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.yml';
  const path2 = './__tests__/samplefiles/after.yml';
  expect(genDiff(path1, path2)).toBe(flatExpected);
});

test('compare of INI flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.ini';
  const path2 = './__tests__/samplefiles/after.ini';
  expect(genDiff(path1, path2)).toBe(flatExpected);
});

const reqursiveExpected = `{
    common: {
        setting1: Value 1
      - setting2: 200
        setting3: true
      - setting6: {
            "key": "value"
        }
      + setting4: blah blah
      + setting5: {
            "key5": "value5"
        }
    }
    group1: {
      + baz: bars
      - baz: bas
        foo: bar
    }
  - group2: {
        "abc": "12345"
    }
  + group3: {
        "fee": "100500"
    }
}`;

test('compare of JSON recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.json';
  const path2 = './__tests__/samplefiles/after-recur.json';
  expect(genDiff(path1, path2)).toBe(reqursiveExpected);
});

test('compare of YMAL recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.yml';
  const path2 = './__tests__/samplefiles/after-recur.yml';
  expect(genDiff(path1, path2)).toBe(reqursiveExpected);
});

test('compare of INI recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.ini';
  const path2 = './__tests__/samplefiles/after-recur.ini';
  expect(genDiff(path1, path2)).toBe(reqursiveExpected);
});

const plainExpected = `Property 'common.setting2' was removed
Property 'common.setting6' was removed
Property 'common.setting4' was added with value: blah blah
Property 'common.setting5' was added with complex value
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
Property 'group3' was added with complex value`;

test('Plain output format of compare of JSON recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.json';
  const path2 = './__tests__/samplefiles/after-recur.json';
  expect(genDiff(path1, path2, 'plain')).toBe(plainExpected);
});

test('Plain output format of compare of YAML recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.yml';
  const path2 = './__tests__/samplefiles/after-recur.yml';
  expect(genDiff(path1, path2, 'plain')).toBe(plainExpected);
});

test('Plain output format of compare of INI recursive format differences', () => {
  const path1 = './__tests__/samplefiles/before-recur.ini';
  const path2 = './__tests__/samplefiles/after-recur.ini';
  expect(genDiff(path1, path2, 'plain')).toBe(plainExpected);
});

const jsonExpected = `[
  {
    "status": "unchanged",
    "key": "host",
    "value": "hexlet.io"
  },
  {
    "status": "updated",
    "key": "timeout",
    "addedValue": "20",
    "removedValue": "50"
  },
  {
    "status": "removed",
    "key": "proxy",
    "value": "123.234.53.22"
  },
  {
    "status": "added",
    "key": "verbose",
    "value": true
  }
]`;

test('JSON output format of compare of JSON flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.json';
  const path2 = './__tests__/samplefiles/after.json';
  expect(genDiff(path1, path2, 'json')).toBe(jsonExpected);
});

test('JSON output format of compare of YAML flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.yml';
  const path2 = './__tests__/samplefiles/after.yml';
  expect(genDiff(path1, path2, 'json')).toBe(jsonExpected);
});

test('JSON output format of compare of INI flat format differences', () => {
  const path1 = './__tests__/samplefiles/before.ini';
  const path2 = './__tests__/samplefiles/after.ini';
  expect(genDiff(path1, path2, 'json')).toBe(jsonExpected);
});

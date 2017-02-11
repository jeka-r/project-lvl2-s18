import genDiff from '../src';

test('compare of JSON flat format differences', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  const path1 = './__tests__/samplefiles/before.json';
  const path2 = './__tests__/samplefiles/after.json';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of JSON recursive format differences', () => {
  const result = `{
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
  const path1 = './__tests__/samplefiles/before-recur.json';
  const path2 = './__tests__/samplefiles/after-recur.json';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of YMAL flat format differences', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  const path1 = './__tests__/samplefiles/before.yml';
  const path2 = './__tests__/samplefiles/after.yml';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of YMAL recursive format differences', () => {
  const result = `{
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
  const path1 = './__tests__/samplefiles/before-recur.yml';
  const path2 = './__tests__/samplefiles/after-recur.yml';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of INI flat format differences', () => {
  const result = `{
    host: hexlet.io
  + timeout: 20
  - timeout: 50
  - proxy: 123.234.53.22
  + verbose: true
}`;
  const path1 = './__tests__/samplefiles/before.ini';
  const path2 = './__tests__/samplefiles/after.ini';
  expect(genDiff(path1, path2)).toBe(result);
});

test('compare of INI recursive format differences', () => {
  const result = `{
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
  const path1 = './__tests__/samplefiles/before-recur.ini';
  const path2 = './__tests__/samplefiles/after-recur.ini';
  expect(genDiff(path1, path2)).toBe(result);
});

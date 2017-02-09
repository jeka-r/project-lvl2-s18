import fs from 'fs';
import path from 'path';
import genDiff from './genDiff';
import jsonToArr from './parsers/jsonToArr';
import ymlToArr from './parsers/ymlToArr';

export default (before, after) => {
  const extBefore = path.extname(before);
  const extAfter = path.extname(after);
  const dataBefore = fs.readFileSync(before, 'utf8');
  const dataAfter = fs.readFileSync(after, 'utf8');
  let preparedDataBefore;
  let preparedDataAfter;

  if (extBefore === '.json' && extAfter === '.json') {
    preparedDataBefore = jsonToArr(dataBefore);
    preparedDataAfter = jsonToArr(dataAfter);
    return console.log(genDiff(preparedDataBefore, preparedDataAfter));
  }
  if (extBefore === '.yml' && extAfter === '.yml') {
    preparedDataBefore = ymlToArr(dataBefore);
    preparedDataAfter = ymlToArr(dataAfter);
    return console.log(genDiff(preparedDataBefore, preparedDataAfter));
  }
  return 'no correct arguments given!';
};

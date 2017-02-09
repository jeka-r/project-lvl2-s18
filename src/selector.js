import fs from 'fs';
import path from 'path';
import jsonParser from './parsers/json-parser';
import ymlParser from './parsers/yml-parser';

export default (before, after) => {
  const extBefore = path.extname(before);
  const extAfter = path.extname(after);
  const dataBefore = fs.readFileSync(before, 'utf8');
  const dataAfter = fs.readFileSync(after, 'utf8');

  if (extBefore === '.json' && extAfter === '.json') {
    return console.log(jsonParser(dataBefore, dataAfter));
  }
  if (extBefore === '.yml' && extAfter === '.yml') {
    return console.log(ymlParser(dataBefore, dataAfter));
  }
  return 'no correct arguments given!';
};

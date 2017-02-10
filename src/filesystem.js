import fs from 'fs';
import path from 'path';
import _trimstart from 'lodash.trimstart';

export function getFileData(pathToFile) {
  return fs.readFileSync(pathToFile, 'utf8');
}

export function getType(pathBefore, pathAfter) {
  const extBefore = path.extname(pathBefore);
  const extAfter = path.extname(pathAfter);
  if (extBefore === extAfter) {
    return _trimstart(extBefore, '.');
  }
  return console.log('no correct arguments given!');
}

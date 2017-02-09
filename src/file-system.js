import fs from 'fs';
import path from 'path';

export function getFileData(pathToFile) {
  return fs.readFileSync(pathToFile, 'utf8');
}

export function getType(pathBefore, pathAfter) {
  const extBefore = path.extname(pathBefore);
  const extAfter = path.extname(pathAfter);
  if (extBefore === extAfter) {
    return extBefore;
  }
  return 'no correct arguments given!';
}

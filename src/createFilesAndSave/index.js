import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

export const createFilesAndSave = async (files, folderPath, name) => {
  const futureComponentFolder = path.join(folderPath, name);
  if (fsSync.existsSync(futureComponentFolder)) {
    throw new Error(`Folder => ${futureComponentFolder} already exists`);
  }
  await fs.mkdir(futureComponentFolder);

  const fileNames = Object.keys(files);

  const promises = fileNames.map(fileName => {
    const newFilePath = path.join(futureComponentFolder, fileName);
    return fs.writeFile(newFilePath, files[fileName]);
  });

  const all = await Promise.all(promises);

  if (all) {
    return true;
  }
  return false;
}
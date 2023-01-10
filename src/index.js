#!/usr/bin/env node

import { createFilesAndSave } from './createFilesAndSave/index.js';
import { convensionName } from './helpers/convensionName.js';
import { parseTemplate } from './parsingTemplate/index.js';

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';


/**
 * requied args name
*/
const startCLI = async () => {
  const argv = yargs(hideBin(process.argv)).argv;

  let currentFolder = process.cwd();
  let name = null;

  if (argv.h) {
    console.info('Available this type of args \n 01. --h for help \n 02. --name=wewe for component name. \n 03. --path=/src/helpers for extend path')
    process.exit();
  }
  if (!argv.name) {
    throw new Error('Argument name is required')
  } else {
    name = argv.name;
  }
  if (argv.path) {
    currentFolder = path.join(process.cwd(), argv.path);
  }

  const componentName = convensionName(name);
  const parsedRes = await parseTemplate(componentName);
  await createFilesAndSave(parsedRes, currentFolder, componentName);
};
startCLI();

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PATH_TO_FC_TEMPLATE = {
  component: path.join(
    __dirname,
    '../',
    'fc-template',
    'template.component.tsx'
  ),
  index: path.join(__dirname, '../', 'fc-template', 'index.tsx'),
  css: path.join(__dirname, '../', 'fc-template', 'template.module.css'),
  types: path.join(__dirname, '../', 'fc-template', 'template.types.ts'),
};

const keywordComponentName = '{{componentName}}';
const keywordComponentNameProps = '{{componentNameProps}}';

const parsePipe =
  (...fns) =>
  (str) =>
    fns.reduce((acc, fn) => fn(acc), str);

export const parseTemplate = async (componentName) => {
  const componentPROPS = componentName + 'Props';
  const componentFileRaw = await fs.readFile(PATH_TO_FC_TEMPLATE.component, {
    encoding: 'utf-8',
  });
  const cssmoduleFileRaw = await fs.readFile(PATH_TO_FC_TEMPLATE.css, {
    encoding: 'utf-8',
  });
  const indexFileRaw = await fs.readFile(PATH_TO_FC_TEMPLATE.index, {
    encoding: 'utf-8',
  });
  const typesFileRaw = await fs.readFile(PATH_TO_FC_TEMPLATE.types, {
    encoding: 'utf-8',
  });

  const parsingPipe = parsePipe(
    (str) => str.split(keywordComponentName).join(componentName),
    (str) => str.split(keywordComponentNameProps).join(componentPROPS)
  );

  const componentParsedRes = parsingPipe(componentFileRaw);
  const indexParsedRes = parsingPipe(indexFileRaw);
  const typesParsedRes = parsingPipe(typesFileRaw);

  //name files to save;
  const componentNewFileName = `${componentName}.component.tsx`;
  const moduleCssNewFileName = `${componentName}.module.css`;
  const indexNewFileName = `index.tsx`;
  const typesNewFileName = `${componentName}.types.ts`;

  return {
    [componentNewFileName]: componentParsedRes,
    [moduleCssNewFileName]: cssmoduleFileRaw,
    [indexNewFileName]: indexParsedRes,
    [typesNewFileName]: typesParsedRes,
  };
};

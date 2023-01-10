
import { FC } from 'react';
import { {{componentNameProps}} } from './{{componentName}}.types';

import css from './{{componentName}}.module.css';

export const {{componentName}}: FC<{{componentNameProps}}> = () => {

  return <div className={css.wrapper}>{{componentName}}</div>;
};
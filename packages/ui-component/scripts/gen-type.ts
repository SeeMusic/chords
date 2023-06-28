import { readdirSync, writeFileSync } from 'node:fs';
import fs from 'node:fs';

const formatComponentType = (dir: string[]) => {
  return `
// For this project development
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // GlobalComponents for Volar
    ${dir
    .map((i) => `${i}: typeof import('./components/${i}')['${i}']`)
    .join('\n    ')}
  }
}

export {};
`;
};

export const genComponentsType = () => {
  const fileName = './src/volar.d.ts';
  const ret = readdirSync('./src/components/');
  // components 下的所有组件文件夹
  const dir = ret.filter((i) => !(i as unknown as string).includes('.'));

  fs.access(fileName, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.rmSync(fileName);
      // const str = formatComponentType(dir);
      // appendFileSync(fileName, str, 'utf-8');
    }
    const str = formatComponentType(dir);
    writeFileSync(fileName, str, 'utf-8');
  });
};

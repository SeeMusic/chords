import { readdirSync, writeFileSync, access, constants, rmSync } from 'node:fs';

const formatComponentType = (dir: string[], replaceComponent: Record<string, string>) => {
  return `
// For this project development
import '@vue/runtime-core';

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    // GlobalComponents for Volar
    ${dir.map(i => {
      const compName = replaceComponent[i];
      if (compName) {
        return `${i}: typeof import('element-plus/es')['${compName}']`;
      }
      return `${i}: typeof import('./components/${i}')['${i}']`;
    }).join('\n    ')}
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

  access(fileName, constants.F_OK, (err) => {
    if (!err) {
      rmSync(fileName);
      // const str = formatComponentType(dir);
      // appendFileSync(fileName, str, 'utf-8');
    }
    const str = formatComponentType(dir, { SopInput: 'ElInput' });
    writeFileSync(fileName, str, 'utf-8');
  });
};

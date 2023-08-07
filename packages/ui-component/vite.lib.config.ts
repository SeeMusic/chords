import { promises, readFileSync } from 'node:fs';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import MagicString from 'magic-string';
import mkdirp from 'mkdirp';
import dts from 'vite-plugin-dts';
import pkg from './package.json';
import { genComponentsType } from './scripts/gen-type';

genComponentsType();

export default defineConfig(async ({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd()));

  return {
    build: {
      outDir: 'lib',
      minify: false,
      sourcemap: true,
      lib: {
        entry: 'src/entry.ts',
        name: 'UIComponents'
      },
      rollupOptions: {
        external: ['vue', /\.scss$/, 'vue-router', 'element-plus', '@iconify/vue'],
        output: [
          {
            format: 'es',
            entryFileNames: '[name].mjs',
            preserveModules: true,
            preserveModulesRoot: 'src',
            globals: {
              vue: 'Vue',
              'vue-router': 'VueRouter',
              'element-plus': 'ElementPlus',
              '@iconify/vue': 'Iconify'
            }
          }
        ]
      }
    },
    plugins: [
      vue(),
      vueJsx({ optimize: false, enableObjectSlots: true }),
      dts({
        include: 'src',
        staticImport: true,
        skipDiagnostics: true,
        beforeWriteFile: (filePath: string, content: string) => {
          filePath = filePath.replace('lib/src', 'lib');
          if (filePath.endsWith('framework.d.ts')) {
            const shims = readFileSync(
              filePath.replace(
                'lib/framework.d.ts',
                'src/shims.d.ts'
              ),
              'utf-8'
            );
            content += `\n\n${shims}`;
          }
          return {
            filePath,
            content
          };
        }
      }),
      {
        name: 'vite:scss-extract',
        apply: 'build',
        renderChunk(code) {
          const srcRE = /\.\.\/src\/components/g;
          const entryRE = /\.\/src/g;

          if (code.match(srcRE)) {
            // const s = new MagicString(code).replace(RE, './styles');
            // const s = new MagicString(code).replace(srcRE, '../../../ui-components/lib');
            const s = new MagicString(code).replace(srcRE, '.');
            return {
              code: s.toString(),
              map: s.generateMap({ hires: true })
            };
          } else if (code.match(entryRE)) {
            const s = new MagicString(code).replace(entryRE, '.');
            return {
              code: s.toString(),
              map: s.generateMap({ hires: true })
            };
          }
          return undefined;
        },
        async buildEnd() {
          async function matchScss(dir: string, fn: (filename: string) => void) {
            const files = await promises.readdir(dir);
            files.forEach(filename => {
              filename = path.join(dir, filename);
              promises.stat(filename).then(stat => {
                if (stat.isDirectory()) {
                  matchScss(filename, fn);
                } else if (/\.scss$/.test(filename)) {
                  fn && fn(filename);
                }
              });
            });
          }

          matchScss('src', async filename => {
            const out = path.parse(filename.replace('src', 'lib'));
            // 连续写入多级的目录或者文件
            mkdirp.sync(out.dir);

            promises.writeFile(
              path.join(out.dir, out.name + out.ext),
              await promises.readFile(filename, 'utf8'),
              'utf8'
            );
          });
        }
      }
    ],
    define: {
      __UI_NAME__: JSON.stringify(pkg.name),
      __UI_VERSION__: JSON.stringify(pkg.version)
    }
  };
});

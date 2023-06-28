import { toKebabCase, toPascalCase } from './utils';

/**
 * Resolver for unplugin-vue-components and unplugin-auto-import
 *
 * @param options
 */
export function UIComponentsResolver(options: { prefix: string }) {
  const { prefix } = options;
  return [
    {
      type: 'component' as const,
      resolve: (name: string) => {
        const kebab = toKebabCase(name);
        if (kebab.split('-')[0] !== prefix) return;
        return {
          name: toPascalCase(name),
          from: '@seemusic/ui-components/components'
        };
      }
    }
  ];
}

import type { App } from 'vue';

export * from './resolver';

export interface SeeMusicOptions {
  componentPrefix?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components?: Record<string, any>
}

export function createSeeMusic(options: SeeMusicOptions = {}) {
  const install = (app: App) => {

    const {
      componentPrefix = '',
      components = {}
    } = options;

    for (const key in components) {
      app.component(`${componentPrefix}${key}`, components[key]);
    }


    // for (const key in directives) {
    //   app.directive(key, directives[key])
    // }

  };

  return { install };
}

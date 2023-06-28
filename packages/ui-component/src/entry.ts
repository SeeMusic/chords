import './styles/main.scss';
import * as components from './components';
import * as composables from './composables';
import * as utils from './utils';
import { createSeeMusic as _createSeeMusic } from './framework';

export function createSeeMusic() {
  return _createSeeMusic({ components });
}

export {
  components,
  composables,
  utils
};

export * from './composables';
export * from './resolver';

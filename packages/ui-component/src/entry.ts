import './styles/main.scss';
import * as components from './components';
import * as utils from './utils';
import { createSeeMusic as _createSeeMusic } from './framework';

export function createSeeMusic() {
  return _createSeeMusic({ components });
}

export {
  components,
  utils
};

export * from './resolver';

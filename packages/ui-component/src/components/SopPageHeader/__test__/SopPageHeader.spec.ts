import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopPageHeader } from '../index';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopPageHeader,
    },
    template,
    ...options,
  });

const pageHeader = _mount(
  `<SopPageHeader
    title="页面标题"
  >
    <template #opt>
      <div id="opt">opt slots</div>
    </template>
  </SopPageHeader>
  `
);

describe('page header props', () => {
  it('should be render title', () => {
    const title = pageHeader.find('.sop-page-title');
    expect(title?.text()).toBe('页面标题');
  });
});

describe('page header slots', () => {
  it('should be render opt slot', () => {
    const title = pageHeader.find('#opt');
    expect(title?.text()).toBe('opt slots');
  });
});

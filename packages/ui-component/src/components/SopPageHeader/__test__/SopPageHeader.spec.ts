import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopPageHeader } from '../index';

const wrapper = mount({
  components: {
    SopPageHeader
  },
  template: `
    <SopPageHeader
      title="页面标题"
      :back="-1"
    >
      <template #opt>
        <div id="opt">opt slots</div>
      </template>
    </SopPageHeader>
  `
});

describe('SopPageHeader', () => {
  it('should be render title', () => {
    const title = wrapper.find('.sop-page__hd');
    expect(title?.text()).toBe('返回/页面标题opt slots');
  });

  it('should be render opt slot', () => {
    const title = wrapper.find('#opt');
    expect(title?.text()).toBe('opt slots');
  });

  it('router back', () => {
    const back = wrapper.find('.sop-page-path a').text();
    expect(back).toBe('返回');
  });
});

import { describe, expect, it } from 'vitest';
import { mount, shallowMount } from '@vue/test-utils';
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

  it('[string, number, function, object] back', () => {
    const numberWrapper = shallowMount(SopPageHeader, { props: { title: 'Number', back: -1 } });
    const stringWrapper = shallowMount(SopPageHeader, { props: { title: 'String', back: '/index' } });
    const functionWrapper = shallowMount(SopPageHeader, { props: { title: 'Function', back: () => ({}) } });
    const objectWrapper = shallowMount(SopPageHeader, { props: { title: 'Object', back: { name: 'Index' } } });

    const numberBackText = numberWrapper.find('.sop-page-path a');
    const stringBackText = stringWrapper.find('.sop-page-path a');
    const functionBackText = functionWrapper.find('.sop-page-path a');
    const objectBackText = objectWrapper.find('.sop-page-path a');

    expect(numberBackText.text()).toBe('返回');
    expect(stringBackText.text()).toBe('返回');
    expect(functionBackText.text()).toBe('返回');
    expect(objectBackText.text()).toBe('返回');
  });
});

import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopFilterForm } from '../index';

const wrapper = mount({
  components: {
    SopFilterForm
  },
  template: `
    <SopFilterForm>
      <template #opt>
        action
      </template>
      content
    </SopFilterForm>
  `
});

describe('SopFilterForm', () => {

  it('expand and retract', async () => {
    wrapper.find('.sop-filter__toggle a').trigger('click');
    await nextTick();
    const text = wrapper.find('.sop-filter__toggle a').text();
    expect(text).toBe('展开');
  });

  it('slot', async () => {
    wrapper.find('.sop-filter__toggle a').trigger('click');
    await nextTick();

    const content = wrapper.find('.sop-filter__content').text();
    const opt = wrapper.find('.sop-filter__operation').text();
    expect(content).toBe('content');
    expect(opt).toBe('action');
  });

});

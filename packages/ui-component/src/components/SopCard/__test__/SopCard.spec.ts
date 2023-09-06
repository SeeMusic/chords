import { ElButton } from 'element-plus';
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopCard } from '../index';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopCard,
      ElButton
    },
    template,
    ...options,
  });

const wrapper = _mount(
  `
    <SopCard title="卡片标题" >
      <template #opt>
        <ElButton type="primary" size="small">action</ElButton>
      </template>
      <template #footer>
        <ElButton type="primary" size="small">submit</ElButton>
      </template>
      内容
    </SopCard>
  `,
);


describe('SopCard', () => {
  it('render title', () => {
    const title = wrapper.find('.sop-card__hd-title').text();
    expect(title).toBe('卡片标题');
  });

  it('render opt slot', () => {
    const optSlot = wrapper.find('.sop-card__hd-opt .el-button').text();
    expect(optSlot).toBe('action');
  });

  it('render footer slot', () => {
    const footerSlot = wrapper.find('.sop-card__ft .el-button').text();
    expect(footerSlot).toBe('submit');
  });

  it('render content', () => {
    const content = wrapper.find('.sop-card__bd').text();
    expect(content).toBe('内容');
  });
});

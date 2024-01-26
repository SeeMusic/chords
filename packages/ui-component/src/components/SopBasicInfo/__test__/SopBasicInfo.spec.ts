import { ElTag } from 'element-plus';
import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopBasicInfo } from '../index';
import { SopStatus } from '../../SopStatus';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopBasicInfo,
      ElTag,
      SopStatus,
    },
    template,
    ...options,
  });

const wrapper = _mount(
  `<SopBasicInfo title="xxx合同">
    <template #titleSuffix>
      <span>titleSuffix</span>
    </template>
    <template #default>
      <span>
        <ElTag type="danger" size="small">
          存在手动终止记录
        </ElTag>
      </span>
      <span>
        <SopStatus type="danger" text="未过审" />
      </span>
      <span>
        创建时间：2022-10-16 00:00:00
      </span>
      <span>
        更新时间：2022-10-16 00:00:00
      </span>
    </template>
  </SopBasicInfo>`
);

describe('SopBasicInfo', () => {
  it('should be render card title', () => {
    const title = wrapper.find('.sop-basic-info__title');
    expect(title?.text()).toContain('xxx合同');
  });
  it('should be render title suffix', () => {
    const suffix = wrapper.find('.sop-basic-info__title > span');
    expect(suffix?.text()).toEqual('titleSuffix');
  });
});

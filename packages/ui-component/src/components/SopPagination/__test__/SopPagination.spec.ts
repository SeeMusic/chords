import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopPagination } from '../index';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopPagination,
    },
    template,
    ...options,
  });

const pagination = _mount(
  `<SopPagination
    :current-page="currentPage"
    :page-size="pageSize"
    :total="total"
  />`, {
  data() {
    return {
      currentPage: 1,
      pageSize: 20,
      total: 100
    };
  },
}
);

describe('pagination props', () => {
  it('should be render currentPage', () => {
    const currentPage = pagination.find('.is-active');
    expect(currentPage?.text()).toBe('1');
  });

  it('should be render total', () => {
    const currentPage = pagination.find('.el-pagination__text');
    expect(currentPage?.text()).toContain('100');
  });
});


import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { SopConfigProvider } from '../index';
import { SopPagination } from '../../SopPagination';
import { ElSelect, ElOption, ElConfigProvider, ElTable } from 'element-plus';
import { zhCn, zhTw, enUs } from '../../../locales';
import zhCN from 'element-plus/es/locale/lang/zh-cn';
import enUS from 'element-plus/es/locale/lang/en';
import zhTW from 'element-plus/es/locale/lang/zh-tw';

const wrapper = (options: Record<string, any>) => mount({
  components: {
    SopConfigProvider,
    SopPagination,
    ElSelect,
    ElOption,
    ElConfigProvider,
    ElTable
  },
  props: {
    lang: {
      type: String
    },
    locale: {
      type: Object
    },
    elementPlusLocale: {
      type: Object
    }
  },
  template: `
    <ElSelect v-model="lang">
      <ElOption label="中文" value="zh-CN" />
      <ElOption label="英文" value="en-US" />
      <ElOption label="繁体" value="zh-TW" />
    </ElSelect>

    <SopConfigProvider :locale="locale" >
      <ElConfigProvider :locale="elementPlusLocale">
        <ElTable :data="[]" />
        <SopPagination :current-page="10" :page-size="1" :total="100" />
      </ElConfigProvider>
    </SopConfigProvider>
  `,
}, options);

describe('SopLayoutMain', () => {
  it('zh-CN', () => {
    const Component = wrapper({ props: { lang: 'zh-CN', locale: zhCn, elementPlusLocale: zhCN } });

    const tableEmptyText = Component.find('.el-table__empty-text').text();
    const paginationTotalText = Component.find('.el-pagination__text').text();
    const paginationGoToText = Component.find('.el-pagination__goto').text();
    const paginationClassifier = Component.find('.el-pagination__classifier').text();

    const ret = `${tableEmptyText}${paginationTotalText}${paginationGoToText}${paginationClassifier}`;
    expect(ret).toBe('暂无数据共 100 条前往页');
  });

  it('zh-TW', () => {
    const Component = wrapper({ props: { lang: 'zh-TW', locale: zhTw, elementPlusLocale: zhTW } });

    const tableEmptyText = Component.find('.el-table__empty-text').text();
    const paginationTotalText = Component.find('.el-pagination__text').text();
    const paginationGoToText = Component.find('.el-pagination__goto').text();
    const paginationClassifier = Component.find('.el-pagination__classifier').text();

    const ret = `${tableEmptyText}${paginationTotalText}${paginationGoToText}${paginationClassifier}`;
    expect(ret).toBe('暫無資料共 100 條前往頁');
  });

  it('en-US', () => {
    const Component = wrapper({ props: { lang: 'en-US', locale: enUs, elementPlusLocale: enUS } });

    const tableEmptyText = Component.find('.el-table__empty-text').text();
    const paginationTotalText = Component.find('.el-pagination__text').text();
    const paginationGoToText = Component.find('.el-pagination__goto').text();
    const paginationClassifier = Component.find('.el-pagination__classifier').text();

    const ret = `${tableEmptyText}${paginationTotalText}${paginationGoToText}${paginationClassifier}`;
    expect(ret).toBe('No DataTotal 100Go to');
  });
});

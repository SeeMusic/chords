import { describe, expect, it } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopTheHeader } from '../index';

const _mount = (template: string, options = {}) =>
  mount({
    components: {
      SopTheHeader,
    },
    template,
    ...options,
  });

const theHeader = _mount(
  `<SopTheHeader
    :logo="logo"
    :sub-title="subTitle"
  />`, {
  data() {
    return {
      logo: 'https://pics.kanjian.com/static/logo/starcast-logo-blue@2x.png',
      subTitle: 'xx 管理系统'
    };
  },
}
);

describe('subTitle', () => {
  it('should be render subTitle', () => {
    const subTitle = theHeader.findAll('.the-sub-title')?.at(0);
    expect(subTitle?.text()).toEqual('xx 管理系统');
  });
});

describe('logo', () => {
  it('should be render logo', () => {
    const logo = theHeader.findAll('.the-logo img')?.at(0)?.attributes();
    expect(logo?.src).toEqual('https://pics.kanjian.com/static/logo/starcast-logo-blue@2x.png');
  });

  it('should click emitted', () => {
    const logo = theHeader.find('.the-logo');
    const logoComp = theHeader.findComponent(SopTheHeader);
    logo?.trigger('click');
    expect(logoComp.emitted()).toBeTruthy();
  });
});

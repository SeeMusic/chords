import { nextTick } from 'vue';
import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import { SopCover } from '../index';


describe('SopCover', () => {

  it('default cover', () => {
    const wrapper = shallowMount(SopCover, { props: { type: 'track' } });
    const defaultCover = wrapper.find('.default-cover').attributes().style;

    expect(defaultCover).contain('-72px');
  });

  it('custom cover and cover size', () => {
    const props = {
      src: 'https://element-plus.org/images/element-plus-logo.svg',
      height: 28,
      width: 113
    };
    const wrapper = shallowMount(SopCover, { props });

    const coverAttribute = wrapper.find('.sop-cover img').attributes();
    expect(coverAttribute.toString()).toEqual(props.toString());
  });

  it('edit cover', () => {
    const props = {
      src: 'https://element-plus.org/images/element-plus-logo.svg',
      isCoverEdit: true,
    };
    const wrapper = shallowMount(SopCover, { props });

    wrapper.find('.sop-cover').trigger('mouseenter');
    nextTick(() => {
      const attr = wrapper.find('.sop-cover .edit').attributes();
      expect(attr.style).contain('opacity: 1;');
    });
  });

  it('placeholder', () => {
    const wrapper = shallowMount(SopCover, { props: { placeholder: 'placeholder' } });
    const placeholder = wrapper.find('.sop-cover span').text();
    expect(placeholder).toBe('placeholder');
  });
});

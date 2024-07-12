import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import { SopInput } from '../index';


describe('SopInput', () => {

  it('custom placeholder element mounted.', async () => {
    const wrapper = mount(
      SopInput,
      {
        props: {
          placeholder: 'input placeholder',
          modelValue: 'input value',
          scrollPlaceholder: true,
        }
      }
    );
    const placeholder = wrapper.element.querySelector('.el-input__placeholder') as HTMLElement;
    expect(placeholder.className).toBe('el-input__placeholder');
  });

  it('custom placeholder element non-existent.', async () => {
    const wrapper = mount(
      SopInput,
      {
        props: {
          placeholder: 'input placeholder',
          modelValue: 'input value',
          scrollPlaceholder: false,
        }
      }
    );
    const placeholder = wrapper.element.querySelector('.el-input__placeholder') as HTMLElement;
    expect(placeholder).toBe(null);
  });
});

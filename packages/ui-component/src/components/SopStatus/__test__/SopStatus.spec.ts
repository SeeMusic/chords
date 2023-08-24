import { describe, expect, it } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import SopStatus from '../SopStatus';

describe('sample', () => {
  it('should render default type', () => {
    const sopStatus = shallowMount(SopStatus);
    expect(sopStatus.find('.sop-status__icon--primary').exists()).toBe(true);
  });
  it('should render props', () => {
    const text = '错误';
    const type = 'danger';
    const color = '#F9F9F9';
    const sopStatus = shallowMount(SopStatus, {
      props: {
        text,
        type,
        color
      }
    });
    expect(sopStatus.find('.sop-status__text').text()).toBe(text);
    expect(sopStatus.find(`.sop-status__icon--${type}`).exists()).toBe(true);
    expect(sopStatus.find(`.sop-status__icon--${type}`).html()).toContain('background-color: #F9F9F9;');
  });
});
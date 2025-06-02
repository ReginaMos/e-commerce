import { describe, it, expect, beforeEach } from 'vitest';
import { nextTick, type ComponentPublicInstance } from 'vue';
import { mountWithVuetify } from './test-utils';
import ToasterComponent from '../components/ToasterComponent.vue';
import type { VueWrapper } from '@vue/test-utils';

describe('ToasterComponent', () => {
  let wrapper: VueWrapper<ComponentPublicInstance<typeof ToasterComponent>>;

  beforeEach(() => {
    wrapper = mountWithVuetify(ToasterComponent);
  });

  it('is hidden by default', () => {
    expect(wrapper.vm.isVisible).toBe(false);
    expect(wrapper.text()).not.toContain('Close');
  });

  it('shows message, color, and timeout when showToaster is called', async () => {
    wrapper.vm.showToaster('Test message', 'red', 2);
    await nextTick();

    expect(document.body.textContent).toContain('Test message');
    expect(wrapper.vm.isVisible).toBe(true);
    expect(wrapper.vm.message).toBe('Test message');
    expect(wrapper.vm.color).toBe('red');
    expect(wrapper.vm.timeout).toBe(2000);
  });

  it('defaults color and timeout if not provided', async () => {
    wrapper.vm.showToaster('Default test');
    await nextTick();

    expect(wrapper.vm.color).toBe('');
    expect(wrapper.vm.timeout).toBe(5000);
  });
});

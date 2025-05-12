import { describe, it, expect, beforeEach } from 'vitest';
import RegistrationView from '../views/RegistrationView.vue';

import type { VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import { mountWithVuetify } from './setup-test';

describe('RegistrationView', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    wrapper = mountWithVuetify(RegistrationView);
  });

  it('renders all form fields', () => {
    expect(wrapper.text()).toContain('Sign Up Form');
    expect(wrapper.find('input[name="firstName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="lastName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="password"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Billing Address');
    expect(wrapper.text()).toContain('Already have account?');
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import RegistrationView from '../views/RegistrationView.vue';

import type { VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import { mountWithVuetify } from './setup-test';

vi.mock('../services/create-customer');

const mockToaster = {
  show: vi.fn(),
};

describe('RegistrationView', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  beforeEach(() => {
    vi.clearAllMocks();
    wrapper = mountWithVuetify(RegistrationView, {
      global: {
        provide: {
          toaster: mockToaster,
        },
      },
    });
  });

  it('renders all form fields', () => {
    expect(wrapper.text()).toContain('Sign Up Form');
    expect(wrapper.find('input[name="firstName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="lastName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="password"]').exists()).toBe(true);
    expect(wrapper.find('input[name="billingCity"]').exists()).toBe(true);
    expect(wrapper.find('input[name="billingCountry"]').exists()).toBe(true);
    expect(wrapper.find('input[name="billingStreetName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="billingPostalCode"]').exists()).toBe(true);
    expect(wrapper.text()).toContain('Billing Address');
    expect(wrapper.text()).toContain('Already have account?');
  });

  it('shows validation errors for empty required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('Username must be at least 1 characters long');
  });
});

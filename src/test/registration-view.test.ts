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

  it('renders registration form', () => {
    expect(wrapper.find('form[name="registrationForm"]').exists()).toBe(true);
  });

  it('renders all required form fields', () => {
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

  it('toggles shipping address form when same address is changed', async () => {
    const checkbox = wrapper.find('input[type="checkbox"]');

    expect(wrapper.find('[name="shippingStreet"]').exists()).toBe(false);

    await checkbox.setValue(false);
    expect(wrapper.find('[name="shippingStreet"]').exists()).toBe(true);
  });

  it('shows validation errors for empty required fields', async () => {
    await wrapper.find('form').trigger('submit.prevent');

    expect(wrapper.emitted()).toHaveProperty('submit');
    expect(mockToaster.show).toHaveBeenCalledWith('Fill in required fields!', 'error');
  });
});

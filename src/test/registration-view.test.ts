import { describe, it, expect, beforeEach, vi } from 'vitest';
import RegistrationView from '../views/RegistrationView.vue';
import { RouterLink } from 'vue-router';

import { type VueWrapper } from '@vue/test-utils';
import { type ComponentPublicInstance } from 'vue';
import { mountWithVuetify } from './test-utils';
import router from '../router';
import { Links } from '../constants/routersLinks';

vi.mock('../services/customer-service', () => ({
  useAuth: () => ({
    createCustomer: vi.fn(),
  }),
}));

import { useAuth } from '../services/customer-service';
const { createCustomer } = useAuth();

// const validFormData = {
//   firstName: 'John',
//   lastName: 'Doe',
//   email: 'john@example.com',
//   password: 'Password123!',
// };

// const validAddress = {
//   streetName: 'Street',
//   city: 'City',
//   postalCode: '123456',
//   country: 'Germany',
// };

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
    expect(wrapper.text()).toContain('Create an account');
    expect(wrapper.find('input[name="firstName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="lastName"]').exists()).toBe(true);
    expect(wrapper.find('input[name="email"]').exists()).toBe(true);
    expect(wrapper.find('input[name="dateOfBirth"]').exists()).toBe(true);
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
    expect(createCustomer).not.toHaveBeenCalled();
  });

  it('navigates to login page when Login button is clicked', async () => {
    const push = vi.spyOn(router, 'push');
    const loginBtn = wrapper.findComponent(RouterLink);
    expect(loginBtn.exists()).toBe(true);
    await loginBtn.trigger('click');
    expect(push).toHaveBeenCalledOnce();
    expect(push).toHaveBeenCalledWith(Links.LOGIN.LINK);
  });

  // it('handles API errors', async () => {
  //   await wrapper.find('input[name="firstName"]').setValue(validFormData.firstName);
  //   await wrapper.find('input[name="lastName"]').setValue(validFormData.lastName);
  //   await wrapper.find('input[name="email"]').setValue(validFormData.email);
  //   await wrapper.find('input[name="password"]').setValue(validFormData.password);

  //   await wrapper.find('input[name="billingStreetName"]').setValue(validAddress.streetName);
  //   await wrapper.find('input[name="billingCity"]').setValue(validAddress.city);
  //   await wrapper.find('input[name="billingPostalCode"]').setValue(validAddress.postalCode);
  //   await wrapper.find('input[name="billingCountry"]').setValue(validAddress.country);

  //   const error = new Error('API Error');
  //   vi.mocked(createCustomer).mockRejectedValueOnce(error);

  //   await wrapper.find('form').trigger('submit.prevent');

  //   expect(createCustomer).toHaveBeenCalled();
  //   expect(mockToaster.show).toHaveBeenCalledWith('API Error', 'error');
  // });

  // it('successfully submits form with valid data', async () => {
  //   await wrapper.find('input[name="firstName"]').setValue(validFormData.firstName);
  //   await wrapper.find('input[name="lastName"]').setValue(validFormData.lastName);
  //   await wrapper.find('input[name="email"]').setValue(validFormData.email);
  //   await wrapper.find('input[name="password"]').setValue(validFormData.password);
  //   await wrapper.find('input[name="billingStreetName"]').setValue(validAddress.streetName);
  //   await wrapper.find('input[name="billingCity"]').setValue(validAddress.city);
  //   await wrapper.find('input[name="billingPostalCode"]').setValue(validAddress.postalCode);
  //   await wrapper.find('input[name="billingCountry"]').setValue(validAddress.country);

  //   await wrapper.find('form').trigger('submit.prevent');

  //   vi.mocked(createCustomer).mockResolvedValueOnce({} as CustomerSignInResult);
  //   expect(mockToaster.show).toHaveBeenCalledWith('Customer created!', 'success');
  //   expect(createCustomer).toHaveBeenCalled();
  // });
});

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import type { Component } from 'vue';

const vuetify = createVuetify({
  components,
  directives,
});

export function mountWithVuetify(
  component: Component,
  options: MountingOptions<unknown> = {}
): VueWrapper<ComponentPublicInstance> {
  return mount(component, {
    global: {
      plugins: [vuetify],
      ...(options.global || {}),
    },
    ...options,
  });
}

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { mount, type MountingOptions, type VueWrapper } from '@vue/test-utils';
import type { ComponentPublicInstance } from 'vue';
import type { Component } from 'vue';
import router from '../router';

const vuetify = createVuetify({
  components,
  directives,
});

export function mountWithVuetify(
  component: Component,
  options: MountingOptions<Component> = {}
): VueWrapper<ComponentPublicInstance> {
  const { global = {}, ...rest } = options;
  const plugins = [...(global.plugins || [])];
  plugins.push(vuetify, router);

  return mount(component, {
    ...rest,
    global: {
      ...global,
      plugins,
    },
  });
}

import { createApp } from 'vue';
import '@mdi/font/css/materialdesignicons.css';
import './style.css';
import router from './router/index';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import ToasterComponent from './components/ToasterComponent.vue';
import { initializeApiRoot } from './services/build-client';

const vuetify = createVuetify({
  components,
  directives,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  display: {
    mobileBreakpoint: 'sm',
    thresholds: {
      xs: 320,
      sm: 576,
      md: 1024,
      lg: 1200,
      xl: 1440,
    },
  },
});

initializeApiRoot();
const app = createApp(App);
app.use(vuetify);
app.use(router);
app.component('UniversalToaster', ToasterComponent);

app.mount('#app');

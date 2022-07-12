import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/dist/vite';
import Components from 'unplugin-vue-components/dist/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/dist/resolvers';

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      eslintrc: {
        enabled: true, // Default `false`
        filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true,
      },
      imports: ['vue', '@vueuse/core', 'vuex'],
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()],
    }),
  ],
});

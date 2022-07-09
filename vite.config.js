import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    Vue(),
    AutoImport({
      imports: ['vue', '@vueuse/core'],
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      dirs: ['src/components'],
      resolvers: [ElementPlusResolver()]
    })
  ],
  exlintrc: {
    enabled: true,
    filePath: './eslintrc-auto-import.json',
    globalsPropValue: true
  }
})

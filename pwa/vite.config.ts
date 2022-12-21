import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import presetWind from '@unocss/preset-wind'
import { VitePluginFonts } from 'vite-plugin-fonts'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [
    vue(),
    basicSsl(),
    Unocss({
      presets: [presetWind()],
      rules: [['theme', { 'font-family': 'basic-sans, sans-serif;' }]],
    }),
    VitePluginFonts({
      typekit: {
        id: 'owc6urb',
        defer: true,
        injectTo: 'head',
      },
    }),
  ],
})

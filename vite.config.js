import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import UnoCSS from 'unocss/vite'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import mkcert from 'vite-plugin-mkcert'
import AutoImport from 'unplugin-auto-import/vite'
import setting from './src/settings'
import vitePluginSetupExtend from './src/plugins/vite-plugin-setup-extend/index'

const pathSrc = path.resolve(__dirname, 'src')

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '') // 取得環境變數

  return {
    base: setting.viteBasePath,
    define: {
      //define global var
      GLOBAL_STRING: JSON.stringify('i am global var from vite.config.js define'),
      GLOBAL_VAR: { test: 'i am global var from vite.config.js define' }
    },
    clearScreen: false, // 設為 false 可避免 Vite 刷新頁面而錯過終端機訊息
    server: {
      hmr: { overlay: false }, // 設置 server.hmr.overlay 為 false ，可禁用 server 隱藏錯誤訊息
      port: 5003,
      open: false,
      cors: true,
      host: true,
      https: false
    },
    preview: {
      port: 5006,
      host: true,
      strictPort: true
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS({
        presets: [presetUno(), presetAttributify(), presetIcons()]
      }),
      mkcert(),
      //compatible with old browsers
      // legacy({
      //   targets: ['chrome 52'],
      //   additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      // }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/icons/common'), path.resolve(process.cwd(), 'src/icons/nav-bar')],
        symbolId: 'icon-[dir]-[name]'
      }),
      // VueSetupExtend(),using  DefineOptions instant of it
      //https://github.com/antfu/unplugin-auto-import/blob/HEAD/src/types.ts
      Components({
        dirs: ['src/components', 'src/icons'],
        extensions: ['vue'],
        deep: true,
        dts: './typings/components.d.ts'
      }),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          {
            'pinia/dist/pinia': ['storeToRefs']
          }
        ],
        // 配置後會自動掃描目錄下的文件
        dirs: ['src/hooks/**', 'src/utils/**', 'src/store/**',],
        eslintrc: {
          enabled: true, // Default `false`
          filepath: './eslintrc/.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        dts: './typings/auto-imports.d.ts'
      }),
      // auto config of index.html title
      // createHtmlPlugin({
      //   inject: { data: { title: setting.title } }
      // }),
      vitePluginSetupExtend({ inject: { title: setting.title } })
    ],
    build: {
      chunkSizeWarningLimit: 10000, //消除觸發警告的 chunk, 默認500k
      assetsDir: 'static/assets',
      outDir: 'release', // build 出來的資料夾名稱
      rollupOptions: {
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    resolve: {
      alias: {
        '@/': `${pathSrc}/`,
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js' //remove i18n waring
      }
    },
    optimizeDeps: {
      //include: [...optimizeDependencies,...optimizeElementPlus] //on-demand element-plus use this
      include: ['moment-mini']
    }
  }
})

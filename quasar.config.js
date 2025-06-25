// quasar.config.js

import { defineConfig } from '#q-app/wrappers'

export default defineConfig(() => {
  return {
    boot: [
      'axios', 'pinia'
    ],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      vueRouterMode: 'hash',
      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{js,mjs,cjs,vue}"',
            useFlatConfig: true
          }
        }, { server: false }]
      ]
    },

    devServer: {
      open: true,
      proxy: {
        '/api': {
          target: 'http://localhost:5024',
          changeOrigin: true
        }
      }
    },

    framework: {
      config: {},
      plugins: ['Notify'] // <--- Asegúrate de incluir el plugin Notify aquí
    },

    animations: [],

    ssr: {
      prodPort: 3000,
      middlewares: ['render'],
      pwa: false
    },

    pwa: {
      workboxMode: 'GenerateSW'
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'uesan-inves-frontend'
      }
    },

    bex: {
      extraScripts: []
    }
  }
})

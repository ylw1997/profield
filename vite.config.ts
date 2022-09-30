/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-09-30 11:26:13
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\vite.config.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import dts from 'vite-plugin-dts'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), dts({
    outputDir: "dist",
  })],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'index',
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: ['vue','ant-design-vue'],
      input: ["src/index.ts"],
      output: [{
        format: "es",
        entryFileNames: '[name].es.js',
        dir: 'dist',
        name: 'index',
        manualChunks:{
          // "ant-design-vue": ["ant-design-vue"],
          "ant-design-icon": ["@ant-design/icons-vue"],
          "wangeditor": ["@wangeditor/editor-for-vue",'@wangeditor/editor'],
        }
      }
      // , {
      //   format: "umd",
      //   entryFileNames: '[name].umd.js',
      //   dir: 'dist',
      //   name: 'index',
      //   // inlineDynamicImports:false,
      //   // preserveModules: true,
      //   // preserveModulesRoot: 'src',
      //   // manualChunks:{
      //   //   "ant-design-icon": ["@ant-design/icons-vue"],
      //   //   "wangeditor": ["@wangeditor/editor-for-vue",'@wangeditor/editor'],
      //   // }
      // }
    ]
    },
  },
})

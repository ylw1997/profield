/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:10:44
 * @LastEditTime: 2022-09-28 15:29:27
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
import vueSetupExtend from "vite-plugin-vue-setup-extend";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), vueSetupExtend(), dts({
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
      name: 'lib',
      // fileName:"proField"
      fileName: (format) => `lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    },
  },
})

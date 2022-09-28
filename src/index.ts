/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 17:00:18
 * @LastEditTime: 2022-09-28 10:02:23
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\index.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import proField from "./components/proField"; // 引入封装好的组件
import { App } from 'vue';
import YUpload from "./components/YUpload";
import testBtn from "./components/testBtn.vue";

export { proField,YUpload,testBtn } //实现按需引入*


const components = [proField,YUpload,testBtn];

const install = (app:App) => {
    components.forEach((component) => {
        app.component(component.name,component);
    });
};
export default { install } // 批量的引入*
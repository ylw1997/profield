/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 17:00:18
 * @LastEditTime: 2022-09-29 14:21:47
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\index.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import proField from "./components/proField"; // 引入封装好的组件
import { App } from 'vue';
import YUpload from "./components/YUpload";
import proForm from "./components/proForm.vue";
import proPanel from "./components/proPanel"
import proTable from "./components/proTable"
import proEditor from "./components/proEditor.vue"
import { columnItem, ColumnsTypes, DefaultOptionType } from './types/index';

export { proField,YUpload,proForm,proPanel,proTable,proEditor } //实现按需引入*

export type {ColumnsTypes,columnItem,DefaultOptionType}

const components = [proField,YUpload,proForm,proPanel,proTable,proEditor];

const install = (app:App) => {
    components.forEach((component) => {
        app.component(component.name,component);
    });
};
export default { install } // 批量的引入*
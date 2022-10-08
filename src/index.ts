/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 17:00:18
 * @LastEditTime: 2022-10-08 10:15:44
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\index.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import proField from "./components/proField"; // 引入封装好的组件
import { App } from "vue";
import YUpload from "./components/YUpload";
import proForm from "./components/proForm.vue";
import proPanel from "./components/proPanel";
import proTable from "./components/proTable";
import lookField from "./components/lookField";
import { columnItem, ColumnsTypes, DefaultOptionType, RuleObject, RuleType } from "./types/index";
import useForm from "./hooks/useForm";
import useTable from "./hooks/useTable";

//实现按需引入*
export { proField, YUpload, proForm, proPanel, proTable, lookField, useForm, useTable };

export type { ColumnsTypes, columnItem, DefaultOptionType, RuleObject, RuleType };

const components = [proField, YUpload, proForm, proPanel, proTable, lookField];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name, component);
  });
};
export default { install }; // 批量的引入*

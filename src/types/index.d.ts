/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:25:58
 * @LastEditTime: 2022-09-29 13:58:20
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\types\index.d.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { RuleObject } from "ant-design-vue/lib/form";
import { RuleType } from "ant-design-vue/lib/form/interface";
import { ColumnType } from "ant-design-vue/lib/table";
import { ComputedRef, Ref } from "vue";
import {
  DatePickerProps,
  InputProps,
  SelectProps,
  UploadProps,
} from "ant-design-vue";

export type ColumnsTypes =
  | "text"
  | "number"
  | "money"
  | "dateTime"
  | "date"
  | "time"
  | "dateRange"
  | "dateTimeRange"
  | "textarea"
  | "select"
  | "upload"
  | "YUpload"
  | "switch"
  | "tree"
  | "treeSelect"
  | "password"
  | "cascader";

export interface BaseOptionType {
  disabled?: boolean;
  [name: string]: any;
}
export interface DefaultOptionType extends BaseOptionType {
  label?: any;
  value?: string | number | null;
  children?: Omit<DefaultOptionType, 'children'>[];
}

export interface columnItem
  extends ColumnType {
  title: string;
  dataIndex: string;
  options?: DefaultOptionType[] | ComputedRef<DefaultOptionType[]> | Ref<DefaultOptionType[]> | undefined | Ref<DefaultOptionType[] | undefined>; //下拉选择框
  notShowInSearch?: boolean; //是否展示在查询表单
  notShowInAddOrEdit?: boolean; //不在添加或编辑的时候展示
  notShowInTable?: boolean; //不在表格显示
  required?: boolean; //不是必须
  type?: ColumnsTypes; //字段类型
  onChangeValue?: (fromData: any, ...value: any) => void; // 值改变时的回调
  ValidateType?: RuleType; //表单验证类型
  editNoRequired?: boolean; //编辑不用强制要求
  rules?: RuleObject; //表单验证规则
  span?: number; //占据的列数
  condition?: (formModel: any) => boolean; //满足条件才显示
  rangeDateKeyArray?: [string, string]; //时间范围的key
  cascaderKeyArray?: string[]; //级联选择后的对应字段
  slot?: string; //插槽名称
  tips?: string; //提示信息
  [str: string]: any;
}
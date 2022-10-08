/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 14:25:58
 * @LastEditTime: 2022-10-08 10:15:22
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\types\index.d.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import type { VNode } from "vue";
import { ColumnType } from "ant-design-vue/lib/table";
import { ComputedRef, Ref } from "vue";

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
  children?: Omit<DefaultOptionType, "children">[];
}

declare type VNodeChildAtom = VNode | string | number | boolean | null | undefined | void;

export declare type VueNode = VNodeChildAtom | VNodeChildAtom[] | JSX.Element;

export declare type StoreValue = any;

declare type Validator = (rule: RuleObject, value: StoreValue, callback: (error?: string) => void) => Promise<void> | void;

export declare type RuleType = "string" | "number" | "boolean" | "method" | "regexp" | "integer" | "float" | "object" | "enum" | "date" | "url" | "hex" | "email";

export type ValidateType  = RuleType | "any";

export interface ValidatorRule {
  warningOnly?: boolean;
  message?: string | VueNode;
  /** custom validate function (Note: callback must be called) */
  validator: Validator;
}
interface BaseRule {
  warningOnly?: boolean;
  /** validate the value from a list of possible values */
  enum?: StoreValue[];
  /** validate the exact length of a field */
  len?: number;
  /** validate the max length of a field */
  max?: number;
  /** validation error message */
  message?: string | VueNode;
  /** validate the min length of a field */
  min?: number;
  /** validate from a regular expression */
  pattern?: RegExp;
  /** indicates whether field is required */
  required?: boolean;
  /** transform a value before validation */
  transform?: (value: StoreValue) => StoreValue;
  /** built-in validation type, available options: https://github.com/yiminghe/async-validator#type */
  type?: RuleType;
  /** treat required fields that only contain whitespace as errors */
  whitespace?: boolean;
  /** Customize rule level `validateTrigger`. Must be subset of Field `validateTrigger` */
  validateTrigger?: string | string[];
  /** Check trigger timing */
  trigger?: "blur" | "change" | Array<"change" | "blur">;
}
declare type AggregationRule = BaseRule & Partial<ValidatorRule>;
interface ArrayRule extends Omit<AggregationRule, "type"> {
  type: "array";
  defaultField?: RuleObject;
}

export declare type RuleObject = AggregationRule | ArrayRule;

export interface columnItem extends ColumnType {
  title: string;
  dataIndex: string;
  options?: DefaultOptionType[] | ComputedRef<DefaultOptionType[]> | Ref<DefaultOptionType[]> | undefined | Ref<DefaultOptionType[] | undefined>; //下拉选择框
  notShowInSearch?: boolean; //是否展示在查询表单
  notShowInAddOrEdit?: boolean; //不在添加或编辑的时候展示
  notShowInTable?: boolean; //不在表格显示
  required?: boolean; //不是必须
  type?: ColumnsTypes; //字段类型
  onChangeValue?: (fromData: any, ...value: any) => void; // 值改变时的回调
  ValidateType?: ValidateType; //表单验证类型
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
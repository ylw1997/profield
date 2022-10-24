import { RuleType } from "ant-design-vue/lib/form/interface";
import { DefaultOptionType } from "ant-design-vue/lib/select";
import { columnItem } from "../types/index";
/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-27 13:55:41
 * @LastEditTime: 2022-10-24 15:02:49
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\utils\index.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
// 生成websocket uid
export const guid = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 * 判断columns的type对应的validatetype
 * @param type columnsType
 * @returns validateType
 */
export const ValidateItemType = (
  columnItem: columnItem
): "array" | RuleType | undefined | any => {
  // if (!columnItem.required) return undefined;
  if (columnItem.ValidateType) return columnItem.ValidateType;
  const type = columnItem.type;
  if (type === "select" || columnItem.isArray) {
    return "any";
  }
  if (type == "upload" || type == "text" || type == "textarea") {
    return "string";
  }
  if (type == "dateTime" || type == "date" || type == "time") {
    return "object";
  }
  if (
    type == "dateRange" ||
    type == "dateTimeRange" ||
    type == "tree" ||
    type == "cascader"
  ) {
    return "array";
  }
  if (type == "money") {
    return "number";
  }
  if (type == "number") {
    return "number";
  }
  return "string";
};

/**
 * 找到对应的label
 * @param DataArr 定义数据
 * @param text 找的值
 * @returns 字符串
 */
export const FindTextFromData = (
  DataArr: DefaultOptionType[] | undefined,
  text: string | number
): string => {
  if (DataArr) {
    const arr = DataArr.filter((item) => item.value == String(text));
    if (arr.length > 0) {
      return arr[0].label;
    }
  }
  return "";
};

/**
 * Copy 接受一个字符串并返回一个在将文本复制到剪贴板时解析的承诺。
 * @param {string} text - 要复制到剪贴板的文本。
 * @returns 复制文本时解决的承诺。
 */
export const Copy = (text: string) => {
  return navigator.clipboard.writeText(text);
};

// 筛选出需要在列选项中显示的列
export const TableColumns = (columns?: columnItem[]): columnItem[] => {
  if (columns) {
    return columns.filter((item) => !item.notShowInTable);
  }
  return [];
};

// 筛选出需要在表格显示的列
export const TableColumnSelected = (columns?: any[],selectedKeys?: string[], ) => {
  if (columns&&columns.length>0) {
    if(selectedKeys&&selectedKeys.length>0){
      return columns.filter((item) => selectedKeys.includes(item.dataIndex));
    }else{
      return TableColumns(columns);
    }
  }
  return [];
};
/*
 * @Author: YangLiwei
 * @Date: 2021-01-18 10:05:49
 * @LastEditTime: 2022-10-08 11:36:59
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\hooks\useModel.ts
 * @Description:弹窗hook
 */

import { ref } from "vue";
import { columnItem } from "../types";
import { ModelType, convertDataToFormData } from "../utils/form";

/**
 * 添加编辑弹窗hook
 * @param columns 字段定义表
 * @returns
 */
const useModel = (columns: columnItem[]) => {
  const visible = ref(false);
  const modelData = ref();
  const add = () => {
    showData({}, "add");
  };
  /**
   * 编辑
   * @param record 编辑参数
   */
  const edit = (record: { [text: string]: any }) => {
    //编辑的数据
    showData(record, "edit");
  };

  /**
   * 查看
   * @param record 查看参数
   */
  const look = (record: { [text: string]: any }) => {
    showData(record, "look");
  };

  const showData = (
    record: { [text: string]: any },
    type: "look" | "edit" | "add"
  ) => {
    const obj: ModelType = { ...record, ylwType: type };
    if (type === "add") {
      modelData.value = { ylwType: type };
    } else {
      modelData.value = convertDataToFormData(columns, obj);
    }
    visible.value = true;
  };

  return {
    visible,
    modelData,
    add,
    edit,
    look,
  };
};
export default useModel;

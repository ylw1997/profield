/*
 * @Author: YangLiwei
 * @Date: 2021-01-14 18:07:03
 * @LastEditTime: 2022-09-29 17:01:46
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\hooks\useForm.ts
 * @Description:formhook
 */
import { ref, watchEffect } from "vue";
import { ValidateItemType } from "../utils/index";
import { columnItem, RuleObject } from "../types";
import { convertFormDataToData } from "../utils/form";
/**
 * 表单hook,在model中可以用:cancel,submit封装
 * @param params 初始化参数
 * @param emit
 * @returns
 */
const useForm = (emit?: any, props?: any, columns?: columnItem[]) => {
  const formref = ref();
  const formModel = ref<{ [string: string]: any }>({});
  //关闭
  const cancel = () => {
    if (emit) {
      formref.value?.resetFields();
      if (props.data) emit("update:data", {});
      emit("update:visible", false);
    }
  };
  //重置
  const reset = () => {
    // Object.keys(formModel.value).map(
    //   (item) => (formModel.value[item] = undefined)
    // );
    formModel.value = {};
    if (emit) emit("reset", {});
  };
  //查询
  const search = () => {
    const obj = convertFormDataToData(formModel.value, columns);
    if (emit) emit("search", obj);
  };

  // 提交
  const submit = () => {
    formref.value.validate().then(() => {
      const obj = {
        ...formModel.value,
      };
      const data = convertFormDataToData(obj, columns);
      if (emit) emit("ok", data);
    });
  };

  // 生成rule
  const makeRule = (item: columnItem) => {
    const rules = [
      {
        type: ValidateItemType(item),
        required:
          item.required &&
          !(
            (formModel.value.ylwType == "edit" && item.editNoRequired) ||
            formModel.value.ylwType == "look"
          ),
        message: `必须填写${item.title}! `,
      } as RuleObject,
    ];
    if (item.rules) {
      rules.push(item.rules);
    }
    return rules;
  };

  if (props) {
    watchEffect(() => {
      if (props.data) {
        formModel.value = { ...props.data };
      }
    });
  }

  return {
    cancel,
    submit,
    formref,
    formModel,
    reset,
    search,
    makeRule,
  };
};
export default useForm;

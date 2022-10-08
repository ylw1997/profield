/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-10-08 11:06:24
 * @LastEditTime: 2022-10-08 11:06:37
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\hooks\useAjax.ts
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
 */
import { ref, onMounted, Ref } from "vue";
import { AxiosResponse } from "axios";
import { message } from "ant-design-vue";
import { Ajax } from "../types";
interface UseAJAX<T> {
  func: (params: any) => Promise<AxiosResponse<Ajax<T>>>;
  params?: any;
  callBackFunc?: (data: any, res: any) => void;
  runOnMounted?: boolean;
}
interface AjaxRes<T> {
  data: Ref<T | undefined>;
  loading: Ref<boolean>;
  ajaxFunc: (funcparams?: any) => Promise<any>;
}
/**
 * @example
 *  func 请求方法
 *  params 请求参数
 *  callBackFunc 成功回调
 *  runOnMounted 是否在最开始就执行
 * @description 请求hook
 * @param param 参数配置
 */
const useAJAX = <T>({
  func,
  params = {},
  callBackFunc,
  runOnMounted = true,
}: UseAJAX<T>): AjaxRes<T> => {
  const loading = ref(false);
  const data = ref<T | any>();
  /**
   * useAJAX hook的请求方法
   * @param funcparams 请求的参数 默认为hook传的参数
   */
  const ajaxFunc = async (funcparams = params) => {
    data.value = undefined;
    loading.value = true;
    await func(funcparams)
      .then((res) => {
        if (res.data instanceof Blob) {
          data.value = res.data;
          if (callBackFunc) callBackFunc(res.data, res.data);
        } else {
          data.value = res.data?.data;
          if (callBackFunc) callBackFunc(res.data?.data, res.data);
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  onMounted(() => {
    if (runOnMounted) ajaxFunc();
  });
  return {
    data,
    loading,
    ajaxFunc,
  };
};

// 简化版本
export const useAJAXSim = <T>(
  func: (params: any) => Promise<AxiosResponse<Ajax<T>>>,
  runOnMounted: boolean,
  onSuccess?: (data: any, res: any) => void
) => {
  const { data, loading, ajaxFunc } = useAJAX({
    func,
    runOnMounted,
    callBackFunc: (data, res) => {
      message.success(res.msg);
      onSuccess && onSuccess(data, res);
    },
  });
  return { data, loading, ajaxFunc };
};

export default useAJAX;

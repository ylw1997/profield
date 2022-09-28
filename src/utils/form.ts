/*
 * @Author: YangLiwei
 * @Date: 2022-07-11 10:36:59
 * @LastEditTime: 2022-09-27 14:00:53
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\utils\form.ts
 * @Description: 表单数据处理
 */

import { UploadFile } from "ant-design-vue";
import dayjs from "dayjs";
import { columnItem } from "../types";
import timeFormat from "./time";

export interface ModelType {
  ylwType: "add" | "edit" | "look";
  [text: string]: any;
}

/**
 * 数据显示前表单处理
 * 根据columns的type来转换数据格式
 * @param columns
 * @param record
 * @returns
 */
export const convertDataToFormData = (columns: columnItem[], record: any) => {
  const obj: ModelType = { ...record };
  columns.forEach((item) => {
    if (
      (item.type == "dateTime" || item.type == "time" || item.type == "date") &&
      obj[item.dataIndex]
    ) {
      obj[item.dataIndex] = dayjs(obj[item.dataIndex]);
    }

    // 级联显示
    if (
      item.type &&
      item.type == "cascader" &&
      item.cascaderKeyArray &&
      item.cascaderKeyArray.length > 0
    ) {
      const keys = [...item.cascaderKeyArray];
      const vals: any[] = [];
      keys.forEach((keyItem) => {
        if (obj[keyItem]) {
          vals.push(obj[keyItem] + "");
        }
      });
      obj[item.dataIndex] = vals;
    }

    if (
      item.type &&
      ["dateRange", "dateTimeRange"].includes(item.type) &&
      item.rangeDateKeyArray
    ) {
      obj[item.dataIndex] = [
        dayjs(obj[item.rangeDateKeyArray[0]]),
        dayjs(obj[item.rangeDateKeyArray[1]]),
      ];
    }
  });
  return obj;
};

/**
 * 表单提交前数据处理
 * 主要是把时间格式转换成时间戳,把文件转换成字符串
 * @param formdata 上传的数据
 * @returns 转换后的上传数据
 */
export const convertFormDataToData = (
  formdata: any,
  columns?: columnItem[]
) => {
  const dataobj = { ...formdata };
  if (columns) {
    columns.forEach((item) => {
      // 如果是级联选择把对应的值放在对应key中
      if (
        item.type &&
        item.type == "cascader" &&
        item.cascaderKeyArray &&
        item.cascaderKeyArray.length > 0
      ) {
        if (dataobj[item.dataIndex]) {
          const dateArray = [...dataobj[item.dataIndex]];
          dateArray.forEach((data: string | number, index) => {
            if (item.cascaderKeyArray)
              dataobj[item.cascaderKeyArray[index]] = dateArray[index];
          });
          delete dataobj[item.dataIndex];
        }
      }

      if (
        item.type &&
        ["dateRange", "dateTimeRange"].includes(item.type) &&
        item.rangeDateKeyArray
      ) {
        if (dataobj[item.dataIndex]) {
          const dateArray = [...dataobj[item.dataIndex]];
          dataobj[item.rangeDateKeyArray[0]] = timeFormat(
            dateArray[0],
            "YYYY-MM-DD HH:mm:ss"
          );
          dataobj[item.rangeDateKeyArray[1]] = timeFormat(
            dateArray[1],
            "YYYY-MM-DD HH:mm:ss"
          );
          delete dataobj[item.dataIndex];
        }
      }

      if (
        (item.type == "date" ||
          item.type == "dateTime" ||
          item.type == "time") &&
        dataobj[item.dataIndex]
      ) {
        dataobj[item.dataIndex] = timeFormat(
          dataobj[item.dataIndex],
          "YYYY-MM-DD HH:mm:ss"
        );
      }
    });
  }
  return dataobj;
};

// 把字符串数组转成文件对象数组
export const strArrToUploadFileArr = (
  str?: string
): {
  isAllDone: boolean;
  uploadFileArr: UploadFile[];
} => {
  let isAllDone = true;
  let uploadFileArr: UploadFile[] = [];
  if (str) {
    const arr = str.split(",");
    uploadFileArr = arr.map((item) => {
      if (!item) isAllDone = false;
      const name = item.split("/")[item.split("/").length - 1];
      return {
        url: item,
        uid: item,
        status: "done",
        name: name,
        thumbUrl: item,
        response: {
          data: {
            url: item,
          },
        },
      };
    });
  } else {
    isAllDone = false;
  }
  return {
    isAllDone,
    uploadFileArr,
  };
};

// 把文件对象数组转成字符串
export const uploadFileArrToStrArr = (
  filearr?: UploadFile[]
): { arr: string; isAllDone: boolean } => {
  let isAllDone = true;
  let arr: string[] = [];
  if (filearr) {
    arr = filearr.map((item) => {
      if (item.response && item.status == "done") {
        return item.response.data.url;
      } else {
        isAllDone = false;
        return "";
      }
    });
  } else {
    isAllDone = false;
  }
  return { arr: arr.join(","), isAllDone };
};

export const fileArrtoStrArr = (filearr?: UploadFile[]): string => {
  let arr: string[] = [];
  if (filearr) {
    arr = filearr.map((item) => {
      if (item.response && item.status == "done" && item.response.data) {
        return item.response.data.url;
      } else {
        return "";
      }
    });
  }
  return arr.join(",");
};

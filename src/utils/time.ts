/*
 * @Author: YangLiwei
 * @Date: 2021-01-08 11:03:19
 * @LastEditTime: 2022-07-14 11:27:03
 * @LastEditors: YangLiwei
 * @FilePath: \vite-admin\src\utils\time.ts
 * @Description:时间工具
 */

import dayjs, { Dayjs } from "dayjs";

/**
 * 时间格式化
 * @param timeStr 时间戳,字符串
 * @param format 格式化类型
 */
const timeFormat = (
  timeStr?: string | number | null | Dayjs,
  format:
    | "YYYY-MM-DD"
    | "YYYY-MM"
    | "YYYY-MM-DD HH:mm:ss"
    | "HH:mm"
    | "HH:mm:ss"
    | "dateTime" = "YYYY-MM-DD HH:mm:ss"
): string => {
  if (timeStr) {
    if (format == "dateTime") {
      return dayjs(timeStr).toISOString();
    }
    return dayjs(timeStr).format(format);
  }
  return "";
};

export default timeFormat;

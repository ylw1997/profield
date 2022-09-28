/*
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-27 13:55:41
 * @LastEditTime: 2022-09-27 13:55:43
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
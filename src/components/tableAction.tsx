/*
 * @Author: YangLiwei
 * @Date: 2022-06-27 09:53:39
 * @LastEditTime: 2022-10-18 10:25:32
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\tableAction.tsx
 * @Description: 表格操作栏
 */

import { Space } from "ant-design-vue";
import { defineComponent } from "vue";
export default defineComponent({
  name:"tableAction",
  setup(prop, { slots }) {
    return () => (
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems:"center",
        "margin-bottom": "10px",
      }} >
        <Space>{slots.left ? slots.left() : null}</Space>
        <Space>{slots.right ? slots.right() : null}</Space>
      </div>
    );
  },
});
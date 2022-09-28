/*
 * @Author: YangLiwei
 * @Date: 2022-06-27 09:53:39
 * @LastEditTime: 2022-09-28 15:02:10
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
      <div class="between mb10">
        <Space>{slots.left ? slots.left() : null}</Space>
        <Space>{slots.right ? slots.right() : null}</Space>
      </div>
    );
  },
});

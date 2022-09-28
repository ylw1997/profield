<!--
 * @Author: yangliwei 1280426581@qq.com
 * @Date: 2022-09-26 16:59:17
 * @LastEditTime: 2022-09-27 14:03:06
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\TestBtn.vue
 * Copyright (c) 2022 by yangliwei 1280426581@qq.com, All Rights Reserved. 
 * @Description: 
-->
<template>
  <div>{{ message }}</div>
</template>

<script lang='ts'>
import { message } from 'ant-design-vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'testBtn',
  setup() {
    const message = ref('hello world!');
    return {
      ref,
      message,
    };
  },
});
</script>
<style lang='less'>

</style>
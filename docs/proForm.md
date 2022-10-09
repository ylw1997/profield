# proForm 组件

- proForm 是一系列基于 ant design vue 的 组件库

- 用来生成弹窗表单,抽屉表单,普通表单

## 引入

```js
import { proForm } from "profield";
```

## 使用

```html
<proForm
  :width="700"
  title="规格管理"
  v-memo="[modelData, visible, crudLoading]"
  v-model:visible="visible"
  v-model:data="modelData"
  :loading="crudLoading"
  @ok="ModelOk"
  :columns="columns"
/>
```

## API

>内置所有 ant design vue form 的属性,[文档](https://antdv.com/components/form-cn)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|title|弹窗,抽屉标题|`string`|`''`|
|visible(v-model)|弹窗,抽屉是否显示|`boolean`|`false`|
|data(v-model)|表单数据|`object`|`{}`|
|loading|表单加载状态|`boolean`|`false`|
|width|弹窗,抽屉宽度|`number` \|`string` |`800`|
|columns [文档](./columnItem.md)|表单字段|`columnItem[]`|`[]`|
|useDrawer|是否使用抽屉|`boolean`|`false`|
|colSpan|表单字段占比|`number`|`12`|
|noDrawerOrModal|是否不使用弹窗,抽屉|`boolean`|`false`|

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
|ok|点击确定按钮|`data`|
|cancelFunc|点击取消按钮|无|

# proField 库

<div style="display: flex;justify-content: center;" >
<img src="https://article.biliimg.com/bfs/article/b2fca8e0d573c6c4b23f8dbefc656b3bb845a6f8.png" width="200">
</div>

- github: [vite-npm](https://github.com/ylw1997/vite-npm)

- proField 是一系列基于 ant design vue 的 组件库

- 旨在提供一套快速生成增删改查,表单,弹窗,上传组件,以及一些常用的 hooks 和工具函数

- 使用前需要安装`vue`, `ant-design-vue` 库

- 富文本编辑器封装: [profield-editor](https://www.npmjs.com/package/profield-editor)

## 内置组件

- `proField` 组件，统一 proForm,proTable 的字段 [proField](./docs/proField.md)。

- `proForm` 组件,用于生成弹窗表单,抽屉表单,普通表单 [proForm](./docs/proForm.md)。

- `proTable` 组件,用于生成表格以及查询和工具栏 [proTable](./docs/proTable.md)。

- `proPanel` 组件,用于生成弹窗和抽屉 [proPanel](./docs/proPanel.md) 。

- `lookField`组件,用来查看,复制数据 [lookField](./docs/lookField.md) 。

## 内置类型

- `ColumnsTypes` 表格字段类型集合 [ColumnsTypes](./docs/types.md#说明) 。

- `columnItem` 表格字段定义接口类型 [columnItem](./docs/types.md#定义) 。

- `ValidateType` 表单验证类型 [ValidateType](./docs/types.md#定义) 。

## 内置钩子

- `useTable` 表格钩子 [useTable](./docs/useTable.md) 。

- `useAjax` 请求钩子 [useAjax](./docs/useAjax.md) 。

- `useAjaxSim` 请求钩子简化板 [useAjaxSim](./docs/useAjax.md#useajaxsim-hook) 。

- `useModel` 弹窗钩子[useModal](./docs/useModel.md) 。

- `usePage` 分页钩子 [usePage](./docs/usePage.md) 。

## 安装

```bash
npm install profield
```

## 在项目中使用

```js
import { columnItem, proTable, proForm, usePage, useModel } from "profield";
```

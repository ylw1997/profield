# proTable 组件

- proTable 是一系列基于 ant design vue 的 组件库

- 旨在提供一套快速生成增删改查组件

- 注意: 所有属性都会透传给表格组件

## 引入

```js
import { proTable } from "profield";
```

## 使用

```html
<proTable
  v-model:columns="columns"
  :dataSource="tableData"
  :loading="tableLoading"
  v-model:pagination="pagination"
  rowKey="id"
  :rowskeys="false"
  @reset="(val) => changeParamsCleanPage(val)"
  @search="(val) => changeParamsCleanPage(val)"
>
  <template #actionLeft>
    <button v-p="'system:dept:add'" type="primary" @click="add">
      新增规格
    </button>
  </template>
  <template #bodyCell="{ column, record }">
    <template v-if="column.dataIndex == 'action'">
      <a class="mr10" v-p="'system:dept:edit'" @click="edit(record)">编辑</a>
      <a class="mr10" v-p="'goods:category:update'" @click="look(record)"
        >查看下级</a
      >
      <Popconfirm title="确定删除吗?" @confirm="delFunc(record.id)">
        <a v-p="'system:dept:remove'" class="redtext">删除</a>
      </Popconfirm>
    </template>
  </template>
</proTable>
```
## API

>内置所有 ant design vue table 的属性,[文档](https://antdv.com/components/table-cn)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|columns(v-model) [文档](./columnItem.md)|表格列配置|`columnItem[]`|`[]`|
|dataSource|表格数据|`any[]`|`[]`|
|loading|表格加载状态|`boolean`|`false`|
|pagination(v-model)|分页配置|`TablePaginationConfig`|`{}`|
|rowskeys(v-model)|表格选中的列,false关闭|`Array` \| `Boolean`|`false`|
|rowKey|表格行 key 的取值，可以是字符串或一个函数|`string`|`'key'`|
|showSearch|是否显示搜索栏|`boolean`|`true`|
|showAction|是否显示操作栏|`boolean`|`true`|
|showTable|是否显示表格|`boolean`|`true`|
|customRow|自定义行属性[文档](https://antdv.com/components/table-cn#customRow-%E7%94%A8%E6%B3%95)|`Function`|`null`|
|rowClassName|自定义行类名|`Function(record, index):string`|`null`|
|customSize|自定义表格大小|`'small'` \| `'middle'` \| `'large'`|`'middle'`|
|defaultExpandAllRows|默认展开所有行|`boolean`|`false`|

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
|reset|重置事件|`data`|
|search|搜索事件|`data`|
|formDataChange|表单数据变化事件|`data`|

## 插槽

| 名称 | 说明 |
| --- | --- |
|searchForm|搜索栏插槽|
|actionLeft|操作栏左侧插槽|
|actionRight|操作栏右侧插槽|
|tab|tab栏插槽|
|bodyCell|表格内容插槽|
|expandedRowRender|展开行插槽|
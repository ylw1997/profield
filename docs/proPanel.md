# proPanel 组件

- proPanel 组件,用于生成弹窗和抽屉。

## 用法

```js
import { proPanel } from "profield";
```

## 使用

```html
<proPanel
  :width="width"
  :visible="visible"
  title="商品详情"
  @cancel="cancel()"
  @ok="submit"
  :use-drawer="useDrawer"
  :confirm-loading="addloading || updateloading || loading"
>
  <Spin :spinning="loading">
    <proEditor :upload-func="upload" v-model:value="editorData" />
  </Spin>
</proPanel>
```

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
|width|宽度|`number`|`1000`|
|visible(v-model)|是否显示|`boolean`|`false`|
|title|标题|`string`|`''`|
|confirmLoading|确定按钮加载状态|`boolean`|`false`|
|useDrawer|是否使用抽屉|`boolean`|`false`|
|destroyOnClose|关闭时销毁|`boolean`|`false`|
|noDrawerOrModal|不使用抽屉和弹窗|`boolean`|`false`|

## 事件

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
|ok|点击确定按钮|`() => void`|
|cancel|点击取消按钮|`() => void`|

## Slots

| 名称 | 说明 |
| --- | --- |
|default|内容|
|footer|底部内容,只在Drawer可用|
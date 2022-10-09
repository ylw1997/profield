# columnItem 类型

## 说明

columnItem 是表格字段定义接口类型

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| title | 列名 | `string` |
| dataIndex | 字段名 | `string` |
| notShowInSearch | 是否展示在查询表单 | `boolean` |
| notShowInAddOrEdit | 不在添加或编辑的时候展示 | `boolean` |
| notShowInTable | 不在表格显示 | `boolean` |
| required | 不是必须 | `boolean` |
| type | 字段类型 | `ColumnsTypes` |
| onChangeValue | 值改变时的回调 | `(fromData: any, ...value: any) => void` |
| ValidateType | 表单验证类型 | `ValidateType` |
| editNoRequired | 编辑不用强制要求 | `boolean` |
| rules | 表单验证规则 | `RuleObject` |
| span | 占据的列数 | `number` |
| condition | 满足条件才显示 | `(formModel: any) => boolean` |
| options | 下拉选择框 | `DefaultOptionType[]` |
| rangeDateKeyArray | 时间范围的key | `[string, string]` |
| cascaderKeyArray | 级联选择后的对应字段 | `string[]` |
| slot | 插槽名称 | `string` |
| tips | 提示信息 | `string` |
| [str: string] |  | `any` |


## 定义

```ts
export interface columnItem extends ColumnType {
  title: string; // 列名
  dataIndex: string; // 字段名
  notShowInSearch?: boolean; //是否展示在查询表单
  notShowInAddOrEdit?: boolean; //不在添加或编辑的时候展示
  notShowInTable?: boolean; //不在表格显示
  required?: boolean; //不是必须
  type?: ColumnsTypes; //字段类型
  onChangeValue?: (fromData: any, ...value: any) => void; // 值改变时的回调
  ValidateType?: ValidateType; //表单验证类型
  editNoRequired?: boolean; //编辑不用强制要求
  rules?: RuleObject; //表单验证规则
  span?: number; //占据的列数
  condition?: (formModel: any) => boolean; //满足条件才显示
  options?: DefaultOptionType[]; //下拉选择框
  rangeDateKeyArray?: [string, string]; //时间范围的key
  cascaderKeyArray?: string[]; //级联选择后的对应字段
  slot?: string; //插槽名称
  tips?: string; //提示信息
  [str: string]: any;
}
```

字段类型

```ts
export type ColumnsTypes =
  | "text"
  | "password"
  | "number"
  | "textarea"
  | "select"
  | "radio"
  | "checkbox"
  | "date"
  | "daterange"
  | "cascader"
  | "upload"
  | "custom";
```

验证类型

```ts
export declare type RuleType = "string" | "number" | "boolean" | "method" | "regexp" | "integer" | "float" | "object" | "enum" | "date" | "url" | "hex" | "email";

export type ValidateType  = RuleType | "any";
```
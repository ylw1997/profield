/*
 * @Author: YangLiwei
 * @Date: 2022-06-27 10:13:31
 * @LastEditTime: 2022-09-29 13:57:12
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proTable.tsx
 * @Description: 表格封装
 */
import { defineComponent, ref, Prop } from "vue";
import tableAction from "./tableAction";
import SelectColumns from "./selectColumns";
import SearchForm from "./searchForm.vue";
import {
  Alert,
  Dropdown,
  Menu,
  Space,
  Table,
  TablePaginationConfig,
  Tooltip,
} from "ant-design-vue";
import { GetComponentProps } from "ant-design-vue/lib/vc-table/interface";
import {
  ColumnHeightOutlined,
  RedoOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";
import { SizeType } from "ant-design-vue/es/config-provider";
import { MenuClickEventHandler } from "ant-design-vue/lib/menu/src/interface";
import useTable from "../hooks/useTable";
import { columnItem } from "../types";
import { TableColumns } from '../utils/index';
export default defineComponent({
  name:"proTable",
  components: {
    tableAction,
  },
  props: {
    dataSource: { type: Array, default: () => [] },
    loading: {
      type: Boolean,
      default: () => false,
    },
    pagination: {
      type: [Object, Boolean],
      default: () => {
        return {
          current: 1, //初始页
          pageSize: 10, //分页大小
          total: 0, //数据总数
        };
      },
    } as Prop<false | TablePaginationConfig | undefined>,
    rowskeys: {
      type: [Array, Boolean],
      default: () => false,
    },
    columns: {
      type: Array,
      default: () => [],
    } as columnItem[] | any,
    rowKey: {
      type: String,
      default: "id",
    },
    showSearch: {
      type: Boolean,
      default: () => true,
    },
    showAction: {
      type: Boolean,
      default: () => true,
    },
    showTable: {
      type: Boolean,
      default: () => true,
    },
    customRow: {
      type: Function,
    } as Prop<GetComponentProps<any> | undefined>,
    rowClassName: {
      type: Function,
    } as Prop<any>,
    customSize: {
      type: String,
      default: () => "middle",
    } as Prop<SizeType>,
    defaultExpandAllRows: {
      type: Boolean,
      default: () => false,
    },
  },
  emits: [
    "update:rowskeys",
    "update:pagination",
    "update:columns",
    "formDataChange",
    "search",
    "reset",
  ],
  setup(props, { slots, emit, attrs }) {
    const sourceColumns = ref<columnItem[]>(TableColumns(props.columns));
    const { onSelectChange, handleTableChange, SelectedRowKeys } =
      useTable(emit);
    const showSerach = ref(true);
    const SearchFormData = ref({});
    const TableSize = ref<SizeType>(props.customSize);
    // 改变表格尺寸
    const SelectSize: MenuClickEventHandler = (size) => {
      TableSize.value = size.key as SizeType;
    };
    return () => (
      <div>
        {/* 搜索栏 */}
        {props.showSearch && (
          <SearchForm
            loading={props.loading}
            v-show={showSerach.value}
            class="mt-2 mb-2"
            column={props.columns}
            onSearch={(val: object) => emit("search", val)}
            onReset={(val: string) => emit("reset", val)}
            onChangeData={(val: object) => {
              SearchFormData.value = val;
              emit("formDataChange", val);
            }}
            v-slots={{
              default: slots.searchForm,
            }}
          />
        )}
        {/* 表格工具栏 */}
        {props.showAction && (
          <tableAction
            v-slots={{
              left: () => (
                <Space>
                  {slots.actionLeft ? slots.actionLeft() : <div></div>}
                  {SelectedRowKeys.value.length > 0 && (
                    <Alert
                      type="info"
                      banner
                      message={`已选择 ${SelectedRowKeys.value.length} 条数据`}
                      closable
                      onClose={() => (SelectedRowKeys.value = [])}
                      v-slots={{
                        closeIcon: () => (
                          <a style={{ fontSize: "14px" }}>清空</a>
                        ),
                      }}
                    ></Alert>
                  )}
                </Space>
              ),
              right: () => (
                <Space style={{ fontSize: "18px" }} size={18}>
                  {slots.actionRight ? slots.actionRight() : null}
                  <Tooltip title="刷新">
                    <RedoOutlined
                      class="link-color"
                      onClick={() => emit("search", SearchFormData.value)}
                    />
                  </Tooltip>
                  <Tooltip title="查询">
                    <SearchOutlined
                      class="link-color"
                      onClick={() => (showSerach.value = !showSerach.value)}
                    />
                  </Tooltip>
                  <Tooltip title="密度">
                    <Dropdown
                      trigger={["click"]}
                      v-slots={{
                        overlay: () => (
                          <Menu
                            onClick={SelectSize}
                            selectedKeys={
                              TableSize.value
                                ? [TableSize.value.toString()]
                                : []
                            }
                          >
                            <Menu.Item key="large">默认</Menu.Item>
                            <Menu.Item key="middle">中等</Menu.Item>
                            <Menu.Item key="small">紧凑</Menu.Item>
                          </Menu>
                        ),
                      }}
                    >
                      <ColumnHeightOutlined class="link-color" />
                    </Dropdown>
                  </Tooltip>
                  <Tooltip title="字段">
                    <SelectColumns
                      class="link-color"
                      rowKey={props.rowKey}
                      columns={sourceColumns.value}
                      onChange={(val: any) => emit("update:columns", val)}
                    />
                  </Tooltip>
                </Space>
              ),
            }}
          />
        )}
        {slots.tab ? slots.tab() : ""}
        {/* 表格 */}
        {props.showTable && (
          <Table
            class="mt-3"
            {...props}
            {...attrs}
            size={TableSize.value}
            columns={TableColumns(props.columns)}
            onChange={handleTableChange}
            row-selection={
              props.rowskeys
                ? {
                    selectedRowKeys: props.rowskeys,
                    onChange: (selectedRowKeys: Array<number | string>) =>
                      onSelectChange(selectedRowKeys, props.pagination),
                  }
                : null
            }
            v-slots={{
              bodyCell: slots.bodyCell ? slots.bodyCell : null,
              expandedRowRender: slots.expandedRowRender
                ? slots.expandedRowRender
                : null,
            }}
          />
        )}
      </div>
    );
  },
});

/*
 * @Author: YangLiwei
 * @Date: 2022-06-27 10:13:31
 * @LastEditTime: 2022-11-08 17:41:42
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proTable.tsx
 * @Description: 表格封装
 */
import { defineComponent, ref, Prop, computed, watchEffect } from "vue";
import tableAction from "./tableAction";
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
import { TableColumns, TableColumnSelected } from "../utils/index";
import { DefaultRecordType } from "ant-design-vue/es/vc-table/interface";
import ColumnPicker from "./ColumnPicker";
export default defineComponent({
  name: "proTable",
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
    } as Prop<columnItem[]>,
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
    } as Prop<GetComponentProps<DefaultRecordType> | undefined>,
    rowClassName: {
      type: Function,
    } as Prop<(record: unknown, index: number) => string>,
    customSize: {
      type: String,
      default: () => "middle",
    } as Prop<SizeType>,
    defaultExpandAllRows: {
      type: Boolean,
      default: () => false,
    },
    defaultColumnSelected: {
      type: Array,
      default: () => [],
    } as Prop<string[]>,
  },
  emits: [
    "update:rowskeys",
    "update:pagination",
    "update:columns",
    "update:defaultColumnSelected",
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
    // 选择表格字段
    const ColumnPickerChange = ({ columns, targetKeys }: { columns: columnItem[]; targetKeys: string[] }) => {
      emit("update:columns", columns);
      emit("update:defaultColumnSelected", targetKeys);
    };
    // 计算表格字段
    const DefaultSelectKeys = computed(() => {
      if (props.defaultColumnSelected && props.defaultColumnSelected.length) {
        return props.defaultColumnSelected;
      } else {
        return props.columns ? props.columns.map((item) => item.dataIndex) : [];
      }
    });

    watchEffect(()=>{
      if(props.rowskeys && props.rowskeys instanceof Array && props.rowskeys.length==0){
        SelectedRowKeys.value = [];
      }
    });

    return () => (
      <div>
        {/* 搜索栏 */}
        {props.showSearch && (
          <SearchForm
            loading={props.loading}
            v-show={showSerach.value}
            style={{
              margin: "5px 0"
            }}
            column={TableColumnSelected(props.columns, props.defaultColumnSelected)}
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
                      onClose={() => (SelectedRowKeys.value = [], emit("update:rowskeys", []))}
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
                  {props.showSearch && <Tooltip title="查询">
                    <SearchOutlined
                      class="link-color"
                      onClick={() => (showSerach.value = !showSerach.value)}
                    />
                  </Tooltip>}
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
                    <ColumnPicker
                      defaultSelected={DefaultSelectKeys.value}
                      columns={sourceColumns.value}
                      onChange={ColumnPickerChange}
                      v-slots={{
                        titleRight: slots.columnSelectTitleRight ? slots.columnSelectTitleRight : null
                      }}
                    />
                  </Tooltip>
                </Space>
              ),
            }}
          />
        )}
        {slots.tab ? slots.tab() : ""}
        {/* 表格 */}
        {props.showTable && DefaultSelectKeys.value.length > 0 ? (
          <Table
            {...props}
            {...attrs}
            size={TableSize.value}
            columns={TableColumnSelected(props.columns, props.defaultColumnSelected)}
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
        ) : (
          <Table
            {...props}
            {...attrs}
            size={TableSize.value}
            columns={TableColumnSelected(props.columns, props.defaultColumnSelected)}
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
          />
        )}
      </div>
    );
  },
});

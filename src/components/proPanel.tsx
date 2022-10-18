/*
 * @Author: YangLiwei
 * @Date: 2022-07-11 14:13:54
 * @LastEditTime: 2022-10-18 13:43:26
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\proPanel.tsx
 * @Description:
 */
import { Modal, Drawer, Button } from "ant-design-vue";
import { defineComponent, Prop } from "vue";
export default defineComponent({
  name:"proPanel",
  props: {
    width: {
      type: [Number, String],
      default: () => 1000,
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
    title: {
      type: String,
      default: () => "",
    },
    onCancel: {
      type: Function,
      default: () => null,
    } as Prop<(any: MouseEvent) => void>,
    onOk: {
      type: Function,
      default: () => null,
    } as Prop<(event: MouseEvent) => void>,
    confirmLoading: {
      type: Boolean,
      default: () => false,
    },
    useDrawer: {
      type: Boolean,
      default: () => false,
    },
    destroyOnClose: {
      type: Boolean,
      default: () => true,
    },
    noDrawerOrModal: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { slots }) {
    return () => {
      if (props.noDrawerOrModal && slots.default) {
        return slots.default();
      }
      if (props.useDrawer) {
        return (
          <Drawer
            width={props.width}
            destroyOnClose={props.destroyOnClose}
            visible={props.visible}
            title={props.title}
            footerStyle={{ textAlign: "right" }}
            onClose={props.onCancel}
            v-slots={{
              default: slots.default,
              footer: () => (
                <>
                  <Button style={{marginRight:"10px"}} onClick={props.onCancel}>
                    取消
                  </Button>
                  <Button
                    loading={props.confirmLoading}
                    type="primary"
                    onClick={props.onOk}
                  >
                    确定
                  </Button>
                </>
              ),
            }}
          />
        );
      }
      return (
        <Modal
          title={props.title}
          width={props.width}
          destroyOnClose={props.destroyOnClose}
          visible={props.visible}
          onCancel={props.onCancel}
          onOk={props.onOk}
          confirmLoading={props.confirmLoading}
          v-slots={{
            default: slots.default,
          }}
        />
      );
    };
  },
});

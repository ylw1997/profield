/*
 * @Author: YangLiwei
 * @Date: 2022-07-15 10:39:32
 * @LastEditTime: 2022-11-04 11:07:13
 * @LastEditors: yangliwei 1280426581@qq.com
 * @FilePath: \vite-npm\src\components\YUpload.tsx
 * @Description:
 */
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import { Button, Upload, UploadFile } from "ant-design-vue";
import { defineComponent, Prop, ref, watch, toRaw, computed } from "vue";
import { guid } from "../utils";
import { strArrToUploadFileArr, fileArrtoStrArr } from "../utils/form";

export default defineComponent({
  name: "YUpload",
  props: {
    value: {
      type: String,
      default: () => "",
    } as Prop<string>,
    title: {
      type: String,
      default: () => "上传文件",
    },
    loading: {
      type: Boolean,
      default: () => false,
    },
    onChange: {
      type: Function,
      default: () => () => null,
    },
  },
  emits: ["update:value", "change"],
  setup(props, { emit, attrs }) {
    const fileList = ref<UploadFile[]>([]);
    const str = ref("");
    const fileChange = (obj: any) => {
      const { fileList } = toRaw(obj);
      const fileArrStr = fileArrtoStrArr(fileList);
      str.value = fileArrStr;
      emit("update:value", fileArrStr);
      emit("change", { fileList, fileArrStr });
    };

    watch(props, (val) => {
      if (val.value != "") {
        const { isAllDone, uploadFileArr } = strArrToUploadFileArr(val.value);
        if (isAllDone) {
          fileList.value = uploadFileArr;
        }
      } else if (val.value == "" && str.value != "") {
        fileList.value = [];
      }
    },{immediate:true});

    // 是否显示上传按钮
    const isShowUpload = computed(
      () =>
        (attrs.multiple &&
          attrs.maxCount &&
          fileList.value.length < (attrs.maxCount as number)) ||
        fileList.value.length == 0
    );

    const beforeUpload = (file: File) => {
      // 获取文件后缀
      const fileExt = file.name.split(".").pop();
      // 重新生成文件名
      const fileName = guid() + "." + fileExt;
      const newFile = new File([file], fileName, { type: file.type });
      return Promise.resolve(newFile);
    };

    return () => {
      return (
        <Upload
          name="file"
          v-model:file-list={fileList.value}
          onChange={fileChange}
          beforeUpload={beforeUpload}
        >
          {isShowUpload.value ? (
            attrs.listType != "picture-card" ? (
              <Button loading={props.loading}>
                {props.loading ? <LoadingOutlined /> : <UploadOutlined />}
                {props.title}
              </Button>
            ) : (
              <div>
                <PlusOutlined />
                <div style="margin-top: 8px">{props.title}</div>
              </div>
            )
          ) : null}
        </Upload>
      );
    };
  },
});

<template>
    <el-dialog
    :data="visible"
    :visible.sync="visible"
    :show-close="false"
    title="添加"
    width="50%"
    :close-on-click-modal="false">
        <el-form :model="addRight" status-icon :rules="addRule" ref="addRight" label-width="100px" class="demo-ruleForm">
            <el-form-item label="权限类型" prop="RIGHT_TYPE">
                <el-select v-model="addRight.RIGHT_TYPE" @change="change($event)" style="width:100%">
                    <el-option v-for="datelist in typeList" :key="datelist.EnumValue" :value="datelist.EnumValue" :label="datelist.EnumName"></el-option>
                </el-select>
                </el-form-item>
            <el-form-item label="权限名称" prop="RIGHT_NAME">
                <el-input type="text" v-model="addRight.RIGHT_NAME" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="权限页面样式" prop="HTML_CLASS">
                <el-input type="text" v-model="addRight.HTML_CLASS" autocomplete="off"></el-input>
            </el-form-item>
             <el-form-item label="权限顺序" prop="SORT">
                <el-input type="text" v-model="addRight.SORT" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelModal">取 消</el-button>
            <el-button type="primary" @click.native="addSumbit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { rightCreate } from "../../api/t_permission";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    
      typeList: Object
  },
  data() {
    return {
      typeList: [],
      addRight: {
        ID: "qq",
        RIGHT_NAME: "",
        RIGHT_TYPE: "",
        HTML_CLASS: "",
        SORT: ""
      },
      addRule: {
        RIGHT_NAME: [
          {
            required: true,
            message: "权限名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    initForm() {
      this.addRight = {
        ID: "qq",
        RIGHT_NAME: "",
        RIGHT_TYPE: "",
        HTML_CLASS: "",
        SORT: ""
      };
      if (this.$refs.addRight) {
        this.$refs.addRight.resetFields();
      }
    },
    cancelModal() {
      this.$emit("update:visible", false);
    },
    addSumbit: function() {
      this.$refs.addRight.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.addRight);
            rightCreate(para).then(res => {
              if (res.data.IsSuccess !== false) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.addRight = false;

                this.$refs["addRight"].resetFields();
                // 关闭弹窗，触发父组件修改visible值
                this.$emit("update:visible", false);
                // 触发$emit绑定的watchaddedit方法
                this.$emit("watchaddRight");
              } else {
                this.$message({
                  message: res.data.Msg,
                  type: "error"
                });
              }
            });
          });
        }
      });
    }
  }
};
</script>


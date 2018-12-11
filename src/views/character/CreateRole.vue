<template>
    <el-dialog
    :data="visible"
    :visible.sync="visible"
    :show-close="false"
    title="添加"
    width="50%"
    :close-on-click-modal="false">
        <el-form :model="createForm" status-icon :rules="createRule" ref="createForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="ROLE_NAME">
                <el-input type="text" v-model="createForm.ROLE_NAME" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelModal">取 消</el-button>
            <el-button type="primary" @click.native="createSumbit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import { RoleCreate } from "../../api/t_charactter";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      createForm: {
        ID: "qq",
        ROLE_NAME: ""
      },
      createRule: {
        ROLE_NAME: [
          {
            required: true,
            message: "角色名称不能为空",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    initForm() {
      this.createForm = {
        ID: "qq",
        ROLE_NAME: ""
      };
      if (this.$refs.createForm) {
        this.$refs.createForm.resetFields();
      }
    },
    cancelModal() {
      this.$emit("update:visible", false);
    },
    createSumbit: function() {
      this.$refs.createForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.createForm);
            RoleCreate(para).then(res => {
              debugger;
              if (res.data.IsSuccess !== false) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.createForm = false;

                this.$refs["createForm"].resetFields();
                // 关闭弹窗，触发父组件修改visible值
                this.$emit("update:visible", false);
                // 触发$emit绑定的watchaddedit方法
                this.$emit("watchCreate");
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


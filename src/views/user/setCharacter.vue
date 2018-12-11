<template>
     <el-dialog
        :data="visible"
        :visible.sync="visible"
        :show-close="false"
        title="设置角色"
        :close-on-click-modal="false">
            <el-form :model="formSetPart" ref="formSetPart" label-width="100px" status-icon class="demo-ruleForm">
                <el-form-item label="用户名" prop="USER_NAME">
                    <el-input v-model="formSetPart.USER_NAME"></el-input>
                </el-form-item>
                <el-form-item label="角色权限" prop="USER_ID">
                    <el-select v-model="formSetPart.ID" placeholder="请选择角色权限" style="width:100%">
                    <el-option label="管理员" value="E5CEB2B6B11F4DA3901D5B6C5D22B1D0"></el-option>
                    <el-option label="普通用户" value="b8a7da03b1ff4218a368046a00d20cf3"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="cancelModal">取 消</el-button>
                <el-button type="primary" @click.native="setPartSubmit" :loading="setPartLoading">确 定</el-button>
            </div>
        </el-dialog>
</template>
<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formSetPart: Object
  },
  data() {
    return {
      formSetPart: {
        ID: "",

        USER_ID: "",

        USER_NAME: "",

        CREATE_TIME: ""
      },
      setPartLoading: false
    };
  },
  methods: {
    initForm() {
      this.formSetPart = {
        ID: "",
        USER_ID: "",
        USER_NAME: "",
        CREATE_TIME: ""
      };
      if (this.$refs.formSetPart) {
        this.$refs.formSetPart.resetFields();
      }
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
    setPartSubmit: function() {
      this.$refs.formSetPart.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.setPartLoading = true;
            // 获取选中用户的id
            let para = this.formSetPart;
            setUsesPart(para).then(res => {
              this.setPartLoading = false;
              if (res.data.IsSuccess !== false) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              this.$refs["formSetPart"].resetFields();
              this.setParts = false;
              this.getUserList();
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


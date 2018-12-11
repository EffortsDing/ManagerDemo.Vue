<template>
        <!-- 新增 -->
        <el-dialog
        :data="visible"
        :visible.sync="visible"
        :show-close="false"
        title="新增"
        width="50%"
        :close-on-click-modal="false">
        <!-- <button type="button" aria-label="Close" class="el-dialog__headerbtn" @click.stop="cancelModal"><i class="el-dialog__close el-icon el-icon-close"></i></button> -->
            <el-form :model="addForm" status-icon :rules="addRule" ref="addForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户编码" prop="USER_ID">
                    <el-input type="text" v-model="addForm.USER_ID" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="USER_NAME">
                    <el-input type="text" v-model="addForm.USER_NAME" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="PASSWORD">
                    <el-input type="password" v-model.number="addForm.PASSWORD"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelModal">取 消</el-button>
                <el-button type="primary" @click.native="addSumbit" :loading="addLoading">确 定</el-button>
            </div>
        </el-dialog>
</template>

<script>
import { UserCreate } from "../../api/api";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 是否显示
      addFormVisible: false,
      addLoading: false,

      addForm: {
        ID: "123",
        USER_ID: "",
        USER_NAME: "",
        CREATE_TIME: ""
      },
      addRule: {
        USER_ID: [
          {
            required: true,

            message: "请输入用户编号",

            trigger: "blur"
          }
        ],

        USER_NAME: [
          {
            required: true,

            message: "请输入用户姓名",

            trigger: "blur"
          }
        ],

        PASSWORD: [
          {
            required: true,

            message: "请输入密码",

            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    initForm() {
      this.addForm = {
        ID: "123",
        USER_ID: "",
        USER_NAME: "",
        CREATE_TIME: ""
      };
      if (this.$refs.addForm) {
        this.$refs.addForm.resetFields();
      }
    },
    cancelModal() {
      // 关闭弹窗，触发父组件修改visible值
      this.$emit("update:visible", false);
    },
    //  表单填充无错误需调用父窗体的getlistpaga() 刷新父组件table的内容
    addSumbit: function() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗？", "提示", {}).then(() => {
            this.addLoading = true;
            let para = Object.assign({}, this.addForm);
            UserCreate(para).then(res => {
              this.addLoading = false;
              if (res.data.IsSuccess !== false) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
                this.$refs["addForm"].resetFields();
                // 关闭弹窗，触发父组件修改visible值
                this.$emit("update:visible", false);
                // 触发$emit绑定的watchaddedit方法
                this.$emit("watchaddedit");
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


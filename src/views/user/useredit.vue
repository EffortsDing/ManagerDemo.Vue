<template>
    <!-- 修改 -->
    <el-dialog
    :data="visible"
    :visible.sync="visible"
    :show-close="false"
    title="修改"
    width="50%"
    :close-on-click-modal="false">
        <el-form :model="editForm" status-icon :rules="editRule" ref="editForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户编码" prop="USER_ID">
                <el-input type="text" v-model="editForm.USER_ID" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="USER_NAME">
                <el-input type="text" v-model="editForm.USER_NAME" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="PASSWORD" autocomplete="off">
                <el-input type="PASSWORD" v-model.number="editForm.PASSWORD">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass" autocomplete="off">
                <el-input type="password" v-model="editForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelModal">取 消</el-button>
            <el-button type="primary" @click.native="editSumbit">确 定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {
  UserEdit 
} from "../../api/api";
export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    editForm: Object
  },
  data() {
       // 判断两次密码是否一致
      var isxt =  (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.editForm.PASSWORD) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
    return {
      // 修改表单
      editForm: {
        ID:"",

        USER_ID: "",

        USER_NAME: "",

        CREATE_TIME: "",

        checkPass: ""
      },
     
      editLoading: false,
      editRule: {
        USER_ID: [
          { required: true, message: "用户编号不能为空", trigger: "blur" }
        ],
        PASSWORD: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        USER_NAME: [
          { required: true, message: "用户姓名不能为空", trigger: "blur" }
        ],
        checkPass: [
            { validator: isxt, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
      initForm() {
      this.editForm = {
        ID:"",
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
    editSumbit: function() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.$confirm("确认提交吗?", "提示", {}).then(() => {
            this.editLoading = true;
            let para = Object.assign({}, this.editForm);
            UserEdit(para).then(res => {
              this.editForm = false;
              if (res.data.IsSuccess !== false) {
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              this.$refs["editForm"].resetFields();
              // 关闭弹窗，触发父组件修改visible值
              this.$emit("update:visible", false);
              // 触发$emit绑定的watchaddedit方法
              this.$emit("watchuseredit");
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

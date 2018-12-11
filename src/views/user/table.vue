<template>
    <section>
    
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
    
            <el-form :inline="true" :model="filters">
               <el-form-item class="">
    
                    <el-input v-model="filters.USER_ID" placeholder="用户编号"></el-input>
    
                </el-form-item>
    
                <el-form-item class="">
    
                    <el-input v-model="filters.USER_NAME" placeholder="用户姓名"></el-input>
    
                </el-form-item>
    
                <el-form-item class="">
    
                    <el-button type="primary" v-on:click="getUserList">查询</el-button>
    
                </el-form-item>
    
                <el-form-item class="">
    
                    <el-button type="primary" @click="handleAdd('addedit')">新增</el-button>
    
                </el-form-item>
    
                <!-- <el-form-item class="">
    
                    <el-button type="primary" @click="handleEdit">修改</el-button>
    
                </el-form-item> -->
    
                <el-form-item class="">
    
                    <el-button type="primary" @click="handleSetPart('setCharacter')">设置角色</el-button>
    
                </el-form-item>
    
    
    
            </el-form>
    
        </el-col>
    
        <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
    
        <!-- 用户列表 -->
    
        <el-table :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
    
    
    
            </el-table-column>
    
            <el-table-column prop="USER_ID" label="用户编码" width="180">
    
            </el-table-column>
    
            <el-table-column prop="USER_NAME" label="姓名" width="180">
    
            </el-table-column>
    
            <el-table-column prop="CREATE_TIME"  :formatter="dateFormat" label="创建日期">
    
            </el-table-column>
    
            <el-table-column label="操作" width="150">
    
                <template slot-scope="scope">
    
                    <el-button size="small" @click="handleEdit('useredit',scope.$index, scope.row)">编辑</el-button>
    
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                  </template>
              </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="total,prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
    <addedit ref="addedit" v-if="addeditVisible" :visible.sync="addeditVisible" @watchaddedit="getUserList"></addedit>  
    <useredit  ref="useredit" v-if="usereditVisible" :visible.sync="usereditVisible" :editForm.sync="editForm" @watchuseredit="getUserList"></useredit>
    <setCharacter ref="setCharacter" v-if="setCharacterVisible" :visible.sync="setCharacterVisible" :formSetPart.sync="formSetPart"></setCharacter>
    </section>
</template>

<script>
import { editUser, delUser, userIndex, userDelete } from "../../api/api";

import util from "../../common/js/utils";
import addedit from "./addedit.vue";
import useredit from "./useredit.vue";
import setCharacter from "./setCharacter.vue";
export default {
  data() {
    return {
      setCharacterVisible: false,
      formSetPart: {
        ID: "",

        USER_ID: "",

        USER_NAME: "",

        CREATE_TIME: ""
      },
      listLoading: false,
      listLoding: false,
      pagesize: 20,
      sels: [], //列表选中列

      tableData: [],

      formInline: {
        //表单？

        user: "",

        region: ""
      },

      // 查询条件参数name

      filters: {
        USER_ID: "",
        USER_NAME: ""
      },

      page: 1,

      total: 0,

      listQuery: {
        //分页

        limit: 20,

        USER_NAME: undefined,

        PASSWORD: undefined,

        USER_ID: undefined
      },

      // 表单数据

      ruleForm2: {
        USER_ID: "",

        USER_NAME: "",

        PASSWORD: ""
      },
      // 修改表单
      editForm: {
        ID: "",

        USER_ID: "",

        USER_NAME: "",

        CREATE_TIME: ""
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
          { required: true, message: "用户编号不能为空", trigger: "blur" }
        ]
      },

      // 新增界面是否显示
      addeditVisible: false,

      // 编辑界面是否显示
      usereditVisible: false,
      editFormVisible: false,

      editForm: {
        ID: "",

        USER_ID: "",

        USER_NAME: "",

        CREATE_TIME: ""
      },

      rules2: {
        USER_NAME: [
          {
            required: true,

            message: "请输入姓名",

            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 时间格式化
    dateFormat: function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
      // 把时间戳改为date类型的时间
      var columnDate = new Date(
        parseInt(date.replace("/Date(", "").replace(")/", ""), 10)
      );
      return util.formatDate.format(columnDate, "yyyy-MM-dd hh:mm:ss");
    },

    getList() {},
    // grid refresh
    getUserList() {
      var _this = this;
      // 参数
      var para = {
        pagesize: _this.pagesize,
        pageindex: _this.page,
        userid: this.filters.USER_ID,
        username: this.filters.USER_NAME
      };
      _this.listLoding = true;
      // axios调用getUserLispage
      userIndex(para)
        .then(res => {
          this.total = res.data.total;
          this.tableData = res.data.rows;
          console.log(this.tableData);
          this.listLoading = false;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    handleAdd(refForm) {
      if (this.$refs[refForm]) {
        this.$refs[refForm].initForm();
      }
      debugger;
      this.addeditVisible = !this.addeditVisible;
    },
    // 用户修改
    handleEdit(refForm, index, row) {
      if (this.$refs[refForm]) {
        this.$refs[refForm].initForm();
      }
      this.usereditVisible = !this.usereditVisible;
      // 获取当前行的数据
      this.editForm = Object.assign({}, row);
    },

    handleSetPart(refForm) {
      // 设置角色
      // 获取选中的id
      var sel = this.sels
        .map(item => item.ID)
        .toString()
        .split(",");
      // 根据选中id调用查询关联表中id对应的权限id  重要
      if (sel.length === 1 && sel[0] !== "") {
        if (this.$refs[refForm]) {
          // 调用子组件中的initFrom
          this.$refs[refForm].initForm();
        }
        this.setCharacterVisible = !this.setCharacterVisible;
        this.formSetPart = this.sels.map(item => item)[0];
      } else {
        alert("请选中一行设置角色权限");
      }
    },

    // 用户删除
    handleDel(index, row) {
      this.$confirm("确认删除数据吗？", "提示", {
        type: "warning"
      }).then(() => {
        let para = { ID: row.ID };
        userDelete(para).then(res => {
          this.listLoading = false;
          if (res.data.IsSuccess !== false) {
            this.$message({
              message: "删除成功",
              type: "success"
            });
            this.getUserList();
          } else {
            this.$message({
              message: res.data.Msg,
              type: "warning"
            });
          }
        });
      });
    },
    // 存在问题
    batchRemove: function() {
      // 获取table选中值得id
      // var sel = this.sels
      //   .map(item => item.ID)
      //   .toString()
      //   .split(",");
      // this.$confirm("确认删除所选数据吗？", "提示", { type: "warning" }).then(
      //   () => {
      //     this.listLoading = true;
      //     let para = { ID: sel };
      //     userDelete(para).then(res => {
      //       this.listLoading = false;
      //       this.$message({
      //         message: "批量删除成功",
      //         type: "success"
      //       });
      //       this.getUserList();
      //     });
      //   }
      // );
    },
    // 翻页
    handleCurrentChange(val) {
      this.page = val;

      this.getUserList();
    },
    // 选择数据
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.getUserList();
  },
  components: {
    addedit: addedit,
    useredit: useredit,
    setCharacter: setCharacter
  }
};
</script>


<style lang="scss" scoped>
.toolbar {
  background: #f2f2f2;

  padding: 10px;

  //border:1px solid #dfe6ec;

  margin: 10px 0px;

  .el-form-item {
    margin-bottom: 10px;
  }
}
</style>

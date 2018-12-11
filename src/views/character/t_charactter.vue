<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters">
				<el-form-item class="">
					<el-input v-model="filters.ROLE_NAME" placeholder="角色名称"></el-input>
				</el-form-item>
				<el-form-item class="">
					<el-button type="primary" v-on:click="getParts">查询</el-button>
				</el-form-item>
				<el-form-item class="">
					<el-button type="primary" @click="handleAdd('CreateRole')">添加</el-button>
				</el-form-item>
                <el-form-item class="">
					<el-button type="primary" @click="handleEdit('updateRole')">编辑</el-button>
				</el-form-item>
                 <el-form-item class="">
					<el-button type="primary" @click="handleDelete">删除</el-button>
				</el-form-item>
                 <el-form-item class="">
					<el-button type="primary" @click="handleSetRole">设置权限</el-button>
				</el-form-item>
                
			</el-form>
		</el-col>
        <!-- <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col> -->
        <!-- 用户列表 -->
        <el-table
        :data="tableData"
        @selection-change="selsChange"
        v-loading="listLoading"
        border style="width: 100%">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column
            prop="ROLE_NAME"
            label="角色名称">
            </el-table-column>
             <el-table-column
            prop="CREATE_TIME"
            :formatter ="dateFormat"
            label="创建日期">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        	<el-col :span="24" class="toolbar">
			<el-pagination  layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
       <CreateRole ref="CreateRole" v-if="addRoleVisible" :visible.sync="addRoleVisible" @watchCreate="getRoleList"></CreateRole>  
       <updateRole  ref="updateRole" v-if="updateRoleVisible" :visible.sync="updateRoleVisible" :updateForm.sync="updateForm" @watchuseredit="getRoleList"></updateRole>
    </section>
</template>

<script>
import { RoleIndex,RoleDel  } from "../../api/t_charactter";
import util from "../../common/js/utils";
import CreateRole from "./CreateRole.vue";
import updateRole from "./updateRole.vue";
export default {
  data() {
    return {
      updateForm: {
        ID: "",
        ROLE_NAME: ""
      },
      sels: [],
      updateRoleVisible: false,
      addRoleVisible: false,
      listLoading: false,
      tableData: [],
      filters: {
        ROLE_NAME: ""
      },
      //分页
      pagesize: 20,
      total: 0,
      page: 1,
      listQuery: {
        limit: 20,
        ROLE_NAME: undefined,
        CREATE_TIME: undefined
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

    getRoleList() {
      var para = {
        pagesize: this.pagesize,
        pageindex: this.page,
        rolename: this.filters.ROLE_NAME
      };
      RoleIndex(para)
        .then(res => {
          this.total = res.data.total;
          this.tableData = res.data.rows;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    handleAdd(refForm) {
      //用户新增
      if (this.$refs[refForm]) {
        this.$refs[refForm].initForm();
      }
      debugger;
      this.addRoleVisible = !this.addRoleVisible;
    },
    handleEdit(refForm) {
      var sel = this.sels
        .map(item => item.ID)
        .toString()
        .split(",");
      if (sel.length === 1 && sel[0] !== "") {
        if (this.$refs[refForm]) {
          // 调用子组件中的initFrom
          this.$refs[refForm].initForm();
        }
        this.updateRoleVisible = !this.updateRoleVisible;
        this.updateForm = this.sels.map(item => item)[0];
      } else {
        alert("请选中一行设置角色权限");
      }
    },
    handleDelete() {
      //用户删除
      // 获取选中行id
      var RoleID = this.sels
        .map(item => item.ID)
        .toString()
      this.$confirm("确认删除所选数据吗？", "提示", { type: "warning" }).then(
        () => {
          this.listLoading = true;
          let para = { ID: RoleID };
          RoleDel(para).then(res => {
            this.listLoading = false;
            if (res.data.IsSuccess !== false) {
              this.$message({
                message: "提交成功",
                type: "success"
              });
            } else {
              this.$message({
                message: res.data.Msg,
                type: "error"
              });
            }
            this.getRoleList();
          });
        }
      );
    },
    handleSetRole() {},
    // 查询
    getParts() {
      this.getRoleList();
    },
    // 分页点击刷新table
    handleCurrentChange(val) {
      this.page = val;
      this.getRoleList();
    },
    // 选中行数据
    selsChange: function(sels) {
      this.sels = sels;
    }
  },
  mounted() {
    this.getRoleList();
  },
  components: {
    CreateRole: CreateRole,
    updateRole: updateRole
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

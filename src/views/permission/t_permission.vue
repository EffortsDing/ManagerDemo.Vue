<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-input v-model="filters.RIGHT_NAME" placeholder="权限名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.RIGHT_TYPE" style="width:130px" @change="change($event)">
                        <el-option v-for="datelist in typeList" :key="datelist.EnumValue" :value="datelist.EnumValue" :label="datelist.EnumName"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model="filters.PARENT_ID" style="width:130px">
                        <el-option v-for="listRole in roleList" :key="listRole.Key" :value="listRole.Key" :label="listRole.Value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getPerList" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleAdd('addRight')">增加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleEdit">编辑</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleDel">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="RightSetRightresource">设置权限资源</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
       <el-table :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="RIGHT_TYPEName"   label="权限类型">
            </el-table-column>
            <el-table-column prop="RIGHT_NAME" label="权限名称" >
            </el-table-column>
            <el-table-column prop="CONTROLLER" label="对应权限的控制器">
            </el-table-column>
            <el-table-column prop="ACTION"   label="对应权限的方法">
            </el-table-column>
            <el-table-column prop="PARENT"   label="所属权限">
            </el-table-column>
            <el-table-column prop="HTML_BUTTON_ID"   label="按钮权限在页面id">
            </el-table-column>
            <el-table-column prop="HTML_CLASS"   label="权限在页面样式">
            </el-table-column>
            <el-table-column prop="SORT"   label="权限顺序">
            </el-table-column>
            <el-table-column prop="CREATE_TIME"  :formatter="dateFormat" label="创建时间">
            </el-table-column>
       </el-table>
    
    <el-col :span="24" class="toolbar">
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right">

        </el-pagination>
    </el-col>
    
    <addRight ref="addRight" v-if="addRightVisible" :visible.sync="addRightVisible" :typeList.sync="typeList" @watchaddRight="getPerList"></addRight>
    
    
    
    </section>
</template>

<script>
import addRight from "./addRight";
import { rightType, rightParent,RightIndex } from "../../api/t_permission";
import util from "../../common/js/utils";
import Axios from "axios";
export default {
  data() {
    return {
      addRightVisible: false,
      typeList: [],
      roleList: [],
      // 分页工具
      pagesize: 10,
      total: 0,
      page: 1,

      listLoading: false,
      // 顶部表单
      filters: {
        RIGHT_NAME: "",
        RIGHT_TYPE: "",
        PARENT_ID: ""
      },
      // 表格grid数据
      tableData: [],
      // 选中行数据
      sels: []
    };
  },
  methods: {
    dateFormat: function(row, cloumn) {
      var date = row[cloumn.property];
      if (date == undefined) {
        return "";
      }
      var cloumnDate = new Date(
        parseInt(date.replace("/Date(", "").replace(")/", ""), 10)
      );
      return util.formatDate.format(cloumnDate, "yyyy-MM-dd hh:mm:ss");
    },
    getPerList() {
      // 参数
      var para = {
        pagesize: this.pagesize,
        pageindex: this.page,
        rightname: this.filters.RIGHT_NAME,
        righttype: this.filters.RIGHT_TYPE,
        parentid: this.filters.PARENT_ID
      };
      this.listLoading = true;
      // 调用api
      RightIndex(para).then(res => {
        this.total = res.data.total;
        this.tableData = res.data.rows;
        this.listLoading = false;
      });
    },
    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getPerList();
    },
    handleAdd(refForm) {
    
      if (this.$refs[refForm]) {
        this.$refs[refForm].initForm();
      }
      this.typeList = this.typeList
      this.addRightVisible = !this.addRightVisible;
    },
    handleEdit() {},
    handleDel() {},
    // 设置权限资源
    RightSetRightresource() {},
    // 获取权限类型
    getrightType: function() {
      rightType().then(res => {
        this.typeList = res.data;
      });
    },
    // 权限类型下拉框值发生变化，联动所属权限下拉框的内容
    change($event) {
      rightParent($event).then(res => {
        if ($event !== -1) {
          this.roleList = res.data.Source;
        } else {
          this.roleList = [];
        }
      });
    }
  },
  mounted() {
    this.getrightType();
    this.getPerList();
  },
  components: {
    addRight: addRight
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

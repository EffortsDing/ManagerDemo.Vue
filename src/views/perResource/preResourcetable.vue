<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true">
                <el-form-item>
                    <el-button type="primary" v-on:click="getList" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleAdd">增加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleEdit">编辑</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleDel">删除</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
       <el-table :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="CONTROLLER"   label="对应资源的的控制器">
            </el-table-column>
            <el-table-column prop="ACTION" label="对应资源的方法" >
            </el-table-column>
            <el-table-column prop="CREATE_TIME" label="创建时间">
            </el-table-column>
       </el-table>
    <el-col :span="24" class="toolbar">
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right">

        </el-pagination>
    </el-col>
    
    
    
    
    
    
    
    </section>
</template>

<script>
export default {
  data() {
    return {
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
    getList() {},
    selsChange: function(sels) {
      this.sels = sels;
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getList();
    },
    handleAdd() {},
    handleEdit() {},
    handleDel() {}
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

<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true" model="filters">
                <el-form-item>
                    <el-input v-model="filters.RIGHT_NAME" placeholder="权限名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-dropdown v-model="filters.RIGHT_TYPE" placeholder="权限类型"></el-dropdown>
                </el-form-item>
                <el-form-item>
                    <el-dropdown v-model="filters.PARENT_ID" placeholder="所属权限"></el-dropdown>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getUserList" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-input type="primary" v-on:click="getUserList">增加</el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="primary" v-on:click="getUserList">编辑</el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="primary" v-on:click="getUserList">删除</el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="primary" v-on:click="getUserList">设置权限资源</el-input>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
       <el-table :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="RIGHT_NAME" label="权限名称" >
            </el-table-column>
            <el-table-column prop="CONTROLLER" label="对应权限的控制器">
            </el-table-column>
            <el-table-column prop="ACTION"   label="对应权限的方法">
            </el-table-column>
            <el-table-column prop="PARENT_ID"   label="所属权限的主键">
            </el-table-column>
            <el-table-column prop="HTML_BUTTON_ID"   label="按钮权限在页面id">
            </el-table-column>
            <el-table-column prop="HTML_CLASS"   label="权限在页面样式">
            </el-table-column>
            <el-table-column prop="CREATE_TIME"  :formatter="dateFormat" label="创建时间">
            </el-table-column>
            <el-table-column prop="SORT"   label="权限顺序">
            </el-table-column>
            <el-table-column prop="RIGHT_TYPE"   label="权限类型">
            </el-table-column>
    </section>
</template>

<script>
export default {
  data() {
    return {
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
    getUserList() {
        
    },
    selsChange: function(sels) {
      this.sels = sels;
    }
  }
};
</script>



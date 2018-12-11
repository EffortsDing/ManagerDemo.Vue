<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true" :model="filters">
                <el-form-item label="退费日期">
                    <el-date-picker
                    v-model="tuifeiDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2" >
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="创建时间">
                    <el-date-picker
                    v-model="createDate"
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions2" style="width:250px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="提交时间">
                        <el-date-picker
                        v-model="postDate"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions2" style="width:250px">
                        </el-date-picker>
                </el-form-item>
                <el-form-item  prop="postStatus" label="提交状态">
                    <el-select v-model="filters.BILL_TYPE" placeholder="提交状态" style="width:100%">
                        <el-option label="管理员" value="E5CEB2B6B11F4DA3901D5B6C5D22B1D0"></el-option>
                        <el-option label="普通用户" value="b8a7da03b1ff4218a368046a00d20cf3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="" label="单据号">
					<el-input v-model="filters.BILLNO" placeholder="单据号"></el-input>
				</el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="exportxlsx">导出</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList" >查看明细</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleAdd">增加</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleEdit" >编辑</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="handleDel">删除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList" >提交</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
       <el-table id="out-table" :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="BILLNO"   label="单据号">
            </el-table-column>
            <el-table-column prop="CREATE_TIME" label="创建时间" >
            </el-table-column>
            <el-table-column prop="CREATE_USERID" label="创建账号">
            </el-table-column>
            <el-table-column prop="UPDATE_TIME" label="修改时间">
            </el-table-column>
            <el-table-column prop="UPDATE_USERID" label="修改账号">
            </el-table-column>
            <el-table-column prop="INPUTKIND" label="录入方式">
            </el-table-column>
            <el-table-column prop="REFUNDTYPE" label="退费类型">
            </el-table-column>
            <el-table-column prop="REFUND_TIME" label="退费日期">
            </el-table-column>
            <el-table-column prop="SIGNName" label="提交状态">
            </el-table-column>
            <el-table-column prop="SIGN_TIME" label="提交时间">
            </el-table-column>
            <el-table-column prop="SIGN_USERID" label="提交账号">
            </el-table-column>
            <el-table-column prop="AUDIT_STATEName" label="审核状态">
            </el-table-column>
            <el-table-column prop="AUDIT_TIME" label="审核时间">
            </el-table-column>
            <el-table-column prop="AUDIT_USERID" label="审核账号">
            </el-table-column>
            <el-table-column prop="REFUNDREASON" label="备注">
            </el-table-column>
       </el-table>
    <el-col :span="24" class="toolbar">
        <el-pagination layout="total, prev, pager, next" @current-change="handleCurrentChange" :page-size="pagesize" :total="total" style="float:right">

        </el-pagination>
    </el-col>
    </section>
</template>

<script>
import exportExcel from '../../common/js/exportExcel'
import util from '../../common/js/utils'
export default {
  data() {
    return {
      // 分页工具
      pagesize: 10,
      total: 0,
      page: 1,
      // 日期
      tuifeiDate: "",
      createDate: "",
      postDate: "",
      filters: {
        ID: "",
        dateformto: "",
        BILL_TYPE: "",
        PAYMENT_TYPE: "",
        BILL_ID: "",
        CORP_NAME: "",
        SERIAL_ID: "",
        OUT_TRADING_NO: "",
        RELATION_ID: "",
        GOODS_NAME: ""
      },

      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      listLoading: false,
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
    exportxlsx() {
      var tableID = "#out-table"
      exportExcel.export(tableID)
    },
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

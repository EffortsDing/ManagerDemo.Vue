<template>
    <section>
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px">
            <el-form :inline="true" :model="filters">
                <el-form-item>
                    <el-date-picker
                    v-model="value7"
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
                    <el-form-item  prop="BILL_TYPE" style="width:206px">
                    <el-select v-model="filters.BILL_TYPE" placeholder="账单类型" style="width:100%">
                    <el-option label="管理员" value="E5CEB2B6B11F4DA3901D5B6C5D22B1D0"></el-option>
                    <el-option label="普通用户" value="b8a7da03b1ff4218a368046a00d20cf3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  prop="PAYMENT_TYPE" style="width:206px">
                    <el-select v-model="filters.PAYMENT_TYPE" placeholder="支付方式" style="width:100%">
                    <el-option label="管理员" value="E5CEB2B6B11F4DA3901D5B6C5D22B1D0"></el-option>
                    <el-option label="普通用户" value="b8a7da03b1ff4218a368046a00d20cf3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="" >
					<el-input v-model="filters.BILL_ID" placeholder="账单号"></el-input>
				</el-form-item> 
                	<el-form-item class="">
					<el-input v-model="filters.CORP_NAME" placeholder="商户名称"></el-input>
				</el-form-item>
                	<el-form-item class="" >
					<el-input v-model="filters.SERIAL_ID" placeholder="设备编号" style="width:250px"></el-input>
				</el-form-item>
                	<el-form-item class="">
					<el-input v-model="filters.OUT_TRADING_NO" placeholder="外部交易号"></el-input>
				</el-form-item>
                <el-form-item class="">
					<el-input v-model="filters.RELATION_ID" placeholder="图像号"></el-input>
				</el-form-item>
                <el-form-item class="" >
					<el-input v-model="filters.GOODS_NAME" placeholder="商品名称"></el-input>
				</el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="getList" >查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" v-on:click="exportxlsx">导出</el-button>
                </el-form-item>
            </el-form>
        </el-col>

        <!--列表-->
       <el-table id="out-table" :data="tableData" @selection-change="selsChange" highlight-current-row v-loading="listLoading" border style="width: 100%">
    
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="CREATE_DATE"   label="日期">
            </el-table-column>
            <el-table-column prop="BUS_PLATFORM" label="业务平台" >
            </el-table-column>
            <el-table-column prop="DATA_SOURCE" label="数据源">
            </el-table-column>
            <el-table-column prop="CREATE_TIME" label="创建时间">
            </el-table-column>
            <el-table-column prop="CORP_NAME" label="商户名称">
            </el-table-column>
            <el-table-column prop="COOPERATION" label="合作方式">
            </el-table-column>
            <el-table-column prop="SERIAL_ID" label="设备编号">
            </el-table-column>
            <el-table-column prop="RELATION_ID" label="图像号">
            </el-table-column>
            <el-table-column prop="PLATFORM_NAME" label="分发平台">
            </el-table-column>
            <el-table-column prop="PLATFORM_NAME2" label="处理平台">
            </el-table-column>
            <el-table-column prop="GOODS_NAME" label="商品名称">
            </el-table-column>
            <el-table-column prop="AMOUNT" label="单价金额">
            </el-table-column>
            <el-table-column prop="BILL_TYPE" label="账单类型">
            </el-table-column>
            <el-table-column prop="BILL_ID" label="账单号">
            </el-table-column>
            <el-table-column prop="PAYMENT_TYPE" label="支付类型">
            </el-table-column>
            <el-table-column prop="TRADING_NO" label="交易号">
            </el-table-column>
            <el-table-column prop="OUT_TRADING_NO" label="外部交易号">
            </el-table-column>
            <el-table-column prop="REAL_AMOUNT" label="实付金额">
            </el-table-column>
            <el-table-column prop="BROKERAGE" label="方图服务费">
            </el-table-column>
            <el-table-column prop="CORP_REAL_AMOUNT" label="商户实际所得">
            </el-table-column>
            <el-table-column prop="THIRD_PARTY_REVENUE" label="第三方维护费">
            </el-table-column>
            <el-table-column prop="THIRD_PARTY_SERVICE_CHARGE" label="手续费">
            </el-table-column>
            <el-table-column prop="SERVICE_FEE" label="工本费">
            </el-table-column>
            <el-table-column prop="POST_FEE" label="邮寄费">
            </el-table-column>
            <el-table-column prop="PAYEE" label="收款方">
            </el-table-column>
            <el-table-column prop="CASH_PAYEE" label="现金收款方">
            </el-table-column>
            <el-table-column prop="TRA_SER_FEE_MER_NAME" label="工本费、邮寄费收款方">
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
      value7: "",
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

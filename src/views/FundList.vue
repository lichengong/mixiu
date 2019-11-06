<template>
  <div class="fillContainer">
    <div>
      <el-form :inline="true" ref="add_data">
        <el-form-item class="btnRight">
          <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      v-if="tableData.length>0"
      :data="tableData"
      max-height="450"
      border
      style="width: 100%"
    >
      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
      <el-table-column label="创建时间" width="230" align="center" prop="created_time">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.created_time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支类型" width="150" align="center" prop="type"></el-table-column>
      <el-table-column label="收支描述" width="190" align="center" prop="describe"></el-table-column>
      <el-table-column label="收入" width="120" align="center" prop="income">
        <template slot-scope="scope">
          <span style="color:#00d053">{{ scope.row.income }}</span>
        </template>
      </el-table-column>
      <el-table-column label="支出" width="120" align="center" prop="expend">
        <template slot-scope="scope">
          <span style="color:#f56767">{{ scope.row.expend }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户现金" width="120" align="center" prop="cash">
        <template slot-scope="scope">
          <span style="color:#4db3ff">{{ scope.row.cash }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" width="190" align="center" prop="remark"></el-table-column>
      <el-table-column label="操作" width="190" align="center">
        <template slot-scope="scope">
          <el-button
            size="small"
            icon="el-icon-edit"
            type="primary"
            @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-button
            size="small"
            icon="el-icon-delete"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Dialog :dialog="dialog" @update="getProfile" :formData="formData" />
    <div class="pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.page_index"
        :page-sizes="pagination.page_sizes"
        :page-size="pagination.page_size"
        :layout="pagination.layout"
        :total="pagination.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import Dialog from "components/Dialog";
export default {
  data() {
    return {
      pagination: {
        page_index: 1, //当前位于哪页
        total: 0, //总数
        page_size: 5, //一页显示多少条
        page_sizes: [5, 10, 15, 20], //每页显示多少条
        layout: "total,sizes,prev,pager,next,jumper" //翻页属性
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false
      },
      formData: {
        id: "",
        created_time: "",
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      }
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios.get(process.env.NODE_ENV === "production"
            ? "http://101.132.129.41:3001/api/profile"
            : "/api/profile").then(res => {
        this.allTableData = res.data;
        //设置分页数据
        this.setPagination();
      });
    },
    handleEdit(index, row) {
      //编辑
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };
      this.formData = {
        id: row._id,
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark
      };
    },
    handleDelete(index, row) {
      //删除
      this.$axios.delete(process.env.NODE_ENV === "production"
            ? `http://101.132.129.41:3001/api/profile/delete/${row._id}` 
            : `/api/profile/delete/${row._id}`).then(res => {
        this.$message({
          message: "删除成功！",
          type: "success"
        });
        this.getProfile();
      });
    },
    handleAdd() {
      //添加
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };
      this.formData = {
        id: "",
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: ""
      };
    },
    handleCurrentChange(page) {
      //获取当前页
      let index = this.pagination.page_size * (page - 1);
      //数据的总数
      let nums = this.pagination.page_size * page;
      //容器
      let tables = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
          this.tableData = tables;
        }
      }
    },
    handleSizeChange(page_size) {
      //切换size
      this.pagination.page_index = 1;
      this.pagination.page_size = page_size;
      //设置分类数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < page_size;
      });
    },
    setPagination() {
      //分页属性设置
      this.pagination.total = this.allTableData.length;
      this.pagination.page_index = 1;
      this.pagination.page_size = 5;
      //设置默认分类数据
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagination.page_size;
      });
    }
  },
  components: {
    Dialog
  }
};
</script>

<style scoped>
.fillContainer {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.el-form-item {
  margin-bottom: 0;
}
.pagination {
  margin-top: 10px;
  float: right;
}
</style>
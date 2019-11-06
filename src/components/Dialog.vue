<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @closed="close"
    >
      <div class="form">
        <el-form ref="form" :model="formData" :rules="rules" label-width="80px" style="margin:10px;width:auto;">
          <el-form-item label="收支类型" prop="type">
            <el-select v-model="formData.type" placeholder="收支类型">
              <el-option
                v-for="(formtype,index) in format_type_list"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="收支描述" prop="describe">
            <el-input v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item label="收入" prop="income">
            <el-input v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item label="支出" prop="expend">
            <el-input v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item label="账户现金" prop="cash">
            <el-input v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="">
            <el-button @click="dialog.show = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      format_type_list: [
        "提现",
        "提现手续费",
        "充值",
        "优惠券",
        "充值礼券",
        "转账"
      ],
      rules:{
          type: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
           describe: [
            { required: true, message: '收支描述不能为空', trigger: 'blur' }
          ],
           income: [
            { required: true, message: '收入不能为空', trigger: 'blur' }
          ],
           expend: [
            { required: true, message: '支出不能为空', trigger: 'blur' }
          ],
           cash: [
            { required: true, message: '账户现金不能为空', trigger: 'blur' }
          ]
      }
    };
  },
  props: {
    dialog: Object,
    formData:Object
  },
  methods: {
    close() {
      this.dialogFormVisible = false;
    },
    onSubmit(formName){
        this.$refs[formName].validate(valid => {
        if (valid) {
            const url=this.dialog.option=='add'? 'add' : `edit/${this.formData.id}`
          this.$axios
            .post(`http://101.132.129.41:3001/api/profile/${url}`, this.formData)
            .then(res => {
                // 添加成功
                this.$message({
                  message: "添加成功！",
                  type: "success"
                });
                //隐藏Dialog
                this.dialog.show=false
                //刷新formData
                this.$emit("update")
            })
            
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style>
</style>
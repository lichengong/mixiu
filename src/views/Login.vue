<template>
  <div class="login">
    <section class="form_container">
      <div class="manage_tip">
        <span class="title">登录</span>
      </div>
      <el-form
        :model="loginUser"
        :rules="rules"
        class="loginForm"
        ref="loginForm"
        label-width="60px"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="loginUser.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginUser.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="submit_btn" @click="submitForm('loginForm')">登 录</el-button>
        </el-form-item>
        <div class="tiparea">
            <p>还没有账号? 现在<router-link to="/register">注册</router-link></p>
        </div>
      </el-form>
    </section>
  </div>
</template>

<script>
import jwt_decode from 'jwt-decode'
export default {
  name: "login",
  data() {
    return {
      loginUser: { 
        email: "",
        password: ""
      },
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post(process.env.NODE_ENV === "production"
            ? "http://101.132.129.41:3001/api/users/login" 
            : "/api/users/login", this.loginUser)
            .then(res => {
              if (res.data.status == 401) {
                this.$message("亲！" + res.data.message);
              } else if (res.data.status == 402) {
                this.$message("亲！" + res.data.message);
              } else {
                 const { token } = res.data
                 //token存储到localStorage
                 localStorage.setItem('eleToken',token)
                 //解析token
                 const decode=jwt_decode(token)
                 //token存储到vuex中
                 this.$store.dispatch('setAuthenticated', !this.isEmpty(decode))
                 this.$store.dispatch('setUser', decode)
                // 注册成功
                this.$message({
                  message: "登录成功！",
                  type: "success"
                });
                this.$router.push("/home");
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    isEmpty(value) {
      return (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      );
    }
  }
};
</script>


<style scoped>
.login {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(~assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: #fff;
}
.loginForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
.tiparea{
    text-align: right;
    font-size: 12px;
    color: #333;
}
.tiparea p a{
    color: #409eff;
}
</style>




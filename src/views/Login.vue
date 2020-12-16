<template>
  <div class="login-wrap">
    <el-form :model="ruleForm" label-width="100px" class="demo-ruleForm login-container">
      <h3 style="text-align: center;">用户登录</h3>
      <el-form-item label="用户名">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary"  @click="doLogin">提交</el-button>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content bg-purple-dark">
              <el-button type="primary" @click="toReg">注册</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    toReg() {
      this.$router.push({
        path: '/register'
      });
    },
    doLogin() {
      let url = this.axios.urls.SYSTEM_USER_DOLOGIN;
      console.log(url)
      this.axios.get(url, {
        params: this.ruleForm
      }).then((response) => {
        console.log(response);
        if (response.data.code == 1) {
          this.$message({
            showClose:true,
            message:response.data.msg,
            type: 'success'
          });
        } else {
          this.$message({
            showClose:true,
            message:response.data.msg,
            type: 'error'
          });
        }

      }).catch((response) => {
        console.log(response);
      });
    }
  }
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-image: url("../assets/background.jpg");
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-attachment: fixed;
  background-size: 100% 100%;
}

.login-container {
  border-radius: 10px;
  margin: 0px auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>


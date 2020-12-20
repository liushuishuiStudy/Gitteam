<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <div>
<!--   头像区     <img src="../assets/logo.png" alt />-->
        <span>Gitteam</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside>
          <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" v-for="item in $router.options.routes"
          v-if="!item.hidden" router>
            <el-submenu >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>导航</span>
              </template>
                <el-menu-item v-for="(item,index) in item.children" :index="item.path"
                              :class="$route.path==item.path?'is-active':''">{{item.name}}</el-menu-item>
            </el-submenu>

          </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data (){
    let username=this.$route.query.name
  },
  methods: {
    created() {
    },
    logout() {
     // 清空token
     //  window.sessionStorage.clear()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #373f41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
> div {
  display: flex;
  align-items: center;
img {
  height: 40px;
}
span {
  margin-left: 15px;
}
}
}
.el-aside {
  background-color: #333744;

.el-menu {
  border: none;
}
}
.el-main {
  background-color: #eaedf1;
}
.iconfont{
  margin-right: 10px;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>

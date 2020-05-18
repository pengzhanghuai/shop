<template>
  <div class="login">
    <mt-header title="登录">
      <mt-button @click="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      <mt-button @click="$router.push('/register')" slot="right">注册</mt-button>
    </mt-header>
    <div class="content">
      <div class="phone">
        <span>手机号：</span>
        <input type="tel" v-model="phone" />
      </div>
      <div class="username">
        <span>用户名：</span>
        <input type="text" v-model="username" />
      </div>
      <div class="password">
        <span>密&emsp;码：</span>
        <input type="password" v-model="password" />
      </div>
      <p>忘记密码</p>
      <mt-button @click="submit" class="submit">登录</mt-button>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      username: "",
      password: "",
      phone: ""
    };
  },
  methods: {
    submit() {
      if (this.username == "" || this.password == "" || this.phone == "") {
        alert("请输入相关信息");
        return;
      }
      this.axios({
        method: "post",
        url: "/api/memberlogin",
        data: {
          username: this.username,
          password: this.password
        }
      }).then(res => {
        if (res.data.status === 1) {
          let obj = {
            username: this.username,
            userid: res.data.data._id
          };
          sessionStorage.setItem("member", JSON.stringify(obj));
          Toast(res.data.info);
          this.$router.push("/home");
        }else{
          Toast(res.data.info);
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  width: 100vw;
  height: 100vh;
  background: #fff;
}
.content {
  width: 5rem;
  margin: 2rem auto;
  font-size: 0.3rem;
}
.content div {
  border-bottom: 1px solid #b5b5b5;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
}
.content input {
  border: none;
  outline: none;
  height: 0.4rem;
  display: inline-block;
  font-size: 0.25rem;
}
.content p {
  text-align: right;
  height: 1rem;
  line-height: 1rem;
  padding-right: 0.15rem;
  color: #b5b5b5;
}
.submit {
  display: block;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  background: #fe9900;
}
</style>
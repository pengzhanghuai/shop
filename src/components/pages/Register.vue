<template>
  <div class="register">
    <mt-header title="注册">
      <mt-button @click="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      <mt-button @click="$router.push('/login')" slot="right">登录</mt-button>
    </mt-header>
    <div class="content">
      <div class="phone">
        <span>手机号：</span>
        <input type="tel" v-model="phone"  />
      </div>
      <div class="username">
        <span>用户名：</span>
        <input type="text" v-model="username"  />
      </div>
      <div class="password">
        <span>密&emsp;码：</span>
        <input type="password" v-model="password"  />
      </div>
      <div class="checkcode">
        <section>
          <span>验证码：</span>
          <input type="text" />
        </section>
        <span @click="isshow=true">点击获取</span>
        <mt-popup v-show="isshow" v-model="isshow" position="middle">
          验证码为：4E8a
          <button @click="isshow=false">确定</button>
        </mt-popup>
      </div>
      <mt-button @click="submit" class="submit">下一步</mt-button>
      <p>
        <input type="checkbox" v-model="ischeck" class="check" />
        <span>
          我已阅读并同意使用
          <strong>条款</strong>和
          <strong>隐私政策</strong>
        </span>
      </p>
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
      phone: "",
      ischeck: false,
      isshow: false,
      str: ""
    };
  },
  methods: {
    submit() {
      if (this.username == "" || this.password == "" || this.phone == "") {
        alert("请输入相关信息");return;
      }
      this.axios({
        method: "post",
        url: "api/memberadd",
        data: { username: this.username, password: this.password }
      }).then(res => {
        this.$router.push("/login");
      });
    }
  }
};
</script>

<style scoped>
.register {
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
.submit {
  display: block;
  width: 100%;
  height: 0.8rem;
  line-height: 0.8rem;
  text-align: center;
  color: #fff;
  background: #fe9900;
  margin: 0.4rem 0;
}
.content p {
  font-size: 0.25rem;
}
.content .check {
  display: inline-block;
  width: 0.3rem;
  height: 0.3rem;
}
.checkcode {
  display: flex;
  justify-content: space-between;
}
.checkcode section span {
  font-size: 0.3rem;
  color: #333;
}
.checkcode section input {
  width: 2rem;
}
.checkcode span {
  font-size: 0.25rem;
  color: #fe517d;
}
.mint-popup {
  width: 3rem !important;
}
</style>
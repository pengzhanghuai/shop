<template>
  <div class="mine">
    <div class="top">
      <div class="up">
        <div class="tit">
          <img slot="icon" src="/static/img/set.png" />
          <span>个人中心</span>
          <img slot="icon" src="/static/img/news.png" />
        </div>
        <b>9+</b>
      </div>
      <div class="down">
        <div>
          <img slot="icon" src="/static/img/keep.png" />
          <span>我的收藏（5）</span>
        </div>
      </div>
      <div class="user">
          <div class="user_pic"></div>
      </div>
    </div>
    <div class="middle">
      <div class="mid_top">
        <span>我的订单</span>
        <span style="color:#bbb">查看全部订单</span>
      </div>
      <div class="mid_bot">
        <section v-for="(item,index) in list" :key="index">
          <img slot="icon" :src="item.img" />
          <span>{{item.title}}</span>
        </section>
        <b>1</b>
        <b style="left:3.2rem">2</b>
      </div>
    </div>
    <div class="bottom">
      <p>收货地址管理</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        { title: "待付款", img: "/static/img/icon_boligation.png" },
        { title: "待发货", img: "/static/img/prepare.png" },
        { title: "待收货", img: "/static/img/icon_consignee.png" },
        { title: "待评价", img: "/static/img/icon_evaluate.png" },
        { title: "退款/售后", img: "/static/img/icon_refund.png" }
      ]
    };
  }
};
</script>

<style scoped>
.mine {
  font-size: 0.3rem;
  width: 100vw;
  height: 100vh;
  background: #eee;
}
.mine .top {
  width: 100%;
  height: 5rem;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  position: relative;
}
.mine .top .user{
    position: absolute;
    width: 2rem;
    height: 2rem;
    border-radius:50%;
    background: #fff;
    left: 50%;
    top: 1.6rem;
    margin-left: -1rem;
}
.mine .top .user .user_pic{
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    background: red;
    text-align: center;
    margin: .1rem auto 0;
    background:url("/static/img/user-pic.png") no-repeat  ;
    background-size:100% ;
}
.mine .top .up {
  flex: 1;
  background: #fe9900;
  padding: 0 0.4rem;
  position: relative;
}
.mine .top .up b {
  font-weight: normal;
  position: absolute;
  font-size: 0.1rem;
  width: 0.35rem;
  height: 0.35rem;
  color: #fafafa;
  background: red;
  line-height: 0.35rem;
  text-align: center;
  border-radius: 50%;
  right: 0.2rem;
  top: .3rem;
}
.mine .top .up .tit {
  margin-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  color: #fafafa;
}
.mine .top .down {
  width: 100%;
  height: 2rem;
  padding-left: 0.4rem;
}
.mine .top .down div {
  margin-top: 1.3rem;
}
.mine .middle {
  width: 100%;
  height: 2.5rem;
  margin: 0.2rem 0;
  background: #fafafa;
  display: flex;
  flex-direction: column;
}
.mine .middle .mid_top {
  width: 100%;
  height: 1rem;
  border-bottom: 1px solid #333;
  padding-left: 0.4rem;
  display: flex;
  justify-content: space-between;
  line-height: 1rem;
}
.mine .middle .mid_bot {
  flex: 1;
  display: flex;
  justify-content: space-around;
  position: relative;
}
.mine .middle .mid_bot section {
  display: flex;
  flex-direction: column;
}
.mine .middle .mid_bot section img {
  width: 0.45rem;
  height: 0.45rem;
  vertical-align: middle;
  margin: 0.3rem auto 0.2rem;
}
.mine .middle .mid_bot section span {
  font-size: 0.25rem;
  color: #bbb;
}
.mine .middle .mid_bot b {
  font-weight: normal;
  color: #fafafa;
  display: block;
  width: 0.3rem;
  text-align: center;
  line-height: 0.3rem;
  height: 0.3rem;
  border-radius: 50%;
  background: red;
  font-size: 0.1rem;
  position: absolute;
  top: 0.15rem;
  left: 1.9rem;
}
.mine .bottom {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  padding-left: 0.5rem;
  color: #bbb;
  background: #fafafa;
}
</style>
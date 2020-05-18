<template>
  <div>
    <mt-header title="商品详情">
      <mt-button @click="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div class="wrapper">
      <img :src="info.img" />
      <p class="title">{{info.title}}</p>
      <div class="price">
        <span class="old">原价：￥{{info.price*2}}</span>
        <span class="now">现价：￥{{info.price}}</span>
      </div>
      <div class="desc" v-html="info.desc"></div>
      <div class="bottom">
        <div class="total">
          总价：
          <span>￥{{info.price}}</span>
        </div>
        <div class="button">
          <mt-button class="addcart" @click="isshow=true">加入购物车</mt-button>
          <mt-button class="buynow">立即购买</mt-button>
        </div>
      </div>
      <mt-popup v-model="isshow" position="bottom">
        <div class="top">
          <div class="detail">
            <img :src="info.img" alt />
            <div>
              <p style="color:red">￥{{info.price}}</p>
              <p>库存999件</p>
              <p>请选择商品属性</p>
            </div>
          </div>
          <div class="close" @click="isshow=false">X</div>
        </div>
        <div class="middle">
          <div class="mid_left">购买数量</div>
          <div class="mid_right">
            <mt-button @click="cut">-</mt-button>
            <input v-model="num" type="text" />
            <mt-button @click="add">+</mt-button>
          </div>
        </div>
        <div class="bottom">
          <div class="total">
            总价：
            <span>￥{{total}}</span>
          </div>
          <div class="button">
            <mt-button class="addcart" @click="islogin">加入购物车</mt-button>
            <mt-button class="buynow">立即购买</mt-button>
          </div>
        </div>
      </mt-popup>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios({
      url: "/api/goodsinfo",
      params: {
        id: this.$route.params.id
      }
    }).then(res => {
      this.info = res.data.data;
    });
  },
  data() {
    return {
      info: {},
      isshow: false,
      num: 1
    };
  },
  methods: {
    add() {
      if (this.num >= 10) return;
      this.num++;
    },
    cut() {
      if (this.num <= 1) return;
      this.num--;
    },
    islogin() {
      let getMember = sessionStorage.getItem("member");
      if (getMember === null) {
        this.$router.push("/login");
      } else {
        this.axios({
          method:"post",
          url: "/api/cartadd",
          data: {
            userid: JSON.parse(getMember).userid,
            goodsid: this.$route.params.id,
            goods_num: this.num
          }
        }).then(res => {
          this.$router.push("/cart")
        });
      }
    }
  },
  computed: {
    total() {
      return this.info.price * this.num;
    }
  }
};
</script>

<style scoped>
.wrapper img {
  display: block;
  width: 100%;
  height: 4rem;
  border-bottom: 1px solid #f1f1f1;
}
.wrapper .title {
  font-size: 0.2rem;
  background: #fff;
  letter-spacing: 1px;
  line-height: 0.3rem;
  padding: 0.1rem;
}
.wrapper .price {
  font-size: 0.2rem;
  display: flex;
  justify-content: space-around;
  background: #fff;
  padding: 0.2rem 0;
}
.wrapper .price .old {
  text-decoration: line-through;
}
.wrapper .price .now {
  color: red;
}
.wrapper .desc {
  width: 100%;
  margin-top: 0.3rem;
  background: #fff;
  font-size: 0.4rem;
  text-align: justify;
}
.wrapper .bottom {
  width: 100%;
  height: 0.8rem;
  /* position: fixed;
  bottom: 0; */
  background: #fff;
  display: flex;
  font-size: 0.3rem;
  justify-content: space-between;
  align-items: center;
  padding-left: 0.1rem;
}
.wrapper .bottom span {
  color: red;
}
.button {
  display: flex;
}
.mint-button {
  display: block;
  border-radius: 0;
  height: 0.8rem;
  color: #fff;
}
.wrapper .bottom .addcart {
  background: #fe9900;
}
.wrapper .bottom .buynow {
  background: #ec2222;
}
.mint-popup {
  width: 100%;
}
.mint-popup .top {
  display: flex;
  justify-content: space-between;
}
.mint-popup .top img {
  width: 1.5rem;
  height: 1.5rem;
}
.mint-popup .top .detail {
  font-size: 0.3rem;
  display: flex;
}
.mint-popup .top .detail p {
  margin: 0.1rem 0;
}
.mint-popup .top .close {
  font-size: 0.4rem;
  width: 0.6rem;
  height: 0.6rem;
  background: #fe9900;
  border-radius: 50%;
  text-align: center;
  line-height: 0.6rem;
  color: #fff;
  margin-top: 0.1rem;
  margin-right: 0.1rem;
}
.mint-popup .middle {
  font-size: 0.25rem;
  display: flex;
  justify-content: space-between;
  padding: 0 0.15rem;
  margin: 0.1rem 0;
  line-height: 0.5rem;
}
.mint-popup .middle .mid_right {
  display: flex;
}
.mint-popup .middle .mid_right input {
  width: 1rem;
  text-align: center;
}
.mint-popup .middle .mid_right .mint-button {
  background: #ccc;
  height: 0.5rem;
}
</style>
<template>
  <div class="cart">
    <mt-header title="购物车">
      <mt-button @click="$router.go(-1)" icon="back" slot="left">返回</mt-button>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <div v-if="cartArr.length">
      <ul class="wrapper">
        <li v-for="(cate,index) in cartArr" :key="cate._id">
          <div class="item" @touchstart="start" @touchmove="move" @touchend="end(index)">
            <input type="checkbox" v-model="cate.checked" />
            <img :src="cate.goods_img" alt />
            <div class="desc">
              <p>{{cate.goods_title}}</p>
              <p class="price">￥{{cate.goods_price}}</p>
            </div>
            <div class="num">
              <mt-button @click="cut(index)">-</mt-button>
              <span>{{cate.goods_num}}</span>
              <mt-button @click="add(index)">+</mt-button>
            </div>
            <div :class="{del:true,right:cate.showdel}" @click="del(index)">删除</div>
          </div>
        </li>
      </ul>
      <div class="bottom">
        <section class="bot_a" @click="allcheck">
          <img slot="icon" src="/static/img/radio_hig.png" v-if="icona==true" />
          <img slot="icon" src="/static/img/radio_nor.png" v-else />
          <span>全选</span>
        </section>
        <section class="bot_b" @click="iconb=!iconb">
          <img slot="icon" src="/static/img/editor_hig.png" v-if="iconb==true" />
          <img slot="icon" src="/static/img/editor_nor.png" v-else />
          <span>编辑</span>
        </section>
        <section class="bot_c">
          <span>合计：{{total}}</span>
          <span>(不含运费)</span>
        </section>
        <section class="bot_d">去结算</section>
      </div>
    </div>
    <div v-else>
      <img src="/static/img/shopping_wu.png" alt id="noDeatil" />
      <p id="nodetail">购物车还是空的快去逛逛吧~</p>
    </div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  mounted() {
    let user = sessionStorage.getItem("member");
    if (!user) {
      this.$router.push("/login");
    } else {
      user = JSON.parse(sessionStorage.getItem("member"))
      let userid = user.userid;
      this.axios({
        url: "/api/cartlist",
        params: {
          userid
        }
      }).then(res => {
        this.cartArr = res.data.data;
      });
    }
  },
  data() {
    return {
      cartArr: [],
      startX: 0,
      endX: 0,
      showdel: false,
      icona: false,
      iconb: false,
      hasDetail: false
    };
  },
  methods: {
    cut(i) {
      if (this.cartArr[i].goods_num <= 1) return;
      this.cartArr[i].goods_num--;
    },
    add(i) {
      if (this.cartArr[i].goods_num >= 10) return;
      this.cartArr[i].goods_num++;
    },
    start(e) {
      this.startX = e.touches[0].clientX;
      this.endX = 0;
    },
    move(e) {
      this.endX = e.touches[0].clientX;
    },
    end(i) {
      if (this.startX == 0 || this.endX == 0) return;
      if (this.startX - this.endX > 10) {
        this.cartArr[i].showdel = true;
      }
      this.$forceUpdate();
    },
    allcheck() {
      this.icona = !this.icona;
      this.cartArr.map(item => {
        return (item.checked = this.icona);
      });
    },
    del(i) {
      this.axios({
        method: "post",
        url: "/api/cartdel",
        data: {
          id: this.cartArr[i]._id
        }
      }).then(res => {
        if (res.data.status == 1) {
          Toast(res.data.info);
          this.cartArr.splice(i, 1);
        }
      });
    }
  },
  computed: {
    total() {
      let sum = 0;
      this.cartArr.map(item => {
        if (item.checked) {
          sum += item.goods_num * item.goods_price;
        }
      });
      this.icona = this.cartArr.every(goods => {
        return goods.checked;
      });
      return sum.toFixed(2);
    }
  },
  watch: {
    cartArr: {
      handler(newV, oldV) {
        if (newV.length == 0) {
          this.hasDetail = false;
        }
      },
      deep: true
    }
  }
};
</script>

<style scoped>
#noDeatil {
  display: block;
  width: 0.8rem;
  height: 0.8rem;
  margin: 2rem auto 0;
}
#nodetail {
  color: #bbb;
  width: 2.5rem;
  margin: 0.3rem auto;
  text-align: center;
  line-height: 0.4rem;
}
.cart {
  font-size: 0.3rem;
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin-bottom: 1rem;
}
.item {
  padding: 0.1rem;
  margin: 0.1rem;
  border: 1px solid #333;
  display: flex;
}
.item input {
  width: 0.3rem;
  height: 0.3rem;
  margin-top: 0.3rem;
  vertical-align: middle;
}
.item img {
  width: 1rem;
  height: 1rem;
}
.item .desc {
  margin: 0 0.1rem;
}
.item p {
  font-size: 0.2rem;
  width: 2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.item .price {
  text-align: center;
  margin-top: 0.2rem;
  color: red;
  font-size: 0.3rem;
}
.item .num {
  width: 1.9rem;
  height: 0.43rem;
  margin-top: 0.3rem;
  text-align: center;
}
.item .del {
  position: relative;
  right: -2rem;
  text-align: center;
  color: #fff;
  background: #fe9900;
  line-height: 0.5rem;
  border-radius: 3px;
}
.item .right {
  right: 0;
}
.bottom {
  background: #fff;
  width: 100%;
  height: 1rem;
  display: flex;
  position: fixed;
  bottom: 0.9rem;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  justify-content: space-between;
}
.bottom section {
  display: flex;
  flex-direction: column;
  width: 0.8rem;
  text-align: center;
}
.bottom section img {
  width: 0.5rem;
  height: 0.5rem;
  margin: 0.1rem 0;
  align-self: center;
}
.bottom section span {
  font-size: 0.25rem;
}
.bottom .bot_c {
  width: 2rem;
  font-size: 0.2rem;
  color: #ccc;
  margin-top: 0.3rem;
  line-height: 0.3rem;
}
.bottom .bot_d {
  width: 2rem;
  height: 100%;
  line-height: 1rem;
  text-align: center;
  color: #fff;
  background: #fe9900;
}
</style>
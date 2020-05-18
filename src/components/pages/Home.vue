<template>
  <div class="home">
    <mt-search cancel-text></mt-search>
    <mt-swipe :speed="3000">
      <mt-swipe-item v-for="item in banners" :key="item._id">
        <img :src="item.img" :alt="item.title" />
      </mt-swipe-item>
    </mt-swipe>
    <div class="list">
      <div class="item" v-for="cate in cateArr" :key="cate._id">
        <h4>{{cate.title}}</h4>
        <div class="goods_wrap">
          <template v-for="(item,index) in cate.children">
            <div @click="toDetail(item._id)" class="goods_item" v-if="2>index" :key="item._id">
              <img :src="item.img" alt />
              <p class="price">￥{{item.price}}</p>
              <p class="desc">{{item.title}}</p>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      banners: [],
      cateArr: []
    };
  },
  methods: {
    // 轮播图的网络请求
    banner() {
      return this.axios.get("/api/bannerlist");
    },
    // 商品列表的网络请求
    categoods() {
      return this.axios.get("/api/categoods");
    },
    toDetail(id) {
      this.$router.push("/detail/" + id);
    }
  },
  mounted() {
    // this.axios.get("/api/bannerlist").then(res => {
    //   this.banners = res.data.data;
    // });
    // this.axios.get("/api/categoods").then(res => {
    //   this.cateArr = res.data.data;
    // });
    // 一次性发起多个网络请求
    this.axios.all([this.banner(), this.categoods()]).then(
      this.axios.spread((resbanner, rescate) => {
        this.banners = resbanner.data.data;
        this.cateArr = rescate.data.data;
      })
    );
  }
};
</script>

<style scoped>
.home {
  position: relative;
  margin-bottom: 0.9rem;
}
.mint-swipe {
  height: 3rem;
}
.mint-swipe img {
  width: 100%;
  height: 100%;
}
.mint-search {
  height: 1rem;
  position: absolute;
  left: 0px;
  top: 0.4rem;
  width: 100%;
}
.list .item .goods_wrap {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.list .item h4 {
  font-size: 0.3rem;
  font-weight: normal;
  color: #ccc;
  margin: 0.2rem;
}
.list .item .goods_item {
  width: 45%;
  height: 100%;
  border: 1px solid #333;
  padding: 10px;
  margin-bottom: 0.1rem;
}
.list .item .goods_item img {
  width: 100%;
  height: 2.5rem;
}
.list .item .goods_item p {
  font-size: 0.16rem;
  margin-top: 0.1rem;
}
.list .item .goods_item .price {
  color: red;
}
.list .item .goods_item .desc {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
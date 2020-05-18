<template>
  <div>
    <mt-tabbar v-model="selected">
      <mt-tab-item v-for="tab in tabArr" :key="tab.path" :id="tab.path" @click.native="change(tab.path)">
        <img slot="icon" :src="tab.nImg" v-if="selected==tab.path" />
        <img slot="icon" :src="tab.oImg" v-else />
        {{tab.tit}}
      </mt-tab-item>
      <!-- <mt-tab-item id="/cate" @click.native="change('/cate')">
        <img slot="icon" src="/static/img/tab_menu_hig.png" v-if="selected=='/cate'" />
        <img slot="icon" src="/static/img/tab_menu_nor.png" v-else />
        分类
      </mt-tab-item>
      <mt-tab-item id="/cart" @click.native="change('/cart')">
        <img slot="icon" src="/static/img/tab_shopping_hig.png" v-if="selected=='/cart'" />
        <img slot="icon" src="/static/img/tab_shopping_nor.png" v-else />
        购物车
      </mt-tab-item>
      <mt-tab-item id="/mine" @click.native="change('/mine')">
        <img slot="icon" src="/static/img/tab_me_hig.png" v-if="selected=='/mine'" />
        <img slot="icon" src="/static/img/tab_me_nor.png" v-else />
        个人中心
      </mt-tab-item> -->
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: "/home",
      tabArr:[
          {
            path:'/home',
            nImg:'/static/img/tab_home_hig.png',
            oImg:'/static/img/tab_home_nor.png',
            tit:'首页'
          },
          {
            path:'/cate',
            nImg:'/static/img/tab_menu_hig.png',
            oImg:'/static/img/tab_menu_nor.png',
            tit:'分类'
          },
          {
            path:'/cart',
            nImg:'/static/img/tab_shopping_hig.png',
            oImg:'/static/img/tab_shopping_nor.png',
            tit:'购物车'
          },
          {
            path:'/mine',
            nImg:'/static/img/tab_me_hig.png',
            oImg:'/static/img/tab_me_nor.png',
            tit:'我'
          },
      ]
    };
  },
  methods: {
    change(tag) {
      if (this.$route.path === tag) {
        return;
      }
      this.selected = tag;
      this.$router.push(tag);
    }
  },
  mounted(){
      this.selected = this.$route.path
  },
  watch:{
    $route() {
      this.selected = this.$route.path;
    }
  }
};
</script>

<style >
.mint-tabbar > .mint-tab-item.is-selected {
  color: #fe9900;
  background-color: transparent;
}
.mint-tabbar{
  position: fixed;
  bottom: 0;
  background: #fff;
}
</style>
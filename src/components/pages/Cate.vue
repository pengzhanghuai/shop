<template>
  <div class="cate">
    <mt-search cancel-text></mt-search>
    <div class="content">
      <div class="left">
        <ul>
          <li
            @click="defaultindex=index"
            v-for="(item,index) in arr"
            :key="item._id"
            :class="{active:defaultindex==index}"
          >{{item.title}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="list"  v-for="(alls,index) in arr" :key="alls._id"  v-show="defaultindex==index">
          <div class="item" @click="toDetail(goods._id)" v-for="goods in alls.children" :key="goods._id">
            <img :src="goods.img" alt />
            <p>{{goods.title}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.axios.get("/api/categoods").then(res => {
      this.arr = res.data.data;
    });
  },
  data() {
    return {
      arr: [],
      defaultindex: 0
    };
  },
  methods:{
      toDetail(id){
          this.$router.push('/detail/'+id)
      }
  }
};
</script>

<style scoped>
.mint-search {
  height: 1rem;
  position: absolute;
  left: 0px;
  top: 0;
  width: 100%;
  background: #fafafa;
}
.cate {
  position: relative;
  margin-bottom: 0.9rem;
}
.content {
  width: 100vw;
  height: 100vh;
  padding-top: 1rem;
  display: flex;
}
.content .left {
  width: 2rem;
}
.content .left li {
  font-size: 0.4rem;
  padding: 0.1rem;
  text-align: center;
  border-left: 0.1rem solid #fafafa;
}
.content .left .active {
  color: #fe9900;
  border-left: 0.1rem solid #1d84a7;
}
.content .right {
  flex: 1;
}
.content .right .list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 0.1rem;
}
.content .right .list .item {
  width: 45%;
  margin-bottom: 0.2rem;
  border: 0.05rem solid #1d84a7;
  border-radius:5px ;
}
.content .right .list .item img {
  width: 100%;
  height: 70%;
}
.content .right .list .item p {
  font-size: 0.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #fff;
  background: #1d84a7;
  line-height: .35rem;
  height: .7rem;
}
</style>
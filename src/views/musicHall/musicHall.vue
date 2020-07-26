<template>
  <div class="musichall">
    <div class="musichall-title">
      <span>私塾音乐</span>
      <i @click="ishowClick"><img src="~assets/images/sousuo.png" alt=""></i>
    </div>
    <better-scroll class="musichall-scroll">
      <officialmusic :official="homelist"></officialmusic>
    </better-scroll>
    <!--<searchdetail v-show="ishow" @unishow="unishow"></searchdetail>-->
    <loading v-show="isloading"></loading>
  </div>
</template>

<script>
  import axios from "axios"
  import officialmusic from './musichallChild/officialmusic'
  import betterScroll from "components/comment/betterScroll/betterScroll"  //滑动组件
  import searchdetail from "views/detail/searchdetail"
  import loading from "views/detail/loading"

  export default {
    name: "musichall",
    data(){
      return {
        homelist:{},

        isloading:true
      }
    },
    components:{
      officialmusic,    //区域组件
      betterScroll,    //滑动组件
      searchdetail,   //搜索组件
      loading         //加载组件
    },
    created(){
      axios.get(
          'http://118.89.195.61:5555/api',
      ).then((res)=>{
        console.log(res);
        this.homelist = res.data[0]
        this.isloading = false
      })
    },
    methods:{
      ishowClick(){
        this.$emit("ishowClick")
        // this.ishow=true
      },
    },
  }
</script>

<style lang="less" scoped>
  .musichall{
    height: 100vh;

    .musichall-title{
      position: relative;
      z-index: 2;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 22px;
      background-color: #fff;

      i{
        position: relative;
        touch-action: none;
        top:8px;
        right: -80px;
        width: 30px;
        height: 30px;

        img{
          width: 30px;
          height: 30px;
        }
      }

    }
    .musichall-scroll{
      height: calc(100vh - 50px);
    }
  }


</style>

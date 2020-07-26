<template>
  <div>
    <div class="musichall-title">
      <span>私塾音乐</span>
      <i @click="ishowClick"><img src="~assets/images/sousuo.png" alt=""></i>
    </div>
    <better-scroll>
      <div class="singer">
        <div class="block-singerlist" v-for="(item,index) in singerlist" :key="index" @click="singerClick(item,index)">
          <div class="singerlist-img"><img :src="item.pic" alt=""></div>
          <div class="singerlist-content"><span>{{item.name}}</span></div>
        </div>
      </div>
    </better-scroll>
  </div>
</template>

<script>
  import axios from "axios"
  import betterScroll from 'components/comment/betterScroll/betterScroll'

  export default {
    name: "singer",
    components:{
      betterScroll
    },
    data(){
      return {
        singerlist:[]
      }
    },
    created(){
      axios.get('http://118.89.195.61:5555/singerlist').then((res)=>{
        console.log(res);
        this.singerlist = res.data.singerlist
      })
    },
    methods:{
      singerClick(item,index){
        console.log(index);
        this.$router.push("/singer/" + `${item.mid}`)
        this.$store.state.singerItemlist = item
      },
      ishowClick(){
        this.$emit("ishowClick")
      },
    },
  }
</script>

<style scoped lang="less">
  #wraper{
    height: calc(100vh - 59px);
    overflow: hidden;
  }
  .musichall-title{
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
  .singer{
    margin-bottom: 49px;
  }
  .block-singerlist{
    display: flex;
    padding: 10px 20px;
    height: 60px;
  }
  .singerlist-img{
    padding-right: 50px;
    width: 60px;
    border-radius: 50%;

  }
  .singerlist-img img{
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  .singerlist-content{
    text-align: center;
    line-height: 50px;
    font-size: 17px;
  }
</style>
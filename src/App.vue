<template>
  <div id="app">
    <router-view @ishowClick="ishowClick"/>
    <maintabBar/>
    <searchdetail v-show="ishow" @unishow="unishow"></searchdetail>
    <play></play>
  </div>
</template>

<script>
  import maintabBar from './components/content/maintabBar/maintabBar'
  import play from 'views/detail/play'
  import searchdetail from "views/detail/searchdetail"

  export default {
    name:'App',
    data(){
      return {
        ishow:false
      }
    },
    components:{
      maintabBar,
      play,
      searchdetail
    },
    methods:{
      ishowClick(){
        this.ishow=true;
      },
      unishow(){
        this.ishow=false
      },
    },
  }

</script>

<style lang="less">
@import "assets/css/base.css";
  #app{
    touch-action: none;
  }
</style>

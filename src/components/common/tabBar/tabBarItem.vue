<template>
  <div class="tar-bar-item" @click="routerClick">
    <div class="item-img" v-show="!isshow"><slot name="item-show"></slot></div>
    <div class="item-img" v-show="isshow"><slot name="item-unshow"></slot></div>
    <div><slot name="item-text"></slot></div>
  </div>

</template>

<script>
  export default {
    name: "tabBarItem",
    props:{
      path:String,
    },
    data(){
      return {
        isshow:true
      }
    },
    methods:{
      routerClick(){
        console.log(this.path);
        this.$router.replace(this.path)
      },
    },
  }
</script>

<style scoped>
  .tar-bar-item{
    padding: 5px 0;
    flex: 1;
    height: 49px;
    text-align: center;
  }
  .item-img{
    margin: 2px auto;
    width: 25px;
    height: 25px;
  }
  .item-img img{
    width: 25px;
    height:25px;
  }
</style>
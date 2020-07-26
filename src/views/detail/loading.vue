<template>
  <div class="load">
    <div class="loading">加载中，请稍等</div>
    <!--<img src="~assets/images/loading" alt="加载中">-->
  </div>
</template>

<script>
  export default {
    name: "loading"
  }
</script>

<style scoped>
  .load{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    width: 375px;
    height: 100vh;
    background-color: #fff;
  }
  .loading{
    margin: 50% auto;
    width: 140px;
    height: 140px;
    line-height: 140px;
    font-size: 20px;
    background-repeat: no-repeat;
    background-image: url("~assets/images/loading.gif");
  }
</style>
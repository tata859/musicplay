<template>
  <div class="nav">
    <div class="left"><slot name="left"></slot></div>
    <div class="middle"><slot name="middle"></slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "Navigation"
  }
</script>

<style scoped>
  .nav{
    display: flex;
    width: 100%;
    height: 44px;
  }
  .left,.right{

    text-align: center;
  }
  .middle{

    text-align: center;
  }
</style>

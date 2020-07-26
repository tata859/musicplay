<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "tabBar"
  }
</script>

<style scoped>
  .tab-bar{
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0px;
    background-color: #d5d5d5;
  }
</style>
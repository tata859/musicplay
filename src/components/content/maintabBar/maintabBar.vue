<template>
  <tab-bar>
    <tab-bar-item path="/musichall">
      <div slot="item-show"><img src="~assets/images/origin/yinyue.png" alt=""></div>
      <div slot="item-unshow"><img src="~assets/images/click/yinyue.png" alt=""></div>
      <div slot="item-text">音乐馆</div>
    </tab-bar-item>
    <tab-bar-item path="/singer">
      <div slot="item-show"><img src="~assets/images/origin/tuijian.png" alt=""></div>
      <div slot="item-unshow"><img src="~assets/images/click/tuijian.png" alt=""></div>
      <div slot="item-text">歌手</div>
    </tab-bar-item>
    <tab-bar-item path="/rankin">
      <div slot="item-show"><img src="~assets/images/origin/geren3.png" alt=""></div>
      <div slot="item-unshow"><img src="~assets/images/click/geren3.png" alt=""></div>
      <div slot="item-text">排行榜</div>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <div slot="item-show"><img src="~assets/images/origin/wode.png" alt=""></div>
      <div slot="item-unshow"><img src="~assets/images/click/wode.png" alt=""></div>
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>

</template>

<script>
  import tabBar from 'components/common/tabBar/tabBar'
  import tabBarItem from 'components/common/tabBar/tabBarItem'



  export default {
    name: "maintabBar",
    components:{
      tabBar,
      tabBarItem,

    },
  }
</script>

<style scoped>

</style>
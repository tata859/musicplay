<template>
  <div id="wraper" ref="wraper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from "better-scroll"

  export default {
    name: "betterScroll",
    mounted(){
      this.$nextTick(()=>{
        let wraper = this.$refs.wraper
        this.bscroll = new BScroll(wraper,{
          probeType:3,
          click:true,
          pullUpLoad:true,
          scrollX:true,
        })

        //监听滚动事件
        this.bscroll.on('scroll',(position)=>{
          this.$emit("scroll",position)
        })
      })

    },
    methods:{
      bscrollTo(x,y,time){
        //console.log('1');
        this.bscroll&&this.bscroll.scrollTo(x,y,time)
      },
      brefresh(){
        this.bscroll&&this.bscroll.refresh()
        //console.log(ss);
      },
    },
  }
</script>

<style scoped>

</style>
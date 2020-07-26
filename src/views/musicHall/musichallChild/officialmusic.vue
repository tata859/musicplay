<template>
  <div class="officialmusic">
    <mt-swipe :auto="2000" class="mint">
      <mt-swipe-item class="mint-elinfo" v-for="(item,index) in official.officialPlaylist" :key="index">
        <img :src="item.cover " alt="">
      </mt-swipe-item>
    </mt-swipe>

    <div>
      <div class="official-title">
        <h2>官方歌单</h2>
        <div class="more"><span>更多》</span></div>
      </div>

      <better-scroll @scroll="officialScroll" class="official-bscroll" ref="offscroll">
        <ul class="official-image" ref="officialPlaylist">
          <li class="official-image-content" v-for="(item,index) in official.officialPlaylist" :key="index" @click="officialClick(item)">
            <img :src="item.cover" alt="">
            <h4 class="item-title">{{item.title}}</h4>
          </li>
        </ul>
      </better-scroll>
      </div>
    <div>
      <div class="official-title">
        <h2>达人歌单</h2>
        <div class="more"><span>更多》</span></div>
      </div>
      <betterScroll class="official-bscroll">
        <ul class="official-image" ref="ugcPlaylist">
          <li class="official-image-content" v-for="(item,index) in official.ugcPlaylist" :key="index" @click="officialClick(item)">
            <img :src="item.cover" alt="">
            <h4 class="item-title">{{item.title}}</h4>
          </li>
        </ul>
      </betterScroll>
    </div>
    <div>
      <div class="official-title">
        <h2>专区</h2>
        <div class="more"><span>更多》</span></div>
      </div>
      <betterScroll class="official-bscroll">
        <ul class="official-image" ref="zoneList">
          <li class="official-image-content" v-for="(item,index) in official.zoneList" :key="index">
            <img :src="item.cover" alt="">
            <h4 class="item-title">{{item.title}}</h4>
          </li>
        </ul>
      </betterScroll>

    </div>
  </div>
</template>

<script>
  import betterScroll from "components/comment/betterScroll/betterScroll"

  export default {
    name: "officialmusic",
    props:{
      official:{}
    },
    data(){
      return {
      }
    },
    components:{
      betterScroll
    },
    watch:{
     official() {
       this.officialwidth()
       this.ugcwidth()
       this.zonewidth()
     }
    },
    methods:{
      officialClick(item){
        this.$router.push("/musichall/" + `${item.id}`)
        //this.$router.push("/detail/")
      },
      officialScroll(position){
        console.log(position.y);
      },
      officialwidth() {
        this.$nextTick(()=>{
          let officialPlaylist = this.$refs.officialPlaylist.children;
          let sum = 0;
          for(let i = 0; i < officialPlaylist.length; i++) {
            sum +=(officialPlaylist[i].clientWidth +10*2)
          }
          this.$refs.officialPlaylist.style.width = sum + "px";
        })

      },
      ugcwidth() {
        this.$nextTick(()=>{
          let ugcPlaylist = this.$refs.ugcPlaylist.children;
          let sum = 0;
          for(let i = 0; i < ugcPlaylist.length; i++) {
            sum +=(ugcPlaylist[i].clientWidth +10*2)
          }
          this.$refs.ugcPlaylist.style.width = sum + "px";
        })

      },
      zonewidth() {
        this.$nextTick(()=>{
          let zoneList = this.$refs.zoneList.children;
          let sum = 0;
          for(let i = 0; i < zoneList.length; i++) {
            sum +=(zoneList[i].clientWidth +10*2)
          }
          this.$refs.zoneList.style.width = sum + "px";
        })

      },
    },
  }
</script>

<style lang="less" scoped>

  .officialmusic{
    /*width: 375px;*/
    padding-bottom: 69px;
  }
  .mint{
    margin: 0 10px;
    height: 200px;

    .mint-elinfo img{
      width: 100%;
      height: 200px;
    }
  }

  .official-bscroll{
    width: 375px;
    height: 128px;
    overflow: hidden;
  }
  .official-title{
    display: flex;
    margin: 20px 0;
    height: 60px;
    line-height: 60px;

    h2{
      margin-left: 10px;
      flex: 1;
    }

    .more span{
      margin-right: 10px;
      height: 60px;
      line-height: 60px;
    }
  }
  .official-image{
     display:flex ;

    /* flex-wrap: nowrap;*/
    .official-image-content{
      margin: 0 10px;
      width: 128px;
      height: 128px;

      img{
        width: 100px;
        height: 100px;
      }

      .item-title{
        width: 100px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

   }





</style>
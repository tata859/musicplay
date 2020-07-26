<template>
  <better-scroll>
    <div>
      <div v-if="Object.keys(singerlist).length" class="singer-detail">
        <div class="singerlist-img">
          <img :src="singerlist.backgroundImage" :alt="singerlist.singer_name">
        </div>
        <div class="song-title">
          <h3>歌曲</h3>
        </div>

        <div>
          <ul class="songlist">
            <li v-for="(item,index) in singerlist.singer_songlist" @click="listenmusic(item,index)">
              <h4>{{item.name}}</h4>
              <span>{{singerlist.singer_name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </better-scroll>

</template>

<script>
  import axios from "axios"
  import betterScroll from 'components/comment/betterScroll/betterScroll'

  export default {
    name: "singerdetail",
    data(){
      return {
        singerlist:{},
        songData:{},
      }
    },
    components:{
      betterScroll
    },
    created(){
      axios.get('http://118.89.195.61:5555/music/singer',{
        params:{
          singermid:this.$route.params.id
        }
      }).then((res)=>{
        this.singerlist = res.data[0]
        //console.log(res.data[0]);
      }).catch(()=>{})
    },
    beforeDestroy(){
    },
    methods:{
      listenmusic(item,index){
        console.log(item);
        let itemlist = {
          singerid:item.singer[0].id,
          singermid:item.singer[0].mid,
          singername:item.singer[0].name,
          songid:item.id,
          songmid:item.mid,
          songname:item.name,
          songtitle:item.title
        }
        this.$store.dispatch("setsingerlist",itemlist)
        //console.log(index);
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:item.mid
          }
        }).then((res)=>{
          this.songData = res.data[0].songData
          //console.log(res.data[0].songData);
          this.$store.dispatch("songdata",res.data[0].songData)
        }).catch(()=>{})
        //this.$store.commit("current",index)

        //this.$router.push('/songdtail/'+ item.mid)

      },
    },
  }
</script>

<style scoped>
  #wraper{
    height: calc(100vh - 59px);
    overflow: hidden;
  }
  .singer-detail{
    margin-bottom: 89px;
  }
  .singerlist-img{
    height: 100%;
  }
  .singerlist-img img{
    width: 100%;
    height: 200px;
  }
  .song-title{
    padding: 10px;
  }
  .songlist li{
    padding: 10px 15px 0;
  }
</style>
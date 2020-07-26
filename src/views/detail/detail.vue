<template>
  <better-scroll>
  <div class="detail">
    <div class="detail-img"><img :src="pagedetail.picurl" alt=""></div>
    <div class="detail-song">
      <ul>
        <li v-for="(item,index) in pagedetail.songlist" :key="index" @click="pageaxios(item)">
          <div class="song-name">{{item.name}}></div>
          <p>{{item.singer.name}}</p>
        </li>
      </ul>
    </div>
  </div>
    </better-scroll>
</template>

<script>
  import axios from "axios"
  import betterScroll from "components/comment/betterScroll/betterScroll"

  export default {
    name: "detail",
    data(){
      return {
        pagedetail:{}
      }
    },
    components:{
      betterScroll
    },
    created(){
      axios.get("http://118.89.195.61:5555/api/pagesong",{
        params:{
          id:this.$route.params.id
        }
      }).then(res=>{
            console.log(res.data[0]);
            this.pagedetail = res.data[0]
          }
      )
    },
    methods:{
      pageaxios(item){
        console.log(item);
        let itemlist = {
          singerid:item.singer.id,
          singermid:item.singer.mid,
          singername:item.singer.name,
          songid:{},
          songmid:item.mid,
          songname:item.name,
          songtitle:{},
        }
        this.$store.dispatch("setsingerlist",itemlist)
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:item.mid
          }
        }).then((res)=>{
          //this.songData = res.data[0].songData
          //console.log(res.data[0].songData);
          this.$store.dispatch("songdata",res.data[0].songData)
        }).catch(()=>{})
      },
    },
  }
</script>

<style scoped>
  #wraper {
    height: calc(100vh - 59px);
    overflow: hidden;
  }
  .detail{
    margin-bottom: 49px;
    width: 100%;
    background-color: #fff;
  }
  .detail-img{
    height: 237px;
  }
  .detail-img img{
    width: 100%;
    height: 100%;
  }
  .detail-song{
    width: 100%;
    margin-top: 16px;
  }
  .detail-song ul li{
    margin: 0 20px;
    height: 60px;
  }
  .song-name{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 16px;
    color: #626262;
  }
  .detail-song ul li p{
    font-size: 13px;
    color: rgba(98, 98, 98, 0.64);
  }
</style>
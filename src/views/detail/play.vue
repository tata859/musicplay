<template>
  <div ref="somesile"
        v-if="Object.keys(this.$store.state.songdata).length"
        class="detail-song">
      <div @click.stop="listhidden" class="song-play">
        <div class="song-name">
          <div  class="close-somesile" @click="tochang"><img src="~assets/images/xiala.png" alt=""></div>
          <h2 >{{songData.songName}}</h2>
        </div>
        <div class="singer-name" v-if="songData.singer">{{songData.singer[0].name}}</div>
        <div class="song-bgc" ref="songbgc"><img :src="songData.songpic" alt=""></div>
        <div class="song-time">
          <div class="start-time">{{currentTime}}</div>
          <div class="song-audio" ref="songaudio">
            <audio :src="songData.m4aUrl" ref="refaudio" @timeupdate="onplaying" @ended="ended"></audio>
            <div class="progress-bar" ref="progressbar"></div>
          </div>
          <div class="end-time">{{songData.playTime}}</div>
        </div>
        <div class="song-ico">
          <div class="item-ico random-ico"><img src="~assets/images/song/suiji-copy.png" alt=""></div>
          <div class="item-ico left-ico"><img src="~assets/images/song/xia.png" alt="" @click="toup"></div>

          <div class="item-ico audio-ico" @click="toPlay">
            <img v-if="!icoshow" src="~assets/images/song/bofang_1.png" alt="">
            <img v-if="icoshow" src="~assets/images/song/bofang.png" alt="">
          </div>

          <div class="item-ico right-ico"><img src="~assets/images/song/shang.png" alt=""@click="tonext"></div>
          <div class="item-ico" >
            <img src="~assets/images/song/list.png" alt="" @click.stop="listClick">
          </div>
        </div>

        <div class="song-list" v-if="listishow">
          <better-scroll class="sroll">
            <div class="list-item">
              <div><h3>单曲</h3></div>
              <ul>
                <li v-for="(list,index) in songlist" class="song-list-content" :key="list.songname">
                  <div class="list-index">{{index|indexfilter}}</div>
                  <div class="list-name" @click="playClick(list,index)"
                       :class="{active:index==$store.state.currentIndex}">
                    <h4 class="list-song-name">{{list.songname}}</h4>
                    <div class="list-singer-name">{{list.singername}}</div>
                  </div>
                  <div class="song-delete" @click="deleteClick(index)"><img src="~assets/images/shanchu.svg" alt=""></div>
                </li>
              </ul>
            </div>
          </better-scroll>
        </div>
      </div>
    <transition name="fade">
      <div class="smil-list"  v-show="isshrink">
        <div class="song-pic"><img :src="songData.songpic" alt=""></div>
        <div class="minsong-name" @click="recovery">
          <span>{{songData.songName}}</span>
          <span v-if="songData.singer">{{songData.singer[0].name}}</span>
        </div>
        <div class="play-pause" @click="toPlay">
          <img v-if="!icoshow" src="~assets/images/song/bofang_1.png" alt="">
          <img v-if="icoshow" src="~assets/images/song/bofang.png" alt="">
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import axios from "axios"
  import betterScroll from 'components/comment/betterScroll/betterScroll'

  export default {
    name: "play",
    components:{
      betterScroll
    },
    data(){
      return {
        sing:null,
        songData:{},      //单个歌曲
        songlist:[],      //历史歌单
        icoshow:false,
        timeAll:0,        //歌曲初始时间
        widthAll:0,        //歌曲初始进度
        currentTime:"00:00",    //当前播放时间
        isshrink:true,
        show: true,
        listishow:false,
        ishow:false,
      }
    },
    updated(){
      this.songData = this.$store.state.songdata
      this.songlist = this.$store.state.songlist
    },
    watch:{
      songData(){
        //console.log(this.$store.state.songdata);

        setTimeout(()=>{
          this.$refs.refaudio.play()
          this.icoshow = false
          //播放总时间转换为秒数
          this.timeAll = this.songData.playTime.split(":")[0]*60+this.songData.playTime.split(":")[1]*1
          this.widthAll = this.$refs.songaudio.offsetWidth
          this.$refs.songbgc.style.animation = "rotate "+"8S "+"linear "+"infinite";
        },500)
      },
    },
    filters:{
      indexfilter(index){
        return (index+1)<10?"0"+(index+1):index+1
      },
    },
    methods:{
      //点击播放
      toPlay(){
        this.$nextTick(()=>{
          this.icoshow?this.$refs.refaudio.play():this.$refs.refaudio.pause()
          this.icoshow=!this.icoshow
          //this.$refs.songbgc.style.animation = "rotate "+"8s "+"linear "+"infinite";
        })

      },
      //播放实时监听
      onplaying(){
        //this.$refs.refaudio.currentTime
        let protime=this.$refs.refaudio.currentTime
        let proWidth = this.widthAll * protime / this.timeAll
        //console.log(proWidth);
        this.$refs.progressbar.style.width = proWidth +"px"
        let minter =Math.floor(protime / 60)
        let second =Math.floor(protime % 60)
        minter>10?minter=minter:minter="0"+minter
        second>10?second=second:second="0"+second
        this.currentTime = minter +":" + second


      },
      //上一曲
      toup(){
        this.$store.commit("currentdown")
        let index = this.$store.state.currentIndex
        //console.log(index);
        let mid = this.$store.state.songlist[index].songmid
        //请求数据
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:mid
          }
        }).then((res)=>{
          this.$store.state.songdata = res.data[0].songData
          console.log(res.data[0].songData);
        }).catch(()=>{})
        setTimeout(()=>{
          this.icoshow=false
          //console.log(this.icoshow);
          this.icoshow?this.$refs.refaudio.pause():this.$refs.refaudio.play()
        },300)
      },
      //下一曲
      tonext(){
        this.$store.commit("currentAdd")
        let index = this.$store.state.currentIndex
        //console.log(index);
        let mid = this.$store.state.songlist[index].songmid
        //console.log(mid);
        //请求数据
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:mid
          }
        }).then((res)=>{
          this.$store.state.songdata = res.data[0].songData
          console.log(res.data[0].songData);
        }).catch(()=>{})
        setTimeout(()=>{
          this.icoshow=false
          //console.log(this.icoshow);
          this.icoshow?this.$refs.refaudio.pause():this.$refs.refaudio.play()
        },500)
      },
      //播放结束
      ended(){
        this.icoshow=!this.icoshow
        this.tonext()
      },
      //yincang
      tochang(){
        this.isshrink = true
        this.$refs.somesile.style.top = 100 +"%"
      },
      //显示
      recovery(){
        this.isshrink = false
        this.$refs.somesile.style.top = 0;
      },
      //播放记录
      listClick(){
        this.listishow = true
      },
      //点击收缩列表区域
      listhidden(event){
        if(event.screenY<420){
          this.listishow = false
        }
      },
      //请求数据
      playClick(list,index){
        this.$store.commit("current",index)
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:list.songmid
          }
        }).then((res)=>{
          this.$store.dispatch("songdata",res.data[0].songData)
        }).catch(()=>{})
      },
      //移除单曲
      deleteClick(index){
        this.$store.dispatch("deleteClick",index)


      },
      //播放图标旋转
    },
  }
</script>

<style scoped>
  .fade-enter,.fade-leave{
    opacity:0
  }
  .fade-enter-to,.fade-leave-to{
    opacity:1
  }
  .fade-enter-active,.fade-leave-active{
    transition:all 1s
  }
  .sroll{
    position: absolute;
    top:0px;
    overflow: hidden;
    width: 100%;
    height: 335px;
  }
  .detail-song{
    position: fixed;
    top:100%;
    left: 0;
    /*touch-action: none;*/
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: #2f1f1a;
    transition: all 0.1s linear;
  }
  .song-play{
    height: 100%;
  }
  .song-name{
    display: flex;
    padding-top: 15px;
    margin-right: 30px;
    height: 50px;
    overflow: hidden;
    line-height: 50px;
    color: rgba(255, 255, 255, 0.75);
  }
  .song-name h2{
    margin-right: 30px;
  }
  .close-somesile{
    margin-left: 30px;
    margin-right: 30px;
    width: 40px;
    height: 50px;
    z-index:3;
  }
  .close-somesile img{
    width: 100%;
    height: 100%;
  }
  .song-name h2{
    width: 230px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    letter-spacing:2px;
    text-align: center;
  }
  .song-bgc{
    margin: 25px auto;
    width: 200px;
    height: 200px;
    border-radius: 50%;


    /*-webkit-animation:rotate 8s linear infinite;*/
  }
 /* @-webkit-keyframes rotate{
    from{transform: rotate(0deg);}
    to{transform: rotate(360deg);}
  }*/
  @keyframes rotate{
    from{transform: rotate(0deg);}
    to{transform: rotate(360deg);}
  }
  .song-bgc img{
    width: 200px;
    height: 200px;
    border-radius: 50%;
  }
  .singer-name{
    margin: 0 auto  20px;
    text-align: center;
    color: #bcbcbc;
  }
  .song-time{
    position: absolute;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    height: 23px;
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
  }
  .start-time{
    margin-right: 10px;
  }
  .end-time{
    margin-left: 10px;
  }
  .song-audio{
    position:relative;
    top:10px;
    width: 210px;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.38);
  }
  .progress-bar{
    width: 0;
    height: 3px;
    background-color: #ffffff;
  }
  .song-ico{
    position: absolute;
    bottom: 30px;
    display: flex;
    height: 50px;
    line-height: 50px;
  }
  .item-ico{
    flex: 1;
    text-align: center;
  }
  .item-ico img{
    vertical-align: middle;
    width: 50%;
    height: 60%;
  }
  .random-ico img{
    width: 30%;
    height: 50%;
  }
  .song-ico .left-ico img{
    margin-right: -20px;
  }
  .right-ico img{
    margin-left: -20px;
  }
  .song-ico .audio-ico img{
    vertical-align: middle;
    width: 80%;
    height: 90%;
  }
  .smil-list{
    position: fixed;
    display: flex;
    left: 50%;
    bottom: 54px;
    transform: translateX(-50%);
    width: 97%;
    height: 40px;
    border-radius: 10px;
    background-color: rgb(173, 175, 173);
  }
  .minsong-name{
    flex: 5;
    padding: 0 10px;
    width: 271px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    letter-spacing:2px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #ffffff;
  }
  .minsong-name span{
    padding: 0 10px;
  }
  .play-pause,.song-pic{
    flex: 1;
    width: 40px;
    height: 100%;
  }
  .play-pause img,.song-pic img{
    width: 40px;
    height: 40px;
  }
  .song-list{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 335px;
    z-index: 4;
    background-color: #fff;
  }
  .list-item{
   width: 100%;
    min-height: 335px;
  }
  h3{
    margin-top: 15px;
    padding-left: 15px;
    font-size: 22px;
  }
  .song-list-content{
    margin-top: 10px;
    line-height: 24px;
    display: flex;
  }
  .list-index{
    width:50px;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #000;
  }
  .list-name{
    width: 250px;
  }
  .list-song-name{
    font-size: 17px;
  }
  .list-singer-name{
    padding-left: 5px;
    font-size: 14px;
    color: #696969;
  }
  .song-delete{
    width: 75px;
  }
  .song-delete img{
    padding-top: 10px;
    padding-left: 10px;
    height: 30px;
  }
  .active{
    color: #5355ff;
  }
</style>
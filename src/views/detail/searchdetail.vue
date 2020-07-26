<template>
  <div class="app-item">
    <transition name="input">
      <div class="tab">
        <div class="tab-header">
          <div class="tab-back" @click="unishow"><img src="~assets/images/back.png" alt=""></div>
          <div class="tab-form" >
            <form action="#" style="height: 40px;">
              <input type="search" value class="tab-input" placeholder="搜索"
                     ref="inputref">
            </form>
          </div>
          <div class="tab-seach" @click="searchClick">搜索</div>
        </div>
        <better-scroll>
          <div >
            <ul class="tab-content" v-if="songdata.length">
              <li v-for="(item,index) in songdata" class="song-content" @click="emitaxios(item)">
                <h4 class="song-name">{{item.songname}}</h4>
                <div class="song-singer">
                  <span class="singer-name">{{item.singername}}</span>
                  <span>{{item.songname}}</span>
                </div>

              </li>
            </ul>
          </div>
        </better-scroll>
      </div>
    </transition>
  </div>


</template>

<script>
  import axios from "axios"
  import betterScroll from "components/comment/betterScroll/betterScroll"  //滑动组件

  export default {
    name: "searchdetail",
    components:{
      betterScroll
    },
    data(){
      return {
        inputvalue:null,
        songdata:[],
      }
    },
    methods:{
      searchClick(){
        if(this.$refs.inputref.value&&this.inputvalue != this.$refs.inputref.value){
          console.log(this.$refs.inputref.value);
          axios.get("http://118.89.195.61:5555/seach",{
            params:{
              searchkey:this.$refs.inputref.value
            }
          })
              .then((res)=>{
                console.log(res.data)
                this.songdata = res.data
              })
              .catch((err)=>{throw err})
        }
        this.inputvalue = this.$refs.inputref.value

      },

      unishow(){
        this.$emit("unishow")
      },
      emitaxios(item){
        this.ishow=false
        console.log(item);
        this.$store.dispatch("setsingerlist",item)
        axios.get('http://118.89.195.61:5555/music/song',{
          params:{
            singermid:item.songmid
          }
        }).then((res)=>{
          this.songData = res.data[0].songData
          //console.log(res.data[0].songData);
          this.$store.dispatch("songdata",res.data[0].songData)
        }).catch(()=>{})
      },
    },
  }
</script>

<style scoped>
  #wraper{
    height: calc(100vh - 59px);
    overflow: hidden;
  }
  .app-item{
    position: absolute;
    top:0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }

  .tab{
    position: absolute;
    top:0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    z-index: 5;
    text-align: center;
    background-color: #fff;
  }
  .tab-header{
    display: flex;
    margin-top: 20px;
    width: 100%;
    height: 40px;
  }
  .tab-back{
    width: 75px;
  }
  .tab-back img{
    width: 40px;
    height: 30px;
  }
  .tab-form{
    touch-action: none;
    width: 225px;
    /*background-color: #fff;*/
  }
  .tab-seach{
    touch-action: none;
    width: 75px;
    line-height: 30px;
    font-size: 17px;
  }
  .tab-input{
    padding-left: 10px;
    width: 225px;
    height: 30px;
    font-size: 18px;
    border-radius: 20px;
    border-color: #b9b9b9;
    border-top-color: #f6f6f6;
    border-left-color: #f6f6f6;
    outline:medium;
  }
  .tab-content{
    padding-top: 20px;
    padding-left: 20px;
    width: 100%;

    background-color: white;
  }
  .song-content{
    margin-top: 5px;
    text-align: left;
    width: 100%;
    height: 50px;
    letter-spacing:2px ;
  }
  .song-content .song-name{
    width: 300px;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .song-singer{
    width: 300px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .song-content .singer-name{
    padding-top: 2px;
    padding-left: 10px;
    font-size: 14px;
    color: #4b83a7;
  }
  .song-content .singer-name::after{
    content: "-";

  }
</style>
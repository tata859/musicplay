<template>
  <better-scroll>
    <div class="ranking" v-if="groupNameData">
      <h3>{{groupNameData.groupName}}</h3>
      <div class="block-rankinglist" v-for="item in groupNameData.toplist" :key="item.title">
        <div class="ranking-content">
          <h3>{{item.title}}</h3>
          <ul class="item-content">
            <li v-for="(list,index) in item.song">
              <strong>{{index}}</strong>
              <span>{{list.title}}</span>
              <span>{{list.singerName}}</span>
            </li>
          </ul>
        </div>
        <div class="ranking-img">
          <img :src="item.frontPicUrl" alt="">
        </div>
      </div>
    </div>
  </better-scroll>

</template>

<script>
  import axios from "axios"
  import betterScroll from 'components/comment/betterScroll/betterScroll'

  export default {
    name: "ranking",
    data(){
      return {
        groupNameData:{}
      }
    },
    components:{
      betterScroll,
    },
    created(){
      axios.get("http://118.89.195.61:5555/rankinglist").then((res)=>{
        console.log(res);
        this.groupNameData = res.data.rankingDatas[0]
      }).catch((err)=>{throw err})
    },
  }
</script>

<style scoped>
  #wraper{
    height: calc(100vh - 59px);
    overflow: hidden;
  }
  .ranking{
    margin:20px 0px 49px 10px;
  }
  .block-rankinglist{
    display: flex;
    margin-left: 15px;
    margin-bottom: 30px;
    padding-top: 10px;
    height: 120px;
    /*background-color: #f5f5f5;*/
  }
  .ranking-content{
    flex: 3;
    font-size: 14px;
  }
  .item-content {
    width: 100%;
    padding-top: 5px;
  }
  .item-content li{
    width: 200px;
    white-space:nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-content span{
    color: #a3a3a5;
    line-height: 25px;

  }
  .ranking-img{
    flex: 1;
    padding: 15px;
    border-radius: 30px;
  }
  .ranking-img img{
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
  strong:after{
    content: ":";
    padding:0 5px;
  }
  span:nth-child(2):after{
    content: "--";
  }
</style>
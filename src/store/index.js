import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    songlist:[],
    songdata:{},
    currentIndex:0
  },
  mutations: {
    current(state,payload){
      state.currentIndex = payload;
    },     //播放时的currentIndex
    currentAdd(state){
      let len = state.songlist.length - 1
      if(state.currentIndex>=len){
        state.currentIndex = 0
      }else{state.currentIndex++}
    },        //上一曲的currentIndex
    currentdown(state){
      let len = state.songlist.length - 1
      if(state.currentIndex<=0){
        state.currentIndex = len
      }else{state.currentIndex--}
    },      //下一曲的currentIndex

  },
  actions: {
    deleteClick(context,payload) {
      if (payload !==context.state.currentIndex) {
        context.state.songlist.splice(payload, 1)
        if (payload < context.state.currentIndex) {
          state.currentIndex--
        }
      }
    },  //盘兑换是否删除与该变currentIndex
    setsingerlist(context,payload){
      //console.log(payload);
      //判断是否已有歌曲
      let oldlist = context.state.songlist.findIndex((list,index)=>{
        return list.songname == payload.songname
      })
      if(oldlist ==-1){
        context.state.songlist.splice(context.state.currentIndex,0,payload)

      }
    },
    songdata(context,payload){
      //console.log(payload);
      //当前播放歌曲
      context.state.songdata = payload
      console.log(context.state.songdata);
    },
  },
  modules: {
  }
})

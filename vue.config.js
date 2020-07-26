//引入path模块
const path = require("path")


module.exports={
  //准备配置别名
  configureWebpack:{
    /*publicPath: './',
    outputDir:"dist",
    assets:"static",
    indexPath:"index.html",*/
    resolve:{
      alias:{
        'src': path.resolve(__dirname,'src'),
        'assets':path.resolve(__dirname,'src/assets'),
        'components': path.resolve(__dirname,'src/components'),
        'network' : path.resolve(__dirname,'src/network'),
        'router' : path.resolve(__dirname,'src/router'),
        'store': path.resolve(__dirname,'src/store'),
        'views' : path.resolve(__dirname,'src/views'),
      }
    }
  },

}
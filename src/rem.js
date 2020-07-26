
//基准大小
const baseSize = 32
//设置rem函数
function setRem() {
  //当前相对于750宽度缩放比例
  const scale = document.documentElement.clientWidth/750
  //设置页面根节点字体大小
  document.documentElement.style.fontSize = (baseSize * Math.min(scale,2)) + "px"

}
setRem()
// 视口窗口大小改变时重新设置 rem
window.onresize = function () {
  setRem()
}
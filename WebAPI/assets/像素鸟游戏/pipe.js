/**
 * 管道对象
 */
function Pipe(height, width, type, posX, posY){
  this.size = {
    height: height || 0,
    width: width || 0,
  },
  this.type = type || 0, // 管道的类型,开头朝上: 0,开口朝下:1
  this.posX = posX || 0,
  // this.posY = this.type === 0 ? settings.clientHeight - this.size.height : 0
  this.posY = posY || 0
  this.shouldDel = false
  this.move = function (step){
    this.posX -= step
  }
  this.checkDel = function (){
    if(this.posX + this.size.width <= 0){
      this.shouldDel = true
    }
  }
}
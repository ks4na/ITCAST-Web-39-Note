function RandomBox(parentNode, boxNum){
  this.parentNode = parentNode || document.body
  this.width = parentNode && parentNode.clientWidth || 800
  this.height = parentNode && parentNode.clientHeight || 600
  this.backgroundColor = 'lightgray'
  this.boxList = []
  this.boxNum = boxNum || 10
  this.htmlEle = null

  this.init()
}

RandomBox.prototype.init = function (){
  var div = document.createElement('div')
  div.style.width = this.width + 'px'
  div.style.height = this.height + 'px'
  div.style.backgroundColor = this.backgroundColor
  div.style.position = 'relative'
  this.htmlEle = div
  this.parentNode.appendChild(div)

  // 创建boxNum个方块
  for(var i = 0; i < this.boxNum; i ++){
    var box = new Box(this.htmlEle)
    this.boxList.push(box)
  }
}

RandomBox.prototype.createBox = function (){
  var box = new Box(this.htmlEle)
  this.boxList.push(box)
}

RandomBox.prototype.run = function (freshFreq){
  var _this = this
  setInterval(start, freshFreq)

  function start(){
    for(var i = 0; i < _this.boxList.length; i ++){
      var item = _this.boxList[i]
      item.setRandomPosition()
    }
  }
  // 函数立即执行
  start()
}
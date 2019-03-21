function Box(parentNode, options){
  this.width = options && options.width || 30
  this.height = options && options.height || 30
  this.backgroundColor = options && options.backgroundColor || '#000'
  this.posX = options && options.posX || 0
  this.posY = options && options.posY || 0
  this.parentNode = parentNode
  this.htmlEle = null

  this.init()
}

Box.prototype.init = function (){
  var div = document.createElement('div')
  div.style.width = this.width + 'px'
  div.style.height = this.height + 'px'
  div.style.backgroundColor = this.backgroundColor
  div.style.position = 'absolute'
  div.style.left = this.posX + 'px'
  div.style.top = this.posY + 'px'

  this.htmlEle = div
  if(this.parentNode){
    this.parentNode.appendChild(div)
  }else{
    throw new Error('box without parentNode')
  }
}

Box.prototype.setRandomPosition = function (){
  var widthMax = this.parentNode.clientWidth - this.width
  var heightMax = this.parentNode.clientHeight - this.height

  var posX = Util.getRandomInt(0, widthMax / this.width - 1) * this.width
  var posY = Util.getRandomInt(0, heightMax / this.height - 1) * this.height

  var randomBgc = 'rgb(' + Util.getRandomInt(0, 255) + ',' + Util.getRandomInt(0, 255) + ',' + Util.getRandomInt(0, 255) + ')'

  this.posX = posX
  this.posY = posY
  this.backgroundColor = randomBgc

  this.htmlEle.style.left = this.posX + 'px'
  this.htmlEle.style.top = this.posY + 'px'
  this.htmlEle.style.backgroundColor = this.backgroundColor
}
/*
* util.js  ---------------------------------------
* */
var Util = {
  isUnique: function (arr) {
    var obj = {}
    for (var i = 0; i < arr.length; i++) {
      if (obj[arr[i]]) {
        return false
      } else {
        obj[arr[i]] = 1
      }
    }
    return true
  },

  arrayDiff: function (a, b) {
    for (var i = 0; i < b.length; i++) {
      for (var j = 0; j < a.length; j++) {
        if (a[j] == b[i]) {
          a.splice(j, 1);
          j = j - 1;
        }
      }
    }
    return a;
  }
}

/*
*
* Food.js ---------------------------------------
* */
;(function (window, undefined){

  window.Food = Food

  function Food(mapNode, options){
    options = options || {}
    this.width = options.width || 25
    this.height = options.height || 25
    this.color = options.color || 'green'
    this.posX = options.posX || 0
    this.posY = options.posY || 0

    this.htmlEle = null

    this.init(mapNode)
  }

  Food.prototype.init = function (mapNode){
    var div = document.createElement('div')
    mapNode.appendChild(div)

    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    div.style.position = 'absolute'
    div.style.left = this.posX + 'px'
    div.style.top = this.posY + 'px'

    this.htmlEle = div
  }

  Food.prototype.render = function (){
    var div = this.htmlEle

    div.style.width = this.width
    div.style.height = this.height
    div.style.backgroundColor = this.color
    div.style.left = this.posX + 'px'
    div.style.top = this.posY + 'px'
  }

  Food.prototype.isEaten = function (snake){
    // var positionArr = []
    // for(var i = 0; i < snake.bodyUnits.length; i ++){
    //   var item = snake.bodyUnits[i]
    //   positionArr.push(item.posX + 'x' + item.posY)
    // }
    // var foodPosition = this.posX + 'x' + this.posY
    // if(positionArr.indexOf(foodPosition) !== -1){
    //   return true
    // }
    // return false

    // 只需要与蛇头做重叠判断
    var snakeHeadPosX = snake.bodyUnits[0].posX
    var snakeHeadPOsY = snake.bodyUnits[0].posY
    if(snakeHeadPosX === this.posX && snakeHeadPOsY === this.posY){
      return true
    }else{
      return false
    }
  }

  Food.prototype.changePosition = function (map, snake){
    var mapHorizontalMaxCount = Math.floor(map.width / this.width)
    var mapVerticalMaxCount = Math.floor(map.height / this.height)

    var mapPositionArr = []
    for(var i = 0; i < mapHorizontalMaxCount; i ++){
      var widthPos = i * this.width
      for(var j = 0; j < mapVerticalMaxCount; j ++){
        var heightPos = j * this.height
        mapPositionArr.push(widthPos + 'x' + heightPos)
      }
    }

    var snakePositionArr = []
    for(var i = 0; i < snake.bodyUnits.length; i ++){
      var item = snake.bodyUnits[i]
      snakePositionArr.push(item.posX + 'x' + item.posY)
    }

    var safePositionArr = Util.arrayDiff(mapPositionArr, snakePositionArr)

    if(safePositionArr.length <= 0){
      throw new Error('没有剩余空间放置食物')
    }
    var index = Math.floor(Math.random() * safePositionArr.length)

    this.posX = parseInt(safePositionArr[index].split('x')[0])
    this.posY = parseInt(safePositionArr[index].split('x')[1])
  }
})(window)

/*
* snake.js --------------------------------------------
* */
;(function (window, undefined){

  window.Snake = Snake

  function Snake(mapNode, options){
    options = options || {}
    this.initLen = options.initLen || 3
    this.bodyUnits = []
    this.bodyUnitWidth = options.bodyUnitWidth || 25
    this.bodyUnitHeight = options.bodyUnitHeight || 25
    this.posX = options.posX || 100
    this.posY = options.posY || 300
    this.snakeHeadColor = options.snakeHeadColor || 'red'
    this.snakeBodyColor = options.snakeBodyColor || 'blue'
    this.moveDirection = options.moveDirection || 'up'

    this.init(mapNode)
  }


  Snake.prototype.init = function (mapNode){

    for(var i = 0; i < this.initLen; i ++){
      var options = {}
      options.color = i === 0 ? this.snakeHeadColor : this.snakeBodyColor
      options.posX = this.posX
      options.posY = this.posY + i * this.bodyUnitHeight
      options.width = this.bodyUnitWidth
      options.height = this.bodyUnitHeight

      var bodyUnit = new SnakeBodyUnit(options)

      this.bodyUnits.push(bodyUnit)
    }

    // 渲染整个蛇到界面
    for(var i = 0; i < this.bodyUnits.length; i++){
      var item = this.bodyUnits[i]
      mapNode.appendChild(item.htmlEle)
    }

  }

  Snake.prototype.render = function (){

    for(var i = 0; i < this.bodyUnits.length; i++){
      var item = this.bodyUnits[i]
      item.render()
    }
  }

  Snake.prototype.changeDirection = function (direction){
    if(this.moveDirection === 'up' && direction === 'down'
      || this.moveDirection === 'down' && direction === 'up'
      || this.moveDirection === 'left' && direction === 'right'
      || this.moveDirection === 'right' && direction === 'left'){
      return
    }
    this.moveDirection =  direction
  }

  Snake.prototype.move = function (){

    for(var i = this.bodyUnits.length - 1; i > 0; i --){
      this.bodyUnits[i].posX = this.bodyUnits[i - 1].posX
      this.bodyUnits[i].posY = this.bodyUnits[i - 1].posY
    }
    var snakeHead = this.bodyUnits[0]
    switch(this.moveDirection){
      case 'up':
        snakeHead.posY -= snakeHead.height
        this.posY = snakeHead.posY
        break
      case 'down':
        snakeHead.posY += snakeHead.height
        this.posY = snakeHead.posY
        break
      case 'left':
        snakeHead.posX -= snakeHead.width
        this.posX = snakeHead.posX
        break
      case 'right':
        snakeHead.posX += snakeHead.width
        this.posX = snakeHead.posX
        break
      default:
    }
  }

  Snake.prototype.isTouchEdge = function (map){
    var maxX = map.width - this.bodyUnitWidth
    var maxY = map.height - this.bodyUnitWidth

    if(this.posX <= maxX && this.posX >= 0 && this.posY >= 0 && this.posY <= maxY){
      return false
    }
    return true
  }

  Snake.prototype.isTouchSelf = function (){

    var positionArr = []
    for(var i = 0; i < this.bodyUnits.length; i++){
      var item = this.bodyUnits[i]
      positionArr.push(item.posX + 'x' + item.posY)
    }

    return !Util.isUnique(positionArr)
  }

  Snake.prototype.addBodyLength = function (){
    var tailEle = this.bodyUnits[this.bodyUnits.length - 1].htmlEle
    var posX = parseInt(tailEle.style.left)
    var posY = parseInt(tailEle.style.top)

    var options = {}
    options.color = this.snakeBodyColor
    options.posX = posX
    options.posY = posY
    options.width = this.bodyUnitWidth
    options.height = this.bodyUnitHeight

    var bodyUnit = new SnakeBodyUnit(options)

    this.bodyUnits.push(bodyUnit)

    // 添加到页面中
    var parentNode = this.bodyUnits[0].htmlEle.parentNode
    parentNode.appendChild(bodyUnit.htmlEle)

  }


  function SnakeBodyUnit(options){
    options = options || {}
    this.width = options.width || 25
    this.height = options.height || 25
    this.color = options.color || 'white'
    this.posX = options.posX || 0
    this.posY = options.posY || 0

    this.htmlEle = null

    this.init()
  }

  SnakeBodyUnit.prototype.init = function (){
    var div = document.createElement('div')
    this.htmlEle = div

    div.style.position = 'absolute'
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    div.style.left = this.posX + 'px'
    div.style.top = this.posY + 'px'
  }

  SnakeBodyUnit.prototype.render = function (){
    var div = this.htmlEle

    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.color
    div.style.left = this.posX + 'px'
    div.style.top = this.posY + 'px'
  }

})(window)

/*
* map.js --------------------------------------------
* */
;(function (window, undefined){

  window.Map = Map

  function Map(parentNode, options){
    options = options || {}
    this.width = options.width || 800
    this.height = options.height || 600
    this.backgroundColor = options.backgroundColor || 'lightgray'

    this.htmlEle = null

    this.initMap(parentNode)
  }

  Map.prototype.initMap = function (parentNode){
    var div = document.createElement('div')
    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.backgroundColor
    div.style.position = 'relative'
    parentNode.appendChild(div)

    this.htmlEle = div

  }

  Map.prototype.render = function (){
    var div = this.htmlEle

    div.style.width = this.width + 'px'
    div.style.height = this.height + 'px'
    div.style.backgroundColor = this.backgroundColor
  }

})(window)

/*
* game.js --------------------------------------------
* */
;(function (window, undefined){

  window.Game = Game

  function Game(parentNode, options) {
    options = options || {}
    this.map = null
    this.food = null
    this.snake = null

    this.isPaused = true
    this.isGameOver = false
    this.isCompleted = false
    this.timerId = null
    this.freshFreq = options.freshFreq || 300

    this.initGame(parentNode)
  }

  Game.prototype.initGame = function (targetNode) {

    var p = document.createElement('p')
    p.innerText = '空格 = 暂停/开始  |  方向键 = 移动'
    targetNode.appendChild(p)

    // 创建并初始化地图对象
    var map = new Map(targetNode)
    this.map = map

    // 创建并初始化食物对象
    var food = new Food(this.map.htmlEle)
    this.food = food

    // 创建并初始化蛇对象
    var snake = new Snake(this.map.htmlEle)
    this.snake = snake

    // 食物对象位置重置
    this.food.changePosition(this.map, this.snake)
    this.food.render()

  }

  Game.prototype.run = function () {

    if (!window.onkeydown) {
      window.onkeydown = function (e) {
        switch (e.keyCode) {
          case 32:
            this.ChangePauseStatus()
            break
          case 37:
            this.snake.changeDirection('left')
            main()
            clearInterval(this.timerId)
            this.run()
            break
          case 38:
            this.snake.changeDirection('up')
            main()
            clearInterval(this.timerId)
            this.run()
            break
          case 39:
            this.snake.changeDirection('right')
            main()
            clearInterval(this.timerId)
            this.run()
            break
          case 40:
            this.snake.changeDirection('down')
            main()
            clearInterval(this.timerId)
            this.run()
            break
          default:
        }
      }.bind(this)
    }

    var main = function () {

      if (this.shouldContinue()) {

        // 蛇移动
        this.snake.move()

        // 更新游戏状态
        this.updateGameStatus()

        // 渲染DOM视图
        this.render()

      } else {
        clearInterval(this.timerId)
      }
    }.bind(this)
    // main()

    this.timerId = setInterval(main, this.freshFreq)

  }

  Game.prototype.shouldContinue = function () {
    return !this.isPaused && !this.isGameOver && !this.isCompleted
  }

  Game.prototype.updateGameStatus = function () {

    // 判断游戏是否通关
    if (this.checkIsCompleted()) {
      this.isCompleted = true
      return
    }

    // 判断蛇是否撞墙 或者 撞到自己
    if (this.snake.isTouchEdge(this.map) || this.snake.isTouchSelf()) {
      this.isGameOver = true
      return
    }


    // 判断食物是否需要换位置
    if (this.food.isEaten(this.snake)) {
      this.food.changePosition(this.map, this.snake)
      // 蛇 加长身体
      this.snake.addBodyLength()
    }

  }

  Game.prototype.checkIsCompleted = function () {
    // 判断是否游戏通关
    var map = this.map, food = this.food, snake = this.snake
    var mapHorizontalMaxCount = Math.floor(map.width / food.width)
    var mapVerticalMaxCount = Math.floor(map.height / food.height)

    var mapPositionCount = 0
    for (var i = 0; i < mapHorizontalMaxCount; i++) {
      for (var j = 0; j < mapVerticalMaxCount; j++) {
        mapPositionCount++
      }
    }

    var snakePositionCount = snake.bodyUnits.length

    if (mapPositionCount === snakePositionCount) {
      return true
    }

    return false
  }

  Game.prototype.render = function () {

    if (this.isCompleted) {  // 游戏通关
      alert('恭喜，成功通关')
      return
    }
    if (this.isGameOver) {  // 游戏结束
      alert('Game Over')
      return
    }
    // 继续运行, 渲染蛇和食物
    this.snake.render()
    this.food.render()
  }

  Game.prototype.ChangePauseStatus = function () {
    this.isPaused = !this.isPaused
    if(!this.isPaused){
      this.run()
    }
  }
})(window)

/*
* main.js --------------------------------------------
* */

;(function (window, undefined){
  var game = new Game(document.body)
  game.run()
})(window)
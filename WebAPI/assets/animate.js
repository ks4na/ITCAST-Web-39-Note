function animate(ele, endPos, interval = 30, step = 10){
  // 阻止多次点击的加速效果
  if(ele.timerId){
    clearInterval(ele.timerId)
  }
  ele.timerId = setInterval(function (){

    var offset = endPos - ele.offsetLeft
    var isPositiveDirection = offset > 0 ? true : false

    if(Math.abs(offset) > Math.abs(step)){
      step = isPositiveDirection ? Math.abs(step) : -Math.abs(step)
      ele.style.left = ele.offsetLeft + step + 'px'
    }else{
      clearInterval(ele.timerId)
      ele.style.left = endPos + 'px'
    }
  }, interval)
}
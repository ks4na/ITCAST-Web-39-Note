$(function (){
  $.stellar({
    horizontalScrolling: false,
    responsive: true
  })

  // pg4添加window的scroll监听事件
  var eles = $('[data-scroll-listener=true]')
  $(window).scroll(function (){
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    var targetPosY = window.innerHeight + scrollTop
    eles.each(function (i, ele){
      if(targetPosY > getPageOffsetTop(ele)) {
        // $(ele).css({transform: 'scale(1, 1)', opacity: 1})
        $(ele).addClass('zoomIn')
      }else {
          // $(ele).removeAttr('style')
        $(ele).removeClass('zoomIn')
      }
    })
  })

  function getPageOffsetTop(ele){
    var pageOffsetTop = 0
    while(ele.offsetParent){
      pageOffsetTop += ele.offsetTop
      ele = ele.offsetParent
    }
    return pageOffsetTop
  }
})
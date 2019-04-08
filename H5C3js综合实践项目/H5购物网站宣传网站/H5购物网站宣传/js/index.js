$(function () {

  var secondPageShownFlag = false  // 标记第二屏是否已经展示过
  var secondPageSofaFlag = false  // 标记第二屏的沙发是否已经到了第三屏
  var thirdPageShownFlag = false  // 标记第三屏是否已经展示过
  var thirdPageSofaFlag = false  // 标记第三屏的沙发是否已经到了第四屏
  var fourthPageShownFlag = false  // 标记第四屏是否展示完
  var fifthPageShownFlag = false  // 标记第五屏是否展示完
  var sixthPageShownFlag = false  // 标记第六屏是否展示完
  var seventhPageShownFlag = false  // 标记第七屏是否展示完

  $('#fullPage').fullpage({
    navigation: true,  // 显示指示器
    scrollingSpeed: 1200,  // 滚动速度
    // 屏幕加载完成后回调函数
    afterLoad: function (anchorLink, index) {
      if (index === 2 && !secondPageShownFlag) {
        // $('.pg2 .search-bar-container').addClass('first-step')
        // $('.pg2 .search-bar-container .words').addClass('first-step-words')
        //
        // setTimeout(function (){
        //   $('.pg2 .search-bar-container').hide()
        //   $('.pg2 .search-bar-with-words').show()
        //   $('.pg2 .search-bar-with-words').addClass('second-step')
        //   $('.pg2 .others').addClass('second-step-others')
        // }, 2000)

        // 使用jQuery动画比上面添加动画类方便
        $('.pg2 .search-bar-container').animate({'left': '50%', 'marginLeft': -111}, 600, 'easeOutQuart', function () {
          $('.pg2 .search-bar-container .words').fadeIn(600, function () {
            $('.pg2 .search-bar-container').hide(0, function () {
              $('.pg2 .search-bar-with-words').show().animate({width: 150, marginRight: -240, bottom: 449}, 1000)
              $('.pg2 .others').animate({width: 441, height: 218}, 1000)
              $('.pg2 .words2').fadeIn(800, function () {
                secondPageShownFlag = true
                $('.btn-continue').fadeIn()
              })

            })
          })
        })
      }

      if (index === 5 && fourthPageShownFlag && !fifthPageShownFlag) {
        $('.pg5 .right-part .hand').animate({bottom: 0}, 500, function () {
          $('.pg5 .right-part .mouse-active').fadeIn(100, function () {
            $('.pg5 .sofa-lean').animate({bottom: '50%'}, 400, function () {
              $('.pg5 .order').animate({marginBottom: -10}, 200, function () {
                $('.pg5 .text').addClass('rotate360')
                fifthPageShownFlag = true
                $('.btn-continue').fadeIn()
              })
            })
          })
        })
      }

      if (index === 7 && sixthPageShownFlag && !seventhPageShownFlag) {
        $('.pg7 .stars img:eq(0)').fadeIn(70, function () {
          if ($(this).next().length) {
            $(this).next().fadeIn(70, arguments.callee)
          }else {
            $('.pg7 .good-remarks').fadeIn(70, function (){
              seventhPageShownFlag = true
              $('.btn-continue').fadeIn()
            })
          }
        })
      }

      if(index === 8){
        $(document).on('mousemove', function (e){
          var verticalRangeMin = window.innerHeight - 449
          $('.pg8 .hand').css({left: e.pageX, top: e.pageY <= verticalRangeMin ? verticalRangeMin : e.pageY + 10})
        })
      }else{
        $(document).off('mousemove')
      }
    },

    onLeave: function (curIndex, nextIndex, direction) {
      // 继续下一页 按钮消失
      $('.btn-continue').fadeOut(200)

      if (curIndex === 2 && nextIndex === 3 && secondPageShownFlag && !secondPageSofaFlag) {
        $('.pg2 .sofa-bg').show()
        $('.pg2 .sofa').show(0, function () {
          $(this).animate({width: 207, marginLeft: -103, bottom: 300}, 500, 'easeOutQuint', function () {
            $(this).css('zIndex', 999)
            var bottomOffset = -(window.innerHeight - 240)
            $(this).animate({bottom: bottomOffset, marginLeft: -237}, 500, function () {
              secondPageSofaFlag = true
              $(this).hide()
              $('.pg3 .bg .sofa').show()
              $('.pg3 .selection-wrapper .size-select.active').fadeIn(500, function () {
                $('.pg3 .selection-wrapper .confirm-btn.active').fadeIn(200, function () {
                  thirdPageShownFlag = true
                  $('.btn-continue').fadeIn()
                })
              })
            })
          })
        })
      }

      if (curIndex === 3 && nextIndex === 4 && thirdPageShownFlag && !thirdPageSofaFlag) {
        $('.pg3 .bg .sofa').hide()
        $('.pg3 .bg .sofa-lean').show(0, function () {
          var bottomOffset = -(window.innerHeight - 260)
          $(this).css('zIndex', 999)
          $(this).animate({bottom: bottomOffset, marginLeft: -30}, 800, function () {
            thirdPageSofaFlag = true
            $(this).hide()
            $('.pg4 .car-container .sofa-lean').show(0, function () {
              $(this).parent().animate({left: '100%'}, 1000, 'easeInQuart', function () {
                $('.pg4 .words-container .hidden').fadeIn(500, function () {
                  fourthPageShownFlag = true
                  $('.btn-continue').fadeIn()
                })
              })
            })
          })
        })
      }

      if (curIndex === 5 && nextIndex === 6 && fifthPageShownFlag && !sixthPageShownFlag) {
        var bottomOffset = -(window.innerHeight - 500)
        $('.pg5').css('zIndex', 1)
        $('.pg5 .sofa-lean').animate({
          bottom: bottomOffset,
          marginLeft: -60,
          marginBottom: 0,
          width: 70
        }, 1000, function () {
          $(this).hide()
          $('.pg5').css('zIndex', -1)
        })
        $('.pg6 .box').show().animate({marginLeft: -85}, 1000, function () {
          $(this).animate({width: 60, bottom: 30, marginLeft: -40}, 600, function () {
            $('.pg6 .address').fadeIn(300, function (){
              $('.pg6 .slogan').show().animate({right: 680}, 600, 'easeInOutBack')
            })
            $('.pg6').animate({backgroundPositionX: '100%'}, 2000, 'easeInOutQuint', function () {
              $('.pg6 .courier').animate({bottom: 110, width: 252}, 300, function () {
                $(this).animate({right: 480}, 500, function () {
                  $('.pg6 .door').fadeIn(300, function () {
                    $('.pg6 .woman').animate({right: 360, width: 87}, 500, function () {
                      $('.pg6 .words').fadeIn(300, function () {
                        sixthPageShownFlag = true
                        $('.btn-continue').fadeIn()
                      })
                    })
                  })
                })
              })
            })
          })
        })
      }
    }
  })

  // “开始购物”按钮点击事件
  $('.pg8 .start-btn-container').mouseenter(function (){
    $(this).children().hide().end().children('.hover').show()
  }).mouseleave(function (){
    $(this).children().show().end().children('.hover').hide()
  }).click(function (){
    alert('即将跳转购物网站')
  })

  // "再来一次"按钮点击事件
  $('.pg8 .btn-again').click(function (){
    $('.fp-tableCell *').removeAttr('style')

    $('.pg5 .text').removeClass('rotate360')

    secondPageShownFlag = false
    secondPageSofaFlag = false
    thirdPageShownFlag = false
    thirdPageSofaFlag = false
    fourthPageShownFlag = false
    fifthPageShownFlag = false
    sixthPageShownFlag = false
    seventhPageShownFlag = false

    $.fn.fullpage.moveTo(1)
  })
  // “继续”按钮点击事件
  $('.btn-continue').click(function (){
    console.log(1)
    $.fn.fullpage.moveSectionDown()
  })
})
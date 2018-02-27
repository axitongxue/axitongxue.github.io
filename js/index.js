$(function() {
  var length = 3;
  $(".bg-img li:nth-child(2)").show();
  setInterval(function () {
    var randomBgIndex = Math.round(Math.random() * length);
    $("#section1 .bg-img li").eq(randomBgIndex).addClass("show").siblings().removeClass("show");
  },5000);
});

$(function() {
  $("h4,.nav b").css("color","#fff");

  $(".fades").addClass("fadesin");
  $(" h1.fade").addClass("fadesin1");
  $(" h3.fade").addClass("fadesin2");
  $(" span.fade").addClass("fadesin3");

  var _top;
  var top0 = $("#section1").offset().top-30;
  var top1 = $("#section2").offset().top-30;
  var top2 = $("#section3").offset().top-30;
  var top3 = $("#section4").offset().top-30;
  var top4 = $("#section5").offset().top-30;
  var top5 = $("#section6").offset().top-30;
  var tops = [top0,top1,top2,top3,top4,top5];
  $(window).resize();

  $("#top").click(function () {
    $('html,body').stop().animate({
      scrollTop: 0
    }, 700);
  });
  $(".nav-ul li").bind("click", function () {
    var index = $(this).index();
    $(".nav-ul li").eq(index).addClass("active").siblings().removeClass("active");
  });
  $("#abMe").bind("click", function () {
    $(".nav-ul li:nth-child(2)").click();
  });
  $("#mypro").bind("click", function () {
    $(".nav-ul li:nth-child(3)").click();
  });
  $(".nav-ul li").bind("click", function () {
    var index = $(this).index();
    _top = $(".section").eq(index).offset().top;
    moveTo();
  });
  function moveTo(){
    $('html,body').animate({
      scrollTop: _top
    }, 500);
  }
  $(window).scroll(function () {
    var s = $(window).scrollTop();
    s > top0 ? $('#nav-bar').addClass("fixed") : $('#nav-bar').removeClass("fixed");
    if((s>top0)&&(s<top1)){
      $(".nav-ul li").eq(0).addClass("active").siblings().removeClass("active");
      $("#section1").addClass("active");
    }else if((s>top1)&&(s<top2)){
      $(".nav-ul li").eq(1).addClass("active").siblings().removeClass("active");
      $("#section2").addClass("active");
    }else if((s>top2)&&(s<top3)){
      $(".nav-ul li").eq(2).addClass("active").siblings().removeClass("active");
      $("#section3").addClass("active");
    }else if((s>top3)&&(s<top4)){
      $(".nav-ul li").eq(3).addClass("active").siblings().removeClass("active");
      $("#section4").addClass("active");
    }else if((s>top4)&&(s<top5)){
      $(".nav-ul li").eq(4).addClass("active").siblings().removeClass("active");
      $("#section5").addClass("active");
    }else if((s>top5)&&(s=top5)){
      $(".nav-ul li").eq(5).addClass("active").siblings().removeClass("active");
      $("#section6").addClass("active");
    }
  });

});

$(window).resize(function (){
  var wid = $(window).width();
  if(wid>768){
    $(".nav-xs-ul").hide();
  }
});

$(function(){
  var music = document.getElementById("bgMusic");
  music.volume = 0.2
  music.loop = true
  $("#audioBtn").click(function(){
    if(music.paused){music.play();
      $("#audioBtn").removeClass("pause").addClass("play");
    }else{music.pause();
      $("#audioBtn").removeClass("play").addClass("pause");}});
});

$(function(){
  var svgimg = document.getElementById("svg");
  var params = {width: 600, height: 400, type:Two.Types.svg}
  var two = new Two(params).appendTo(svgimg);
  //画图
  var circle = two.makeCircle(300, 200, 80);
  circle.stroke = '#f88';
  circle.fill = '#f00';
  circle.opacity = 0.6;
  circle.linewidth = 10;
  circle.rotation = 60*Math.PI/180;

  var circle1 = two.makeCircle(150, 0, 25);
  circle1.stroke = 'translation';
  circle1.fill = '#666';


  var circle2 = two.makeCircle(-40, 0, 5);
  circle2.stroke = 'translation';
  circle2.fill = '#aaf';

  //绘图 动画
  var g2 = two.makeGroup(circle2);
  g2.translation.x = 150;
  g2.translation.y = 0;

  var g1 = two.makeGroup(circle1,g2);
  g1.translation.x = 300;
  g1.translation.y = 200;

  var deg =0 ;
  two.on('update',function(){
    deg += 2;
    g2.rotation = deg*Math.PI/180;
    g1.rotation = deg*Math.PI/180;
  })
  two.play();
});


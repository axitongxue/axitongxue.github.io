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
  var canvas = document.getElementById("canvas");
  var params = {width: 600, height: 400, type:Two.Types.canvas}
  var two = new Two(params).appendTo(canvas);
  //画图
  var circle = two.makeText('Skill', 300, 200);
  circle.fill = '#fff';
  circle.opacity = 0.8;
  circle.size = 88;

  var circle1 = two.makeText('HTML/5',130, 75);
  circle1.fill = '#0ff';
  circle1.size = 18;
  var circle3 = two.makeText('CSS/3',0, 150);
  circle3.fill = '#aaf';
  circle3.size = 22;
  var circle5 = two.makeText('JS',-130, -75);
  circle5.fill = '#ffa';
  circle5.size = 22;
  var circle7 = two.makeText('JQ',130, -75);
  circle7.fill = '#faa';
  circle7.size = 22;
  var circle9 = two.makeText('VUE',-130, 75);
  circle9.fill = '#aff';
  circle9.size = 22;
  var circle11 = two.makeText('Bootstrap',0, -150);
  circle11.fill = '#faf';
  circle11.size = 18;


  var circle2 = two.makeCircle(-50, 0, 5);
  circle2.stroke = 'translation';
  circle2.fill = '#aaf';
  var circle4 = two.makeCircle(-50, 0, 5);
  circle4.stroke = 'translation';
  circle4.fill = '#ffa';
  var circle6 = two.makeCircle(-50, 0, 5);
  circle6.stroke = 'translation';
  circle6.fill = '#faa';
  var circle8 = two.makeCircle(-50, 0, 5);
  circle8.stroke = 'translation';
  circle8.fill = '#aff';
  var circle10 = two.makeCircle(-50, 0, 5);
  circle10.stroke = 'translation';
  circle10.fill = '#faf';
  var circle12 = two.makeCircle(-50, 0, 5);
  circle12.stroke = 'translation';
  circle12.fill = '#0af';

  //绘图 动画
  var g2 = two.makeGroup(circle2);
  g2.translation.x = 130;
  g2.translation.y = 75;
  var g4 = two.makeGroup(circle4);
  g4.translation.x = 0;
  g4.translation.y = 150;
  var g6 = two.makeGroup(circle6);
  g6.translation.x = -130;
  g6.translation.y = -75;
  var g8 = two.makeGroup(circle8);
  g8.translation.x = 130;
  g8.translation.y = -75;
  var g10 = two.makeGroup(circle10);
  g10.translation.x = -130;
  g10.translation.y = 75;
  var g12 = two.makeGroup(circle12);
  g12.translation.x = 0;
  g12.translation.y = -150;

  var g1 = two.makeGroup(circle1,g2);
  g1.translation.x = 300;
  g1.translation.y = 200;
  var g3 = two.makeGroup(circle3,g4);
  g3.translation.x = 300;
  g3.translation.y = 200;
  var g5 = two.makeGroup(circle5,g6);
  g5.translation.x = 300;
  g5.translation.y = 200;
  var g7 = two.makeGroup(circle7,g8);
  g7.translation.x = 300;
  g7.translation.y = 200;
  var g9 = two.makeGroup(circle9,g10);
  g9.translation.x = 300;
  g9.translation.y = 200;
  var g11 = two.makeGroup(circle11,g12);
  g11.translation.x = 300;
  g11.translation.y = 200;

  var deg =0 ;
  two.on('update',function(){
    deg += 1;
    g1.rotation = deg*Math.PI/180;
    g2.rotation = deg*Math.PI/180;
    g3.rotation = deg*Math.PI/180;
    g4.rotation = deg*Math.PI/180;
    g5.rotation = deg*Math.PI/180;
    g6.rotation = deg*Math.PI/180;
    g7.rotation = deg*Math.PI/180;
    g8.rotation = deg*Math.PI/180;
    g9.rotation = deg*Math.PI/180;
    g10.rotation = deg*Math.PI/180;
    g11.rotation = deg*Math.PI/180;
    g12.rotation = deg*Math.PI/180;
  })
  two.play();
});


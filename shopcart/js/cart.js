$(function(){
  var iterm = $(".item-list .item-single").eq(0);
  var iterm1 = $(".item-list .item-single").eq(1);
  for(var i= 0;i<6;i++){
    if(i%2 == 0){
      $(".item-list").append(iterm.clone());
    }else{
      $(".item-list").append(iterm1.clone());
    }
  }
  var WinHei = $(window).height();
  var barDis = $(".car-box").height();
  var dis = barDis -WinHei;
  var scrol = 0;
  var _dis = 0;
  $(window).bind("scroll",scro);

  function scro(){
    scrol = $(window).scrollTop();
    _dis = dis - scrol;
    fixed();
  }
  function fixed(){
    if(_dis> -60){
      $(".cart-toolbar").addClass("fixed-bottom");
      $(".to-add-container").addClass("container");
    }else if(_dis<= -60){
      $(".cart-toolbar").removeClass("fixed-bottom");
      $(".to-add-container").removeClass("container");
    }
  }

  var prisAll = parseInt(0);
  var numAll = parseInt(0);
  var check,totdiv,pridiv,numdiv,number,pris,pri,numAll;
  $(".check-item").click(function(){
    number =  $(this).parents(".item-single").find(".goods-num").text();
    pris = $(this).parents(".item-single").find(".total-money");
    pris = pris.text();

    if($(this).is(':checked')){
      numAll +=parseInt(number);

      prisAll +=  parseFloat(pris);
    }else{
      numAll -=parseInt(number);
      prisAll -=  parseFloat(pris);
    }
    $("#total-price").text("￥" + prisAll.toFixed(2));
    $("#num-all").text(numAll);
  });

  $(".cgnum").click(function(){
    number =  $(this).siblings(".goods-num").text();
    numdiv = $(this).siblings(".goods-num");
    pridiv = $(this).parents(".item-single").find(".price");
    totdiv = $(this).parents(".item-single").find(".total-money");
    check = $(this).parents(".item-single").find(".check-item");
    pri = pridiv.text();


    if($(this).text()=="-"){
      if(number>1){
        number--;
        numdiv.text(number);
        pris = pri*number;
        totdiv.text(pris.toFixed(2));

        if((check).is(':checked')){
          prisAll = prisAll - parseFloat(pri);
          numAll  = numAll -1;
          $("#total-price").text("￥" + prisAll.toFixed(2));
          $("#num-all").text(numAll);
        }
      }

    }else{
      number++;
      numdiv.text(number);
      pris = pri*number;
      totdiv.text(pris.toFixed(2));

      if((check).is(':checked')){
        prisAll +=  parseFloat(pri);
        numAll  = numAll +1;
        $("#total-price").text("￥" + prisAll.toFixed(2));
        $("#num-all").text(numAll);
      }
    }
  });

  $(".item-del").click(function(){
    check = $(this).parents(".item-single").find(".check-item");
    pris = $(this).parents(".item-single").find(".total-money");
    number =  $(this).parents(".item-single").find(".goods-num").text();
    pri = pris.text();

    if(check.is(':checked')){
      prisAll -=  parseFloat(pri);
      numAll  = numAll -number;
    }
    $("#total-price").text("￥" + prisAll.toFixed(2));
    $("#num-all").text(numAll);
    $(this).parents(".item-single").remove();
    barDis = $(".car-box").height();
    dis = barDis -WinHei ;
    scro();
  });

  $(".check-all").click(function(){
    if($(this).is(':checked')){
      $(".check-item").each(function(){
        if(!this.checked){
          $(this).click();
        }

      });
    }else{
      $(".check-item").each(function(){
        $(this).removeAttr('checked');
        prisAll =0;
        numAll =0;
        $("#total-price").text("￥" + prisAll.toFixed(2));
        $("#num-all").text(numAll);
      });
    }
  });

  $(".del-all").click(function(){
    $(".check-item").each(function(){
      check = $(this).parents(".item-single").find(".check-item");
      pris = $(this).parents(".item-single").find(".total-money");
      number =  $(this).parents(".item-single").find(".goods-num").text();
      pri = pris.text();
      if($(this).is(':checked')){
        prisAll -=  parseFloat(pri);
        numAll  = numAll -number;
        $(this).parents(".item-single").remove();
      }
      $("#total-price").text("￥" + prisAll.toFixed(2));
      $("#num-all").text(numAll);

    });
    barDis = $(".car-box").height();
    dis = barDis -WinHei;
    scro();
  });
});
<!DOCTYPE html>
<html>
<head>
  <title>Game chon hinh</title>
  <meta charset="UTF-8">
  <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<script src="js/jquery-1-11-2.min.js"></script>
<script src="js/fastclick.js"></script>

<body>
  
  <div class="wrapper">
    <div class="home page" state-id="1">
      <div class="left">
        <div class="btnStart">
          START
        </div>
      </div>
      <div class="right">
        <div class="menu">
          <div class="btnMenu" btn-id="help">
            HƯỚNG DẪN
          </div>
          <div class="btnMenu" btn-id="rate">
            XẾP HẠNG
          </div>
          <div class="btnMenu" btn-id="info">
            THÔNG TIN
          </div>
        </div>
        
      </div>
    </div>
    <div class="play page" state-id="2">
      <div class="top">
        <h1 id="title"></h1>
        <h2 id="clock">00:00</h2>
        <h2 id="score">0000</h2>
      </div>
      <div class="game">
        
        <ul>
<!--          -->
          <li>
            <div class="btn-game middleBtn" data-id="1" >Giúp ăn ngon</div>
          </li>
          <li>
            <div class="btn-game middleBtn" data-id="2">Phostpho</div>
          </li>
          <li>
            <div class="btn-game smallBtn" data-id="3">Canxi</div>
          </li>
          <li>
            <div class="btn-game middleBtn" data-id="4">Magie</div>
          </li>
<!--          -->
          <li>
            <div class="btn-game verysmallBtn" data-id="4">Magie</div>
          </li>
          <li>
              <div class="btn-game bigBtn" data-id="5">Giúp ngủ ngon</div>
            </li>
          <li>
              <div class="btn-game bigBtn" data-id="6">Giảm suy nhược</div>
            </li>
          <li>
              <div class="btn-game verysmallBtn" data-id="7"><img src="img/thuoc.png"/></div>
            </li>
<!--          -->
          <li>
              <div class="btn-game middleBtn" data-id="8">Giảm mệt mỏi</div>
            </li>
          <li>
              <div class="btn-game smallBtn" data-id="2">Phostpho</div>
            </li>
          <li>
              <div class="btn-game middleBtn" data-id="1">Giúp ăn ngon</div>
            </li>
            <li>
              <div class="btn-game middleBtn" data-id="8">Giảm mệt mỏi</div>
            </li>
<!--            -->
            <li>
              <div class="btn-game verysmallBtn" data-id="7"><img src="img/thuoc.png"/></div>
            </li>
            <li>
              <div class="btn-game bigBtn" data-id="6">Giảm suy nhược</div>
            </li>
            <li>
              <div class="btn-game bigBtn" data-id="5">Giúp ngủ ngon</div>
            </li>
            <li>
              <div class="btn-game verysmallBtn" data-id="3">Canxi</div>
            </li>
           
        </ul>
        
        
      </div>
    </div>
    <div class="save page" state-id="3">
      <div class="menu">
        <h1 id="score"></h1>
        <input placeholder="Nhập tên ..."/>
      </div>
    </div>
    <div class="finish page" state-id="3">
      <div class="menu">
        <div class="btnRePlay">CHƠI LẠI</div>
        <div class="btnExit">THOÁT</div>
      </div>
    </div>
    <div class="end page" state-id="4">
      
    </div>
    
  </div>
 
  <div>
    
  </div>
 <script>
  var listWord = [{"word":"Giúp ăn ngon","score":"10"},{"word":"Phostpho","score":"20"},{"word":"Canxi","score":"30"},{"word":"Magie","score" : "40"},{"word":"Giúp ngủ ngon","score":"50"},{"word":"Giảm suy nhược","score":"60"},{"word":"Giảm mệt mỏi","score":"70"},{"word":"<img src=\"img/thuoc.png\"/>","score":"80"}];
  var arrayBtnID = [1,2,3,4,4,5,6,7,8,2,1,8,7,6,5,3];
  var listState = { "home":"1",
                    "game":"2",
                    "finish":"3",
                    "end":"4"};
  var listTile = {"newgame":"Game Tìm Ô Giống Nhau",
                  "ready":"Chuẩn Bị",
                  "start":"Bắt Đầu",
                  "win":"Chúc Mừng Bạn Đã Chiến Thắng",
                  "lose":"Bạn Đã Thua"};
  var waitTime = 11; //10 giay cho truoc khi choi
  var playTime = 61; //1 phut choi game
  var btnSelected = null;
  var btnSelected2 = null;
  // var isSelected = false;
  var isStart = false;
  var isClockRun = false;
  var countBtn = 0;
  var mScore = 0;
  $( document ).ready(function(){
      FastClick.attach(document.body);
      //readyGame();
      changeState("home");
      console.log(countBtn);
      eventListener();
      autoScale();
    });
  function autoScale(){
    var defaultWidth = 1024;
    var defaultHeight = 768;
    var thisWidth = screen.width;
    var thisHeight =screen.height;
    console.log(thisWidth +" / "+ defaultWidth);
    console.log(thisHeight +" / "+ defaultHeight);
    var x = 1;
    var y = 1;
   
    scalePage(thisWidth / defaultWidth,thisHeight/defaultHeight);
  }
  function scalePage(x,y) {
    console.log(x+","+y);
    $('.wrapper').css({
      '-webkit-transform' : 'scale(' + x + "," + y + ')',
      '-moz-transform'    : 'scale(' + x + "," + y + ')',
      '-ms-transform'     : 'scale(' + x + "," + y + ')',
      '-o-transform'      : 'scale(' + x + "," + y + ')',
      'transform'         : 'scale(' + x + "," + y + ')'
    });

  }
  function eventListener(){
    $(".btn-game").bind('click', function(event) 
      {
          if (!$(this).hasClass("btn-touched") && isStart) {
            $(this).addClass( "btn-touched" );
            //isSelected = true;
            if (btnSelected != null) {
              btnSelected2 = $(this);
              if (btnSelected.attr("data-id") == btnSelected2.attr("data-id")) {
                setTimeout(function(){
                    mScore += parseInt(btnSelected.attr("data-score"));
                    btnSelected.css('opacity','0.0');
                    btnSelected2.css('opacity','0.0');
                    btnSelected = null;
                    btnSelected2 = null;
                    console.log(mScore);
                    $("#score").text(checkScore(mScore));
                    countBtn-=2;
                    if (countBtn == 0) {
                      stopGame();
                    }
                    
                  },200);
                
              }else{
                setTimeout(function(){
                    btnSelected.removeClass("btn-touched");
                    
                    btnSelected2.removeClass("btn-touched");
                    btnSelected = null;
                    btnSelected2 = null;
                    
                  },200);
              }
            }else{
              btnSelected = $(this);
            }
          }
          //console.log(event);
          
      });
    
    $(".btnStart").bind('click', function(event){
        changeState("play");
      });
    $(".btnMenu").bind('click', function(event){
        var btnId = $(this).attr("btn-id");
        switch(btnId){
          case "help":
            break;
          case "rate":
            break;
          case "info":
            break;
        }
      });
    $(".btnRePlay").bind('click', function(event){
        changeState("play");
      });
    $(".btnExit").bind('click', function(event){
        changeState("home");
      });
  }
  function changeState(state){
    $(".page").hide();
    switch (state) {
          case "home":
            $("."+state).show();
            break;
          case "play":
            readyGame();
            $("."+state).show();
            break;
          case "finish":
            $("."+state).show();
            break;
          case "end":
            $("."+state).show();
            break;
          case "help":
            $("."+state).show();
            break;
        }
        
  }
  
  //Count down function
  function countdown(t,callback){ // t la tong so giay, tinh ra so phut va so giay
    if (t>0) {
      if (isClockRun) {
        t-=1;
        var m;
        var s;
        if (t>60) {
          var m = t/60;
          m = checkTime(m);
          var s = t%60;
          s = checkTime(s);
        }else{
          m="00";
          s=checkTime(t);
        }
        
        var txtClock = m+":"+s;
        
        $("#clock").text(txtClock);
        setTimeout(function(){countdown(t,callback)},1000);
      }else{
        $("#clock").text("00:00");
      }
      
    }else{
      callback();
    }
    
  }
  function checkScore(s){
    if (s < 10) {
      s = "000"+s;
    }
    if (s < 100) {
      s = "00"+s;
    }
    if (s < 1000) {
      s = "0"+s;
    }
    return s;
  }
  function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
  }
  function setTitle(key){
    $("#title").text(listTile[key]);
  }
  //Game function
  function randomWord(){
   
    var listBtnGame = $(".btn-game");
    var arrayNewBtnID = shuffle(arrayBtnID);
    for(var i=0;i<listBtnGame.length;i++){
      listBtnGame.eq(i).attr("data-id",arrayBtnID[i]);
      
      var mWord = listWord[arrayBtnID[i] - 1]["word"];
      var mScore = listWord[arrayBtnID[i] - 1]["score"];
      listBtnGame.eq(i).attr("data-score",mScore);
     
      listBtnGame.eq(i).empty();
      if (mWord.indexOf("<img") > -1) {
        listBtnGame.eq(i).append(mWord);
      }else{
        listBtnGame.eq(i).text(mWord);
      }
      
    }
    
  }
  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
  function initGame(){
    mScore = 0;
    $("#score").text("0000");
    randomWord();
    $(".btn-game").css("opacity","1.0");
  }
  function readyGame(){
    initGame();
    setTitle("newgame");
    
    
    
    setTimeout(function(){
      $(".btn-game").addClass("btn-touched");
      isClockRun = true;
      waitToStart();  
    },1000);
    
  }
  function waitToStart(){
    setTitle("ready");
    countdown(waitTime,function(){
        startGame();
      });
  }
  function startGame(){
    setTitle("start");
    countBtn = $(".game").find("li").length;
    
    $(".btn-game").removeClass("btn-touched");
    isStart = true;
    countdown(playTime,function(){
        stopGame();
      });
  }
  function stopGame(){
    isStart = false;
    isClockRun = false;
    if (countBtn > 0) {
      setTitle("lose");
    }else{
      setTitle("win");
    }
    setTimeout(function(){
      resetGame();
      changeState("finish")
    },3000);
  }
  function resetGame(){
    setTitle("newgame");
    countBtn = $(".game").find("li").length;
    $(".btn-game").css("opacity","0.0");
    $(".btn-game").removeClass("btn-touched");
    //setTimeout(function(){readyGame();},5000);
  }
 </script>
</body>

</html>
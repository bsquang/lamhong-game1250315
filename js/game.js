var listWord = [{
    "word": "Giúp ăn ngon",
    "score": "50"
}, {
    "word": "Phostpho",
    "score": "50"
}, {
    "word": "Canxi",
    "score": "50"
}, {
    "word": "Magie",
    "score": "50"
}, {
    "word": "Giúp ngủ ngon",
    "score": "50"
}, {
    "word": "Giảm suy nhược",
    "score": "50"
}, {
    "word": "Giảm mệt mỏi",
    "score": "50"
}, {
    "word": "<img src=\"img/thuoc.png\"/>",
    "score": "50"
}];

var arrayBtnID = [1, 2, 3, 4, 4, 5, 6, 7, 8, 2, 1, 8, 7, 6, 5, 3];
var listState = {
    "home": "1",
    "game": "2",
    "finish": "3",
    "end": "4"
};
var listTile = {
    "newgame": "",
    "ready": "Chuẩn Bị",
    "start": "Bắt Đầu Chơi",
    "win": "Chúc Mừng Bạn Đã Chiến Thắng",
    "lose": "Bạn Đã Thua"
};
var waitTime = 10; //10 giay cho truoc khi choi
var playTime = 60; //1 phut choi game

var btnSelected = null;
var btnSelected2 = null;

// var isSelected = false;
var isStart = false;
var isClockRun = false;
var countBtn = 0;
var mScore = 0;
var wrongScore = -5;
$(document).ready(function() {
    FastClick.attach(document.body);
    changeState("splash");
    console.log(countBtn);
    eventListener();
});

function eventListener() {
    $(".btn-game").bind('click', function(event) {
        if (!$(this).hasClass("btn-touched") && isStart) {
            $(this).addClass("btn-touched");
            //isSelected = true;
            if (btnSelected != null) {
                btnSelected2 = $(this);
                if (btnSelected.attr("data-id") == btnSelected2.attr("data-id")) {
                    setTimeout(function() {
                        
                        mScore += 50;
                        btnSelected.addClass('color', '#FFF');
                        btnSelected2.addClass('color', '#FFF');
                        //btnSelected.css('color', '#FFF');
                        //btnSelected2.css('color', '#FFF');
                        btnSelected = null;
                        btnSelected2 = null;
                        
                        $("#score").text(checkScore(mScore));
                        countBtn -= 2;
                        if (countBtn == 0) {
                            stopGame();
                        }

                    }, 200);

                } else {
                  
                    mScore -= 20;                    
                    
                    $("#score").text(checkScore(mScore));
                    setTimeout(function() {
                        btnSelected.removeClass("btn-touched");

                        btnSelected2.removeClass("btn-touched");
                        btnSelected = null;
                        btnSelected2 = null;

                    }, 200);
                }
            } else {
                btnSelected = $(this);
            }
        }
        //console.log(event);

    });
    $(".splash div.btnNext").bind('click', function(event) {
        
        if(localStorage.infoEnable == '0'){
            changeState("home");
        }else if(localStorage.infoEnable == '1'){
            changeState("info01");
        }
        
        
    });
    $(".info01 div.btnNext").bind('click', function(event) {
        changeState("info02");
    });
    $(".info02 div.btnNext").bind('click', function(event) {
        changeState("home");
    });
    $(".win div.btnNext").bind('click', function(event) {
       
        //changeState("save");
        restartApp();
    });
    $(".lose div.btnNext").bind('click', function(event) {
       
        //changeState("save");
        restartApp();
    });
    $(".save div.btnNext").bind('click', function(event) {
        saveScore();
        changeState("splash");
        //restartApp();
    });
    $(".rate div.btnNext").bind('click', function(event) {
        //changeState("home");
    });
    $(".btnStart").bind('click', function(event) {
        changeState("play");
        readyGame();
    });
    $(".btnMenu").bind('click', function(event) {
        var btnId = $(this).attr("btn-id");
        switch (btnId) {
            case "help":
                break;
            case "rate":
                //var listScore = getScore();
                //
                //listScore = rateScore(listScore);
                //
                //for(var i = 0 ; i < listScore.length;i++){
                //    if (i<10) {
                //       $("#divRate").append("<p>"+listScore[i]["name"]+" - "+listScore[i]["score"]+"</p>");
                //    }else{
                //        break;
                //    }
                //    
                //}
                //changeState("rate");
                break;
            case "info":
                changeState("info01");
                break;
            
        }
    });
    $(".btnRePlay").bind('click', function(event) {
        changeState("play");
    });
    $(".btnExit").bind('click', function(event) {
        changeState("home");
    });
}

function changeState(state) {
    $(".page").hide();
    $(".page." + state).fadeIn(300);
}

//Count down function
function countdown(t, callback) { // t la tong so giay, tinh ra so phut va so giay
    if (t > 0) {
        if (isClockRun) {
            t -= 1;
            var m;
            var s;
            if (t > 60) {
                var m = t / 60;
                m = checkTime(m);
                var s = t % 60;
                s = checkTime(s);
            } else {
                m = "00";
                s = checkTime(t);
            }

            var txtClock = m + ":" + s;

            $("#clock").text(txtClock);
            setTimeout(function() {
                countdown(t, callback)
            }, 1000);
        } else {
            $("#clock").text("00:00");
        }

    } else {
        callback();
    }

}

function checkScore(s) {
    
    if (s == 0) {
        s = "0000";
    }
    else if (s < 0) {
        s = "" + s;
    }
    else if (s < 10 ) {
        s = "000" + s;
    }
    else if (s < 100 ) {
        s = "00" + s;
    }
    else if (s < 1000) {
        s = "0" + s;
    }
    
    return s;
}

function checkTime(i) {
    i = Math.floor(i);
    if (i < 10) {
        i = "0" + i
    }; // add zero in front of numbers < 10
    return i;
}

function setTitle(key) {
        $("#title").text(listTile[key]);
    }
    //Game function
function randomWord() {

    var listBtnGame = $(".btn-game");
    var arrayNewBtnID = shuffle(arrayBtnID);
    for (var i = 0; i < listBtnGame.length; i++) {
        listBtnGame.eq(i).attr("data-id", arrayBtnID[i]);

        var mWord = listWord[arrayBtnID[i] - 1]["word"];
        var mScore = listWord[arrayBtnID[i] - 1]["score"];
        listBtnGame.eq(i).attr("data-score", mScore);

        listBtnGame.eq(i).empty();
        if (mWord.indexOf("<img") > -1) {
            listBtnGame.eq(i).append(mWord);
        } else {
            listBtnGame.eq(i).text(mWord);
        }

    }

}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

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
function getScore(){
    //localStorage.setItem("GameScore","");
    var listScore = localStorage.getItem("GameScore");
    console.log(listScore);
    if (listScore) {
        return JSON.parse(listScore);
    }else{
        return [];
    }
}
function saveScore(){
    var name = $("#txtName").val();
    var score = mScore;
    if (name != "") {
        var listSaveScore = localStorage.getItem("GameScore");
        if (listSaveScore) {
            listSaveScore = JSON.parse(listSaveScore);
            listSaveScore.push({"name":name,"score":score});
        }else{
            listSaveScore = [];
            listSaveScore.push({"name":name,"score":score});
        }
        localStorage.setItem("GameScore",  JSON.stringify(listSaveScore));
        console.log( localStorage.getItem("GameScore"));
    }
    
}
function rateScore(listScore){
    if (listScore != null) {
        
        for(var i = 0; i<listScore.length-1;i++){
            for(var j = i+1;j<listScore.length ;j++){
                if (listScore[j]["score"] > listScore[i]["score"]) {
                    
                    var temp = listScore[i];
                    listScore[i] = listScore[j];
                    listScore[j] = temp;
                }
            }
        }
        
        return listScore;
    }
    return [];
}
function initGame() {
    mScore = 0;
    $("#score").text("0000");
    $("#txtName").val("");
    randomWord();
    $(".btn-game").css("opacity", "1.0");
}

function readyGame() {
    initGame();
    setTitle("newgame");



    setTimeout(function() {
        $(".btn-game").addClass("btn-touched");
        isClockRun = true;
        waitToStart();
    }, 1000);

}

function waitToStart() {
    setTitle("ready");
    countdown(waitTime, function() {
        startGame();
    });
}

function startGame() {
    setTitle("start");
    countBtn = $(".game").find(".btn-game").length;

    $(".btn-game").removeClass("btn-touched");
    isStart = true;
    countdown(playTime, function() {
        stopGame();
    });
}

function stopGame() {
    isStart = false;
    isClockRun = false;
    
    if (countBtn <= 0) {
      
      if (mScore >= 200) {
       // alert("You win!");
       winGame();
        
      }else if(mScore < 200){
        loseGame();
        
      //  alert("You lose!");
      }
      
    } else {
        loseGame();
        //alert("You lose ! Time out !");
    }
    //changeState("result");
   // restartApp();
    
    //resetGame();
    //changeState("splash");
}
function winGame(){
    setTitle("win");
    
    setTimeout(function(){
      changeState("win");
    },3000);
    
}
function loseGame(){
    setTitle("lose");
    
    setTimeout(function(){
      changeState("lose");
    },3000);
    
}
function resetGame() {
    setTitle("newgame");
    countBtn = $(".game").find(".btn-game").length;
    $(".btn-game").css("opacity", "0.0");
    $(".btn-game").removeClass("btn-touched");
    //setTimeout(function(){readyGame();},5000);
}

function restartApp() {
  window.location.href = '';
}


initSaveConfig();
function initSaveConfig(){
  if (localStorage.infoEnable == undefined) {
    
    localStorage.setItem('infoEnable','0')
    
  }
  
  if(localStorage.infoEnable == '0'){
    
  }else if(localStorage.infoEnable == '1'){
    
  }
  
}
function toggleInfo() {
    if(localStorage.infoEnable == '0'){
        localStorage.setItem('infoEnable','1');
    }else if(localStorage.infoEnable == '1'){
        localStorage.setItem('infoEnable','0');
    }
    
    restartApp();
}
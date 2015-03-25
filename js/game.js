var listWord = [{
    "word": "Giúp ăn ngon",
    "score": "10"
}, {
    "word": "Phostpho",
    "score": "20"
}, {
    "word": "Canxi",
    "score": "30"
}, {
    "word": "Magie",
    "score": "40"
}, {
    "word": "Giúp ngủ ngon",
    "score": "50"
}, {
    "word": "Giảm suy nhược",
    "score": "60"
}, {
    "word": "Giảm mệt mỏi",
    "score": "70"
}, {
    "word": "<img src=\"img/thuoc.png\"/>",
    "score": "80"
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
                        mScore += parseInt(btnSelected.attr("data-score"));
                        btnSelected.css('color', '#FFF');
                        btnSelected2.css('color', '#FFF');
                        btnSelected = null;
                        btnSelected2 = null;
                        console.log(mScore);
                        $("#score").text(checkScore(mScore));
                        countBtn -= 2;
                        if (countBtn == 0) {
                            stopGame();
                        }

                    }, 200);

                } else {
                    mScore += wrongScore;
                    mScore = mScore <= 0 ? 0 : mScore;
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
        changeState("info01");
    });
    $(".info01 div.btnNext").bind('click', function(event) {
        changeState("info02");
    });
    $(".info02 div.btnNext").bind('click', function(event) {
        changeState("home");
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
    if (s < 10) {
        s = "000" + s;
    }
    if (s < 100) {
        s = "00" + s;
    }
    if (s < 1000) {
        s = "0" + s;
    }
    if (s <= 0) {
        s = "0000";
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

function initGame() {
    mScore = 0;
    $("#score").text("0000");
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
    if (countBtn > 0) {
        setTitle("lose");
    } else {
        setTitle("win");
    }
    
    resetGame();
    changeState("splash");
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
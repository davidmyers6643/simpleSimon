// variables
userSeq = [];
simonSeq = [];
const LEVEL_NUM = [3];
var id, color, level = 0;

var boardSound = [

    "http://www.soundjay.com/button/sounds/button-4.mp3",
    "http://www.soundjay.com/button/sounds/button-09.mp3",
    "http://www.soundjay.com/button/sounds/button-10.mp3",
    "http://www.soundjay.com/button/sounds/button-7.mp3",
    // "http://www.soundjay.com/misc/sounds/fail-buzzer-01.mp3"
    "http://soundsilk.com/?media_dl=1354"

];

// start sequence

$(document).ready(function () {
    $(".startBtn").click(function () {
        level++;
       startSimone();
    })

    $(".padBtn").click(function () {
        id = $(this).attr("id");
        color = $(this).attr("class").split(" ")[1];
        userSeq.push(id);
        console.log(id + " " + color);
        addSound(id, color);

        // check user sequene
        if(!compareSequence()) {
            errorDisplay();
            userSeq = [];
        }

        // check end of sequence
        if(userSeq.length == simonSeq.length && userSeq.length < LEVEL_NUM) {
            level++;
            userSeq = [];
            startSimone();
            }

        // compare for winner
        if(userSeq.length == LEVEL_NUM) {
            $(".display").text("WIN").css("font-size","25px").css("color", "green");

        }

    })

})

// compare sequences
function compareSequence() {
    for (var i = 0; i < userSeq.length; i++) {
        if(userSeq[i] != simonSeq[i]) {
            return false;
        }
    }
    return true;
}

// error display
function errorDisplay() {
    console.log("error");
    var counter = 0;
    var myError = setInterval(function () {
        $(".display").text("XX").css("color", "red");
        playSound(4);
        counter++;
        if(counter == 3) {
            $(".display").text(level).css("color", "white");
            clearInterval(myError);
            userSeq = [];
            counter = 0;

        }
    }, 500);
}

// simon sequence
function startSimone() {
    console.log(level);
    $(".display").text(level);
    getRandomSequence();
    var i = 0;
    var myInterval = setInterval(function () {
        id = simonSeq[i];
        color = $("#" + id).attr("class").split(" ")[1];
        console.log(id + " " + color);
        addSound(id, color);
        i++;
        if(i == simonSeq.length) {
            clearInterval(myInterval);
        }
        }, 1000);

}

// create random sequence

function getRandomSequence() {
    var random = Math.floor(Math.random() * 4);
    simonSeq.push(random);

}

// add sound

function addSound(id, color) {
    $("#" + id).addClass(color + "-active");
    playSound(id);
    setTimeout(function () {
        $("#" + id).removeClass(color + "-active");
    }, 500);

}

function playSound(id) {
    var sound =new Audio(boardSound[id]);
    sound.play();
}



    $(".innerSwitch").click(function () {
       $(".innerSwitch").css("float", "left");

    })




// user sequence


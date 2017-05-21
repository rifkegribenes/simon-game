$( document ).ready(function() {

var compMoves = [],
    humMoves = [],
    state = 'off',
    comp = true,
    compMove = null,
    humMove = null,
    strict = false,
    hTry = false,
    intro = false;

    var sounds = [
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/0_green.mp3',
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/1_red.mp3',
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/2_blue.mp3',
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/3_yellow.mp3',
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/4_wrong.mp3',
        'https://raw.githubusercontent.com/rifkegribenes/simon-game/master/sounds/5_simon_intro.mp3'];

   const playSound = (val) => {
    var sound = document.createElement('audio');
    sound.setAttribute('autoplay', 'autoplay');
    sound.setAttribute('src', sounds[val]);
    sound.play();
}

const newCompMove = () => {
    intro = false;
    compMove = Math.floor(Math.random() * 4);
    compMoves.push(compMove);
    $('.counter').html(compMoves.length);
    timeout([0,compMoves.length], 1, function(i){
    lightUp(i, compMoves);
        hTry = false;
});
    switchTurn();
};

const switchTurn = () => {
comp = !comp;
}

const toggleStrict = () => {
    strict =!strict;
    if (strict) {
        $('.strict').addClass('lit-3');
    } else {
        $('.strict').removeClass('lit-3');
    }
}

$('.strict').click(function(){
    toggleStrict();
})


$('.game-btn').click(function() {
    if (!comp && humMoves.length <= compMoves.length && (humMoves[idx] == compMoves[idx])) {
        var humMove = parseInt($(this).attr('id'));
        humMoves.push(humMove);
        var idx = humMoves.length-1
        lightUpOne(humMove);
        if(strict || hTry){
        if (humMoves[idx] !== compMoves[idx]) {
            playSound(4);
            var blinkCount = 0;
function timerMethod() {
    blinkCount++;
    if(blinkCount > 3) clearInterval(timerId);
    $( ".blink" ).fadeToggle();
}
var timerId = setInterval(timerMethod, 500);
           $('.counter').html('<span class="blink msg">Game over</span>');
            setTimeout(function(){
                resetGame();
                }, 3000);
                            return;
        }
        } else {
            if (humMoves[idx] !== compMoves[idx]) {
                var blinkCount = 0;
function timerMethod() {
    blinkCount++;
    if(blinkCount > 3) clearInterval(timerId);
    $( ".blink" ).fadeToggle();
}
var timerId = setInterval(timerMethod, 500);

           $('.counter').html('<span class="blink">! ! !</span>');
                humMoves = [];
                hTry = true;
           setTimeout(function(){
        timeout([0,compMoves.length], 1, function(i){
    lightUp(i, compMoves);
 });
        }, 1500);
                return;
    }


        }

        }

    if (humMoves.length == compMoves.length) {
        if (humMoves.length < 20) {
        switchTurn();
        humMoves = [];
        setTimeout(function(){
        newCompMove();
        }, 2000);
        }
         else if (humMoves.length === 20) {
           $('.counter').html('<span class="msg">You win!</span>');
            setTimeout(function(){
                resetGame();
                }, 2000);
    }
    }
});

const resetGame = () => {
    compMoves = [];
    humMoves = [];
    state = 'off';
    comp = true;
    compMove = null;
    humMove = null;
    $('.counter').html('');
    $('.start').text('start');
    srict = false;
    hTry = false;

}

const timeout = (range, time, callback) => {
    var i = range[0];
    callback(i);
    Loop();
    function Loop(){
        setTimeout(function(){
            i++;
            if (i<range[1]){
                callback(i);
                Loop();
            }
        }, time*1000)
    }
}

const lightUp = (ix, arr) => {
    $('#'+arr[ix]).addClass('lit-'+arr[ix]);
    if(!intro) {playSound(arr[ix]); }
    setTimeout(function(){
        $('#'+arr[ix]).removeClass('lit-'+arr[ix]);
        }, 500);
}

const lightUpOne = (num) => {
    $('#'+num).addClass('lit-'+num);
    if(!intro) {
    playSound(num);
    }
    setTimeout(function(){
        $('#'+num).removeClass('lit-'+num);
        }, 500);
}

const randomLights = () => {
    intro = true;
    var rndArr = Array.from({length: 15}, () => Math.floor(Math.random() * 4));
    for(i=0; i<rndArr.length; i++) {
    timeout([0,rndArr.length], .3, function(i){
    lightUp(i, rndArr);
});
};

    }




$('.start').click(function() {
    if (state == 'off')
              {
                  playSound(5);
                  randomLights();
                  setTimeout(function(){
        newCompMove();
                      $('.start').text('reset');
                   state = 'on';
        }, 5000);

}


              else {
                  resetGame();
              }


});

});

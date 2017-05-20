  // ///////// add you lose if more than 10 sec between moves, add sounds, add speed up as counter increases, var difficulty levels?. make pads unclickable until start button and durign comp turn.

$( document ).ready(function() {

var compMoves = [],
    humMoves = [],
    state = 'off',
    comp = true,
    compMove = null,
    humMove = null,
    strict = false,
    hTry = false;

    var sounds = [
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
  new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')];

   const stopSounds = () => {

    sounds.forEach(function(sound) {
        sound.pause();
    });
}

const newCompMove = () => {
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
    if(comp) {
    console.log('computer turn');
    } else {
     console.log('your turn');
    }
}

const toggleStrict = () => {
    strict =!strict;
    if (strict) {
        console.log('should add class');
        $('.strict').addClass('lit-3');
    } else {
        $('.strict').removeClass('lit-3');
    }
}

$('.strict').click(function(){
    console.log('click strict');
    toggleStrict();
    console.log('strict= '+strict);
})


$('.game-btn').click(function() {
    stopSounds();
    if (!comp && humMoves.length <= compMoves.length) {
        var humMove = parseInt($(this).attr('id'));
        humMoves.push(humMove);
        var idx = humMoves.length-1
        lightUpOne(humMove);
        if(strict || hTry){
        if (humMoves[idx] !== compMoves[idx]) {
            console.log('humMoves = ' + humMoves);
        console.log('compMoves = ' + compMoves);
             console.log('You lose');
           $('.counter').html('<span class="msg">Game over</span>');
            setTimeout(function(){
                resetGame();
                }, 2000);
                            return;
        }
        } else {
            if (humMoves[idx] !== compMoves[idx]) {
             console.log('Try again!');

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
        console.log('humMoves = ' + humMoves);
        console.log('compMoves = ' + compMoves);
        switchTurn();
        humMoves = [];
        setTimeout(function(){
        newCompMove();
        }, 2000);
        }
         else if (humMoves.length === 20) {
            console.log('You win!');
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
    $('.toggle').prop('checked', false);
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
    stopSounds();
    $('#'+arr[ix]).addClass('lit-'+arr[ix]);
    sounds[arr[ix]].play();
    setTimeout(function(){
        $('#'+arr[ix]).removeClass('lit-'+arr[ix]);
        }, 500);
}

const lightUpOne = (num) => {
    $('#'+num).addClass('lit-'+num);
    sounds[num].play();
    setTimeout(function(){
        $('#'+num).removeClass('lit-'+num);
        sounds[num].pause();
        }, 500);
}

$('.start').click(function() {
    if (state == 'off')
              {  newCompMove();
    $('.start').text('reset');
                   state = 'on';
              } else {
                  resetGame();
              }


});

});

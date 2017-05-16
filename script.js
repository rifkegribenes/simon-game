$( document ).ready(function() {

var compMoves = [],
    humMoves = [],
    state = 'start',
    comp = true,
    compMove = null,
    humMove = null,
    strict = false,
    hTry = false;


const newCompMove = () => {
    compMove = Math.floor(Math.random() * 4);
    compMoves.push(compMove);
    $('.counter').text(compMoves.length);
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
}

$('.checkbox').click(function(){
    toggleStrict();
    console.log('strict= '+strict);
})


$('.game-btn').click(function() {
    $('.message').text('');
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
           $('.message').text('You lose');
            setTimeout(function(){
                resetGame();
                }, 2000);
                            return;
        }
        } else {
            if (humMoves[idx] !== compMoves[idx]) {
             console.log('Try again!');
           $('.message').text('Watch and try again');
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
  // ///////// add you lose if more than 10 sec between moves, add sounds, add speed up as counter increases, var difficulty levels?
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
           $('.message').text('You win!');
            setTimeout(function(){
                resetGame();
                }, 2000);
    }
    }
});

const resetGame = () => {
    compMoves = [];
    humMoves = [];
    state = 'start';
    comp = true;
    compMove = null;
    humMove = null;
    $('.counter').text('');
    $('.message').text('');
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
    $('#'+arr[ix]).addClass('lit-'+arr[ix]);
    setTimeout(function(){
        $('#'+arr[ix]).removeClass('lit-'+arr[ix]);
        }, 500);
}

const lightUpOne = (num) => {
    $('#'+num).addClass('lit-'+num);
    setTimeout(function(){
        $('#'+num).removeClass('lit-'+num);
        }, 500);
}

$('.start').click(function() {
                newCompMove();
    $('.start').text('restart');
});

});

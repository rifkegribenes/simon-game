$( document ).ready(function() {

var compMoves = [],
    humMoves = [],
    state = 'start',
    comp = true,
    compMove = null,
    humMove = null;

const newCompMove = () => {
    compMove = Math.floor(Math.random() * 4);
    compMoves.push(compMove);
    $('.counter').text(compMoves.length);
    timeout([0,compMoves.length], 1, function(i){
    lightUp(i, compMoves);
});
    switchTurn();
};

const switchTurn = () => {
comp = !comp;
    console.log('////////////////////////SWITCH//////////////');
}


$('.game-btn').click(function() {
    if (!comp && humMoves.length <= compMoves.length) {
        var humMove = parseInt($(this).attr('id'));
        humMoves.push(humMove);
        var idx = humMoves.length-1
        lightUp(idx, humMoves);
        if (humMoves[idx] !== compMoves[idx]) {
             console.log('You lose');
           $('.message').text('You lose');
            setTimeout(function(){
                resetGame();
                }, 2000);
                            return;

        }
    }
    if (humMoves.length == compMoves.length) {
        console.log('humMoves = ' + humMoves);
        console.log('compMoves = ' + compMoves);
        switchTurn();
        humMoves = [];
        setTimeout(function(){
        newCompMove();
        }, 2000);
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

$('.start').click(function() {
                newCompMove();
});

});

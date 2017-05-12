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
    console.log('compMove= ' + compMove);
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
        lightUp(humMoves.length-1, humMoves);
        console.log('humMove = ' + humMove);
        humMoves.push(humMove);
        var idx = humMoves.length-1
        if (humMoves[idx] !== compMoves[idx]) {
            console.log('you lose');
            resetGame();
            return;
        }
    }
    if (humMoves.length == compMoves.length) {
        console.log('humMoves = ' + humMoves);
        console.log('compMoves = ' + compMoves);
        switchTurn();
        humMoves = [];
        newCompMove();
    }
});

const resetGame = () => {
    compMoves = [];
    humMoves = [];
    state = 'start';
    comp = true;
    compMove = null;
    humMove = null;

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

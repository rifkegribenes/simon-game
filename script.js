$( document ).ready(function() {

var compMoves = [],
    humMoves = [],
    state = 'start',
    turn = 'c';

const newCompMove = () => {
    let nextMove = Math.floor(Math.random() * 4);
    compMoves.push(nextMove);
    console.log(compMoves);
    timeout([0,compMoves.length], 1, function(i){
    lightUp(i);
});
    switchTurn();
};

const switchTurn = () => {
    turn=='c'? turn=='h':turn=='c';
}

// function that checks state/turn, makes button divs clickable, tracks human input & pushes to array, lights up as pressed, checks if matches computer after each turn.




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

const lightUp = (i) => {
    $('#b-'+compMoves[i]).addClass('lit-'+compMoves[i]);
            console.log('lit-'+compMoves[i]);
    setTimeout(function(){
        $('#b-'+compMoves[i]).removeClass('lit-'+compMoves[i]);
            console.log('lit-'+compMoves[i] +' removed');
        }, 500);
}

$('.start').click(function() {
                newCompMove();
});

});

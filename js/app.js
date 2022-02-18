/*-------------------------------- Constants --------------------------------*/
const winningCombo = [ 
    [0, 1, 2, 3], [41, 40, 39, 38],[7, 8, 9, 10], 
    [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], 
    [21, 22, 23, 24], [20, 19, 18, 17], [28, 29, 30, 31], 
    [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], 
    [0, 7, 14, 21], [41, 34, 27, 20], [1, 8, 15, 22], 
    [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], 
    [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25], 
    [37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], 
    [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], 
    [41, 33, 25, 17], [7, 15, 23, 31], [34, 26, 18, 10], 
    [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], 
    [6, 12, 18, 24], [28, 22, 16, 10], [13, 19, 25, 31], 
    [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], 
    [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22], 
    [2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], 
    [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], 
    [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], 
    [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9],
    [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], 
    [26, 25, 24, 23], [29, 30, 31, 32], [33, 32, 31, 30], 
    [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], 
    [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], 
    [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34],
    [11, 17, 23, 29] 
    ]; 

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner
/*------------------------ Cached Element References ------------------------*/
let circles = document.querySelectorAll('.cl')
let resultMessage = document.querySelector('#turn')
let newGame = document.querySelector('#reset')

const confettiElement = document.getElementById('my-canvas');
const confettiSettings = { target: confettiElement };
const confetti = new ConfettiGenerator(confettiSettings);

const tokenSound = new Audio('./js/audio/token-sound.mp3')
const token2 = new Audio('./js/audio/token2.mp3')
const prepageSound = new Audio('./js/audio/prepage-sound.mp3')

/*----------------------------- Event Listeners -----------------------------*/

circles.forEach(function(circle, i){
    circle.addEventListener('click', function(e, i){
        handleClick(e, i)
    })
})

newGame.addEventListener('click', function(){
    init();
    confetti.clear()
})

/*-------------------------------- Functions --------------------------------*/

init();

function init(){
    
    board = [
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null,
        null, null, null, null, null, null, null
    ]
    
    turn = 1
    winner = null
    
    render()

}

function render(){

        board.forEach(function(circle, index){

        let circleColor
        let slotClass
        
        if(circle === 1){
            circleColor ='rgb(228, 114, 114)'//red
            slotClass = 'taken'
            
        }else if (circle === -1){
            circleColor = 'rgb(228, 228, 78)'//yellow
            slotClass = 'taken'
            
        }else if (circle === null){
            circleColor = 'white'
            slotClass = ''
           
        }
        
        circles[index].style.backgroundColor = circleColor
        circles[index].classList = slotClass
    })

    changeMessage()
    
}

function changeMessage(){

    if (winner === null) {
         
        if (turn === 1) {
            resultMessage.textContent = "PLAYER RED'S TURN"
            resultMessage.style.backgroundColor = 'rgb(228, 114, 114)'
            
        }
        if (turn === -1){
             resultMessage.textContent = "PLAYER YELL'S TURN"
             resultMessage.style.backgroundColor = 'rgb(228, 228, 78)'
             
            }
        }else if (winner === 'T'){
            resultMessage.textContent = "It's a Tie! Reset to Play Again"
        } else if (winner === 1){
            resultMessage.textContent = 'WINNER!!!'
            resultMessage.style.backgroundColor = 'rgb(228, 114, 114)'
            prepageSound.volume =0.5
            prepageSound.play()
        
        }else if ( winner === -1){
            resultMessage.textContent = 'WINNER!!!'
            resultMessage.style.backgroundColor = 'rgb(228, 228, 78)'
            prepageSound.volume =0.5
            prepageSound.play()
    }
}

function handleClick(e){
    let index = e.target.id;
    let ind = parseInt(index);
    let slotBelow = ind + 7
    if (index < 35 && circles[slotBelow].className === ''){
        alert("NOPE!");
        return;
    }

    if(board[index] !== null){
        return
    }
    if(winner !== null){
        return
    }

    tokenSound.volume = .5
    tokenSound.play()
    board[index] = turn
    turn = turn * -1
    getWinner()
}

function getWinner(){
    render();

    winningCombo.forEach(combo =>{
        if(board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]] === -4){
            winner = -1;
            changeMessage();
            confetti.render();
        }
        if(board[combo[0]] + board[combo[1]] + board[combo[2]] + board[combo[3]] ===4){
            winner = 1;
            changeMessage();
            confetti.render();
        }
    })
    
    let tieGame = board.some(numb => numb === null)
    if (tieGame === false) {
        winner = 'T'
        changeMessage();
    }
}



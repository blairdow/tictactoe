//javascript models
var turn = 'O'
var board = ['', '', '', '', '', '', '', '', '',]
var squares = document.querySelectorAll('.square')
var win = false
var tie = false

//draw function
function draw() {    
    //loop to map board indexes to square divs
    for(var i = 0; i < squares.length; i++) {
        squares[i].textContent = board[i]
    }
    
    document.getElementById('turn').textContent = turn
    
    if(win) {
        document.querySelector('#result').textContent = 'Player ' + win + ' wins!'
        document.querySelector('.turn').style.display = 'none'
    }
    else if(tie) {
        console.log(document.querySelector('#result'))
        document.querySelector('#result').textContent = 'It\'s a tie. You both lose.'
        document.querySelector('.turn').style.display = 'none'
    } 
}
//end draw and call below
draw()

function winCheck() {
    var winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    for(var i = 0; i < winCombos.length; i++) {
        var winCombo = winCombos[i]
        //map win combo array to board array
        var boardA = board[winCombo[0]]
        var boardB = board[winCombo[1]]
        var boardC = board[winCombo[2]]
        console.log(boardA, boardB, boardC)
        
        if(boardA !== '' && boardA === boardB && boardB === boardC) {
            win = boardA
        }

    }
    
    if (!win) {
        tie = true
        for(var i = 0; i < board.length; i++) {
            if(board[i] === '') {
                tie = false
            }
        }
    }
    
}
//end winCheck

//click event listener
for(var i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', function(e) {
        
        //loop thru squares and determine if squares x is the same as clicked square (e.target)
        var index = 0
        for(var x = 0; x < squares.length; x++) {
            if(squares[x] === e.target) {
                index = x
            }
        }
         
        //model updates  
        //exit function if square has content
        if(board[index] !== '') {
            return false
        }
        
        //else use index to update board
        board[index] = turn
        
        //check for win
        winCheck()
        
        //change turn if no win after square is clicked
        if(turn === 'X') {
            turn = 'O'
        }
        else turn = 'X'
        
        //call draw to update model on click
        draw()
    })
}
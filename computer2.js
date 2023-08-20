'use strict';
let sample_board = ['o', 'x', 'o', '', 'x', '', 'x', 'o', ''];
let ai;
let currentPlayer = 1;



const gameover = function (board) {
  return !board.includes('');
};

function minimax(board, depth, isMaximizing{
    
    
}

const bestMove = function (board) {
  let bestMove = 1
  let bestScore = -Infinity;
  for (let i = 0; i < board.length; i++) {
    bestMove = i
    if (!board[i]) {
      board[i] = ai;
      let score = minimax(board) //call ai player immediately
      //then we undo the move -  backtracking
       board[i] = ai;
    

    }
  }
  board[bestMove] = "o" //update that to o 
  currentPlayer = 1;
  
};


console.log(bestMove(sample_board));
console.log(sample_board);



//check win and also evaluate the board to return correspoding score
const check_win = function (board) {
  const winCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const win of winCombinations) {
    //destructuring assignment
    const [first, second, third] = win;
    if (board[first] == board[second] && board[first] == board[third]) {
      if (board[first] == 'x') {
        return 1; // return winner index
      } else {
        return -1;
      }
    }
  }
  return 0; //no winning combinations
};



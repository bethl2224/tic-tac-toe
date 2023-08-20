'use strict';



//implementaion of computer player function
let sample_board = ['', '', 'x', '', '', '', '', '', ''];
//console.log("sample board", sample_board)
 //issue with exporting!
//o should take center

let ai = 'o';
let human = 'x';
let currentPlayer = 1;

let scores = {
  '1':1,
  '2':-1,
  'tie':0
}
//check win and also evaluate the board to return correspoding score
const checkWinComputer = function (board) {
 

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
      if (board[first] == '1') {
        return '1'; // return winner index
      } else {
        return '2';
      }
    }
  }


  if (!board.includes(0) && board.length == 9) {
    return 'tie';
  }
  return null; //no winner yet
};

const score1 = [];
let min_comp = -Infinity;
let max_score = Infinity;

//console.log('hello');
//console.log(score1);
//do it for one move only and call recursively
//FOR ONE MOVE NOW!




function minimax(board, depth, isMaximizing){
  //if there is a winner
  let isWinner = checkWinComputer(board);
  if (isWinner){
    
    return scores[isWinner]; //terminal state of the score, since we find the winner
  }
  if (isMaximizing){
    //then the next player will be the ai!!
    let bestScore = -Infinity;
    //must traver less than 9
    //other board size will shrink!!!
    for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = ai;
      let score = minimax(board, depth+1, false );

      //backtrack again!
      board[i] = null; 
      //counter attack
      bestScore = Math.max(score, bestScore);
    }
  }
  return bestScore;
  
  }else{
    // then the next player will be human
    let bestScore = Infinity;

    for (let i = 0; i < 9; i++) {

      if (!board[i]) {
        board[i] = human;
        let score = minimax(board, depth + 1, true);
        //backtrack again!
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore; //return the best score

  }
  
}


const nextBestMoves = function (board) {
  console.log(board)
  
  let bestScore = -Infinity;
  let bestMove;
  
  console.log(board, "from next best move function")
  for (let i = 0; i < 9; i++) {
    if (!board[i]) {
      board[i] = ai;
      
      //since this is not the maximizing player
      let score = minimax(board, 0, false);

      //backtracking here - undo the steps
      board[i] = '';
      if (score > bestScore){
        bestScore = score
        bestMove = i
      }
      
      
    }
  }
  return bestMove;
};




export{nextBestMoves, checkWinComputer};
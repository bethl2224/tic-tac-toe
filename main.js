'user strict';

//issue with exporting!!!!
import {checkWinComputer, nextBestMoves} from './computer.js';
const pl1ScoreEl = $('.p1-score');
const pl2ScoreEl = $('.p2-score');
const p1El = $('.p1');
const p2El = $('.p2');
const startBtnEl = $('.start');
//contains all nine buttons
const btns = $('.btns button');


//use 1 or 2 to represent player board
let boards = ['', '', '', '', '', '', '', '', ''];
let audio = new Audio('cupid.mp3');
let isPlaying = false;
let computerMode = false;
let currentPl = 1;

// 1.) write init function to reset all score
const init = function () {
  currentPl = 1;
  boards = ['','','','','','','','',''];
  pl1ScoreEl.textContent = 0;
  pl2ScoreEl.textContent = 0;


  p1El.removeClass('active-player');
  p2El.removeClass('active-player');
  p1El.addClass('active-player');
  p1El.removeClass('winner');
  p2El.removeClass('winner');
  $('body').removeClass('winner-background');
   $('body').removeClass('tie');
  

  for (const btn of btns) {
    btn.style.backgroundImage = 'none';
  }
};

const playMusic = function () {
  
  audio.play();
};

init();

const updatePlayer = function (btn) {
  p1El.toggleClass('active-player');
  p2El.toggleClass('active-player');
  
  btn.style.backgroundImage = `url(${currentPl}.png)`;
  btn.style.backgroundSize = 'cover';
};

const checkStrategy = function (board) {
  //precondition: boards is not empty
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
    console.log(board);


    //make sure first, second and third are not empty string
    if (
      board[first] &&
      board[second] &&
      board[third] &&
      //note: use of === will not work since it is strictly compare the reference of the particular value, not the value itself
      board[first] == board[second] &&
      board[first] == board[third]
    ) {
     
      isPlaying = false;
      return true;
    }
  
  }


  //case of a tie game

    if (board.length == 9 && !board.includes('')){
      //add tie class
      $('body').addClass("tie");
      return true;
    }
    return false;
 
};

startBtnEl.on('click', function () {
  isPlaying = true;
  init();
  playMusic(); //start music

  p1El.addClass('active-player');
});

const updateWin = function (currentPl) {
  console.log(currentPl + 'win the game');
  $('.p' + currentPl).addClass('winner');
  $('body').addClass('winner-background');

  p1El.removeClass('active-player');
  p2El.removeClass('active-player');

  isPlaying = false;

  //stop audio
  audio.pause();
  audio.currentTime = 0;
  //reset computermode if necessary
  if (computerMode) computerMode = false;
};

const computerPlaying = function (board, i) {
  //computer player make the move
  let move = nextBestMoves(board);


  console.log("computer move", move, "nextmove");
  boards[move] = '2';
  console.log(btns[move], move);
  btns.eq(move).css("backgroundImage",  `url(${2}.png)`);
  btns.eq(move).css("backgroundSize",  'cover');
};


  btns.on('click', function () {
    const i = $(btns).index(this);
    if (isPlaying) {
      if (!boards[i]) {
        if (!computerMode) {
          //board[index] xcan only be changed once,
          // if board[index] is a truthy value, then it cannot be changed, so player will not get update
          //update board
          boards[i] = currentPl;
          console.log(boards);
          updatePlayer(this);

      if (checkStrategy(boards)) {
          updateWin(currentPl);
      } else {
        //switch player, and keep playing the game
        currentPl = currentPl === 1 ? 2 : 1;
        console.log('switching player', currentPl);
      }


      } else if(computerMode){
        //in computer mode
         console.log(boards);
          console.log("computer mode")
           // human player
           
          boards[i] = '1';
          $(this).css("backgroundImage" ,  `url(${1}.png`);
          $(this).css('backgroundSize', 'cover');
          computerPlaying(boards, i);
          console.log(boards);



          if (checkStrategy(boards)) {
            let result = checkWinComputer(boards)
            console.log(result)
            if (result == "1"){
                 updateWin(1);
                

            }else if(result == "2"){
                updateWin(2);
            }else if (result =="tie"){
              $('body').addClass("tie")


            }

          }
        }
      }

    }
  });


// if board is full -> kill song

//computer player mode
$('.computerPlayer').on('click', function () {
    $('body').addClass('winner-background');
    computerMode = true;
  });

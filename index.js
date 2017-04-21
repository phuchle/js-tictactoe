// player can make a mark on the board corresponding to their symbol
// game ends when there are three of same mark in a row or all squares filled
// check board after every move is made

var game;
var player;
var ai;

// assigns x and o based on what human chooses to be
var chooseSymbol = () => {
  var symbolContainer = document.getElementById('symbol-container');
  var x = document.getElementById('X');
  var o = document.getElementById('O');
  var symbols = [x,o];

  symbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
      symbolContainer.style.opacity = 0;
      player.symbol = symbol.innerText;
      player.symbol === 'X' ? ai.symbol = 'O' : ai.symbol = 'X';
      showBoard();
      showInstructions();
    });
  });
}

var showBoard = () => {
  var board = document.getElementById('board');
  board.style.opacity = 1;
}

var hideBoard = () => {
  var board = document.getElementById('board');
  board.style.opacity = 0;
}

var showInstructions = () => {
  var instructions = document.getElementById('instructions');
  instructions.style.opacity = 1;
}

var hideInstructions = () => {
  var instructions = document.getElementById('instructions');
  instructions.style.opacity = 0;
}

var showWinner = () => {
  var winner = document.createElement('h2');
  var instructions = document.getElementById('instructions');
  var parentDiv = document.getElementById('parent-container');

  if (game.activePlayer === player) {
    winner.innerText = 'You win.';
  } else {
    winner.innerText = "I'm unbeatable.";
  }

  parentDiv.insertBefore(winner, instructions);
}

document.addEventListener('DOMContentLoaded', () => {
  player = new Player();
  game = new TicTacToeBoard(player); // human player goes first
  ai = new AI();
  game.makeBoard();
  game.populateVisibleBoard();
  game.addListeners();
  chooseSymbol();
});

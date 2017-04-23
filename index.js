// player can make a mark on the board corresponding to their symbol
// game ends when there are three of same mark in a row or all squares filled
// check board after every move is made

var game;
var player;
var ai;

// assigns x and o based on what human chooses to be
var chooseSymbol = () => {
  var x = document.getElementById('X');
  var o = document.getElementById('O');
  var symbols = [x,o];

  symbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
      hideSymbolContainer();
      player.symbol = symbol.innerText;
      player.symbol === 'X' ? ai.symbol = 'O' : ai.symbol = 'X';
      showBoard();
      showInstructions();
    });
  });
}

var showSymbolContainer = () => {
  var symbolContainer = document.getElementById('symbol-container');
  symbolContainer.style.opacity = 1;
}

var hideSymbolContainer = () => {
  var symbolContainer = document.getElementById('symbol-container');
  symbolContainer.style.opacity = 0;
}

var showBoard = () => {
  var board = document.getElementById('board');
  board.style.opacity = 1;
}

var hideBoard = () => {
  var board = document.getElementById('board');
  board.style.opacity = 0;
}

var clearBoard = () => {
  var board = document.getElementById('board');
  board.innerHTML = '';
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
  winner.id = 'winner';
  var instructionsContainer = document.getElementById('instructions-container');

  if (game.activePlayer === player) {
    winner.innerText = 'You win.';
  } else {
    winner.innerText = "I'm unbeatable.";
  }

  instructionsContainer.appendChild(winner, instructions);
}

var hideWinner = () => {
  var winner = document.getElementById('winner');
  winner.outerHTML = '';
  delete winner;
}

var restartGame = () => {
  hideRestartOption();
  hideWinner();
  clearBoard();
  showSymbolContainer();
  beginGame();
}

var showRestartOption = () => {
  var instructionsContainer = document.getElementById('instructions-container');
  var restartOption = document.createElement('h2');
  restartOption.innerText = 'Again?';
  restartOption.id = 'restart-option';
  restartOption.addEventListener('click', () => {
    restartGame();
  });

  instructionsContainer.appendChild(restartOption);
}

var hideRestartOption = () => {
  var restartOption = document.getElementById('restart-option');
  restartOption.outerHTML = '';
  delete restartOption;
}

var beginGame = () => {
  player = new Player();
  game = new TicTacToeBoard(player); // human player goes first
  ai = new AI();
  game.makeBoard();
  game.populateVisibleBoard();
  game.addListeners();
  chooseSymbol();
}

document.addEventListener('DOMContentLoaded', () => {
  beginGame();
});

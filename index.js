// player can make a mark on the board corresponding to their symbol
// game ends when there are three of same mark in a row or all squares filled
// check board after every move is made

let game;
let player;
let ai;

// assigns x and o based on what human chooses to be
function chooseSymbol() {
  let x = document.getElementById('X');
  let o = document.getElementById('O');
  let symbols = [x,o];

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

function showSymbolContainer() {
  let symbolContainer = document.getElementById('symbol-container');
  symbolContainer.style.opacity = 1;
}

function hideSymbolContainer() {
  let symbolContainer = document.getElementById('symbol-container');
  symbolContainer.style.opacity = 0;
}

function showBoard() {
  let board = document.getElementById('board');
  board.style.opacity = 1;
}

function hideBoard() {
  let board = document.getElementById('board');
  board.style.opacity = 0;
}

function clearBoard() {
  let board = document.getElementById('board');
  board.innerHTML = '';
}

function showInstructions() {
  let instructions = document.getElementById('instructions');
  instructions.style.opacity = 1;
}

function hideInstructions() {
  let instructions = document.getElementById('instructions');
  instructions.style.opacity = 0;
}

function showWinner() {
  let winner = document.createElement('h2');
  winner.id = 'winner';
  let instructionsContainer = document.getElementById('instructions-container');

  if (game.activePlayer === player) {
    winner.innerText = 'You win.';
  } else {
    winner.innerText = "I'm unbeatable.";
  }

  instructionsContainer.appendChild(winner, instructions);
}

function hideWinner() {
  let winner = document.getElementById('winner');
  winner.outerHTML = '';
  delete winner;
}

function restartGame() {
  hideRestartOption();
  hideWinner();
  clearBoard();
  showSymbolContainer();
  beginGame();
}

function showRestartOption() {
  let instructionsContainer = document.getElementById('instructions-container');
  let restartOption = document.createElement('h2');
  restartOption.innerText = 'Again?';
  restartOption.id = 'restart-option';
  restartOption.addEventListener('click', () => {
    restartGame();
  });

  instructionsContainer.appendChild(restartOption);
}

function hideRestartOption() {
  let restartOption = document.getElementById('restart-option');
  restartOption.outerHTML = '';
  delete restartOption;
}

function beginGame() {
  player = new Player();
  game = new TicTacToeBoard(player); // human player goes first
  ai = new AI();
  game.makeBoard();
  game.populateVisibleBoard();
  game.addListeners();
  chooseSymbol();
}

document.addEventListener('DOMContentLoaded', beginGame);

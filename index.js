// player can make a mark on the board corresponding to their symbol
// game ends when there are three of same mark in a row or all squares filled

class Player {
  constructor(symbol) {
    this.symbol = symbol;
  }

  move(square) {
    square.innerText = this.symbol;
  }
}

class Board {
  constructor() {
    this.board = []; // 1D array of squares div

    // Add each square to this.board
    Array.prototype.forEach
      .call(document.getElementsByClassName('squares'), item => {
        this.board.push(item);
      }
    );

    // 2D array of rows
    this.rows = [
      this.board.slice(0, 3),
      this.board.slice(3, 6),
      this.board.slice(6)
    ]

    // 2D array of the columns
    this.columns = [
      this.board.filter(square => { return square.className.slice(-1) === '0' }),
      this.board.filter(square => { return square.className.slice(-1) === '1' }),
      this.board.filter(square => { return square.className.slice(-1) === '2' })
    ]
    this.diagonals = [
      [this.board[0],this.board[4],this.board[8]],
      [this.board[2],this.board[4],this.board[6]]
    ]
    console.log(this.diagonals);
  }

}

var chooseSymbol = () => {
  var symbolContainer = document.getElementById('symbol-container');
  var x = document.getElementById('X');
  var o = document.getElementById('O');
  var player;
  var symbols = [x,o];

  symbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
      player = new Player(symbol.innerText);
      symbolContainer.style.opacity = 0;
      showBoard();
      showInstructions();
    });
  });
}

var showBoard = () => {
  var board = document.getElementById('board');
  board.style.opacity = 1;
}

var showInstructions = () => {
  var instructions = document.getElementById('instructions');
  instructions.style.opacity = 1;
}

document.addEventListener('DOMContentLoaded', () => {
  chooseSymbol();
  var game = new Board();
});

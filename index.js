// player can make a mark on the board corresponding to their symbol
// game ends when there are three of same mark in a row or all squares filled
// check board after every move is made

var game;
var player;
var ai;

class Player {
  constructor() {
    this.depth = 0;
  }
  passTurn() {
    if (game.activePlayer === player) {
      game.activePlayer = ai;
      ai.move();
    } else {
      game.activePlayer = player;
    }
  }

  move(square) {
    square.innerHTML = this.symbol;
    this.passTurn();
  }
}

class AI extends Player {
  minimax(game, depth) {
    if (game.over()) {
      return this.score(game, depth);
    } else {
      depth++;
      var moves = [];
      var scores = [];

      game.getPossibleMoves().forEach(move => {
        // create a new possible game state for the move
        // run minimax on this new game state
        // eventually returns a score, push score to scores
        // push move to moves
        var possibleGame = game.getNewState(move);
        scores.push(this.minimax(possibleGame, depth));
        moves.push(move);
      });

      // if it's player's turn
      // find index of max score
      // return move at same index as max score
      //if it's the AI's turn
      // find indeex of min score
      // return move at index of min score
      if (game.activePlayer === ai) {
        var maxIndex = scores.indexOf(Math.max(scores));
        return moves[maxIndex];
      } else {
        var minIndex = scores.indexOf(Math.min(scores));
        return moves[minIndex];
      }
    }
  }

  // receives an instance of Board class
  score(game, depth) {
    if (game.isWinner(ai)) {
      return 10 - depth;
    } else if (game.isWinner(player)) {
      return depth - 10;
    }
    else {
      return 0;
    }
  }

  move() {
    var idealMove = this.minimax(game, this.depth);
    this.depth = 0;
    idealMove.innerHTML = this.symbol;
    this.passTurn();
  }
}

class TicTacToeBoard {
  constructor() {
    this.board = []; // 1D array of squares div
    this.activePlayer = player;

    // Add each square to this.board to gain access to Array methods
    Array.prototype.forEach
      .call(document.getElementsByClassName('squares'), item => {
        this.board.push(item);
      }
    );

    // 2D array of board rows
    this.rows = [
      this.board.slice(0, 3),
      this.board.slice(3, 6),
      this.board.slice(6)
    ]

    // 2D array of the board columns
    this.columns = [
      this.board.filter(square => { return square.className.slice(-1) === '0' }),
      this.board.filter(square => { return square.className.slice(-1) === '1' }),
      this.board.filter(square => { return square.className.slice(-1) === '2' })
    ]

    // 2D array of the board diagonals
    this.diagonals = [
      [this.board[0],this.board[4],this.board[8]],
      [this.board[2],this.board[4],this.board[6]]
    ]

    this.winConditions = [this.rows, this.columns, this.diagonals];
  }

  addListeners() {
    this.board.forEach(square => {
      square.addEventListener('click', () => {
        player.move(square);
      });
    });
  }

  // checks if game has ended (win, lose, or tie)
  over() {
    var gameOver = false;

    this.winConditions.forEach(condition => {
      if (this.winConditionPresent(condition)) gameOver = true;
    });

    var boardFull = this.board.every(square => {
      return square.innerText !== '';
    });

    if (boardFull) gameOver = true;

    return gameOver;
  }

  // helper that checks an array of  returns true if there is a win condition
  winConditionPresent(condition) {
    var isWin = false;
    condition.forEach(arr => {
      if (this.allSameElements(arr)) isWin = true;
    });
    return isWin;
  }

  // helper to check that all elements in an array have same value
  allSameElements(array) {
    var firstElement = array[0].innerText;
    if (firstElement === '') return false;

    return array.every(element => {
      return element.innerText === firstElement;
    });
  }

  // checks if the passed player is the winner
  isWinner(player) {
    var winningMark;
    if (this.over()) {
      this.winConditions.forEach(condition => {
        condition.forEach(arr => {
          if (this.allSameElements(arr)) winningMark = arr[0].innerText;
        });
      });
    }
    return winningMark === player.symbol;
  }

  // reurn array of divs
  getPossibleMoves() {
    var possibleMoves = [];

    this.board.forEach(square => {
      if (square.innerText === '') {
        possibleMoves.push(square);
      }
    });

    return possibleMoves;
  }

  getNewState(square) {
    var newBoard = [...this.board];
    var newMove = newBoard[newBoard.indexOf(square)];
    square.innerHTML = this.symbol;
    this.activePlayer.passTurn();
    return newBoard;
  }

  simulatePassTurn() {
    if (this.activePlayer === player) {
      this.activePlayer = ai;
      ai.move();
    } else {
      this.activePlayer = player;
    }
  }
}

var chooseSymbol = () => {
  var symbolContainer = document.getElementById('symbol-container');
  var x = document.getElementById('X');
  var o = document.getElementById('O');
  var symbols = [x,o];

  symbols.forEach(symbol => {
    symbol.addEventListener('click', () => {
      symbolContainer.style.opacity = 0;
      player.symbol = symbol.innerText;
      ai = new AI();
      player.symbol === 'X' ? ai.symbol = 'O' : ai.symbol = 'X';
      game.addListeners();
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
  player = new Player();
  game = new TicTacToeBoard();
  chooseSymbol();
});

class TicTacToeBoard {
  constructor(activePlayer = player) {
    this.modelBoard = {}; // coords as keys, strings as values
    this.visibleBoard = []; // array of divs
    this.activePlayer = activePlayer;
  }

  makeBoard() {
    let board = document.getElementById('board');

    for (let i = 0; i < 3; i++) {
      let row = document.createElement('div');
      row.className = 'rows';

      for (let j = 0; j < 3; j++) {
        let square = document.createElement('div');
        square.className = 'squares';
        square.id = (i.toString()) +  (j.toString());
        row.appendChild(square);
      }

      board.appendChild(row);
    }
  }

  // Add each square's innerText to this.modelBoard to gain access to Array methods
  populateVisibleBoard() {
    Array.prototype.forEach
      .call(document.getElementsByClassName('squares'), item => {
        this.modelBoard[item.id] = item.innerText;
        this.visibleBoard.push(item);
      }
    );
  }

  addListeners() {
    // create a new function bound to TicTacToeBoard as 'this'
    let bindCopy = this.copyToModelBoard.bind(this);

    this.visibleBoard.forEach(square => {
      square.addEventListener('click', () => {
        if (game.modelBoard[square.id]) {
          alert('You have already moved here');
        } else {
          player.move(square);
          bindCopy(square);

          ai.move();
          bindCopy(ai.showIdealMove());
          game.checkForWinner();
          ai.passTurn();
        }
      });
    });
  }

  // helper for addListeners
  copyToModelBoard(square) {
    let targetID = square.id;

    this.modelBoard[targetID] = square.innerText;
  }

  checkForWinner() {
    if (game.over()) {
      hideBoard();
      hideInstructions();
      showWinner();
      showRestartOption();
    }
  }

  // checks if game has ended (win, lose, or tie)
  over() {
    let gameOver = false;

    // winConditions is a 3D array
    let winConditions = this.getWinConditions();

    winConditions.forEach(condition => {
      if (this.winConditionPresent(condition)) gameOver = true;
    });

    let boardFull = Object.values(this.modelBoard).every(square => {
      return square !== '';
    });

    if (boardFull) gameOver = true;

    return gameOver;
  }

  // helper that checks an array of  returns true if there is a win condition
  winConditionPresent(condition) {
    let isWin = false;
    condition.forEach(arr => {
      if (this.allSameElements(arr)) isWin = true;
    });
    return isWin;
  }

  allSameElements(array) {
    let firstElement = array[0];
    if (firstElement === '') return false;

    return array.every(element => {
      return element === firstElement;
    });
  }

  // checks if the passed player is the winner
  isWinner(currentPlayer) {
    let winningMark;
    let winConditions = this.getWinConditions();

    if (this.over()) {
      winConditions.forEach(condition => {
        condition.forEach(arr => {
          if (this.allSameElements(arr)) winningMark = arr[0];
        });
      });
    }

    return winningMark === currentPlayer.symbol;
  }

  // returns a 3D array -- I'm a madman
  getWinConditions() {
    // 2D array of board rows
    let rows = [
      [this.modelBoard['00'], this.modelBoard['01'], this.modelBoard['02']],
      [this.modelBoard['10'], this.modelBoard['11'], this.modelBoard['12']],
      [this.modelBoard['20'], this.modelBoard['21'], this.modelBoard['22']]
    ]

    // 2D array of the board columns
    let columns = [
      [rows[0][0], rows[1][0], rows[2][0]],
      [rows[0][1], rows[1][1], rows[2][1]],
      [rows[0][2], rows[1][2], rows[2][2]]
    ]

    // 2D array of the board diagonals
    let diagonals = [
      [this.modelBoard['00'],this.modelBoard['11'],this.modelBoard['22']],
      [this.modelBoard['02'],this.modelBoard['11'],this.modelBoard['20']]
    ]

    return [rows, columns, diagonals];
  }

  // returns an array of strings
  // the strings are the ID values of divs on the board
  getPossibleMoves() {
    let possibleMoves = [];

    Object.keys(this.modelBoard).forEach(square => {
      if (this.modelBoard[square] === '') {
        possibleMoves.push(square);
      }
    });

    return possibleMoves;
  }

  // return a new instance of TicTacToeBoard with the new move made on modelBoard
  getNewState(squareID) {
    let newState = new TicTacToeBoard(this.activePlayer);
    let newBoard = this.cloneBoard();

    //make the move in the new square
    newBoard[squareID] = this.activePlayer.symbol;
    newState.modelBoard = newBoard;
    newState.simulatePassTurn();

    return newState;
  }

  // returns an object
  cloneBoard() {
    let copy = {};

    for (let prop in this.modelBoard) {
      copy[prop] = this.modelBoard[prop];
    }

    return copy;
  }

  // helper function so ai.move() isn't called many times
  // used in creating new game states
  simulatePassTurn() {
    if (this.activePlayer === player) {
      this.activePlayer = ai;
    } else {
      this.activePlayer = player;
    }
  }
}

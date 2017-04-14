class TicTacToeBoard {
  constructor(activePlayer = player) {
    this.board = []; // 1D array of squares div
    this.activePlayer = activePlayer;

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
    var newState = new TicTacToeBoard();
    var newBoard = [...this.board];
    var newMoveIndex = newBoard[newBoard.indexOf(square)];

    newBoard[newMoveIndex].innerText = this.activePlayer.symbol;
    newState.board = newBoard;

    newState.board[newMoveIndex].innerHTML = this.activePlayer.symbol;
    newState.simulatePassTurn();

    return newBoard;
  }

  // helper function so ai.move() isn't called many times
  simulatePassTurn() {
    if (this.activePlayer === player) {
      this.activePlayer = ai;
    } else {
      this.activePlayer = player;
    }
  }
}

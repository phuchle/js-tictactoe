class Player {
  constructor() {
    this.depth = 0;
    this.moves = [];
    this.scores = [];
  }
  move(square) {
    square.innerHTML = this.symbol;
    this.passTurn();
  }
  passTurn() {
    if (game.activePlayer === player) {
      game.activePlayer = ai;
    } else {
      game.activePlayer = player;
    }
  }

}

class AI extends Player {
  move() {
    // debugger;
    var idealMoveDivID = this.minimax(game, this.depth);
    var targetSquare = document.getElementById(idealMoveDivID);

    targetSquare.innerHTML = this.symbol;

    // reset variables used by minimax
    this.depth = 0;
    this.scores = [];
    this.moves = [];

    this.passTurn();
  }

  // creates a set of possible moves, analyzes for the best move
  // returns the div#id of the ideal move
  minimax(testGame, depth) {
    // debugger;
    var idealMoveID;

    if (testGame.over()) {
      return this.score(testGame, depth);
    } else {
      depth++;

      // possibleMoves is an object with div ID: innerText as key: value
      var possibleMoves = testGame.getPossibleMoves();
      // debugger;
      Object.keys(possibleMoves).forEach(coord => {
        // debugger;
        // create a new possible game state for the move
        // run minimax on this new game state
        // eventually returns a score, push score to scores
        // push move to moves
        var possibleGame = testGame.getNewState(coord, possibleMoves[coord]);

        this.scores.push(this.minimax(possibleGame, depth));
        this.moves.push(coord);
      });

      //if it's the AI's turn
      // find index of max score
      // return move at same index as max score

      // if it's player's turn
      // find indeex of min score
      // return move at index of min score
      if (testGame.activePlayer === ai) {
        var maxIndex = this.scores.indexOf(Math.max(this.scores));
        // debugger;
        idealMoveID = this.moves[maxIndex];
      } else {
        var minIndex = this.scores.indexOf(Math.min(this.scores));
        // debugger;
        idealMoveID = this.moves[minIndex];
      }
    }
    debugger;
    return idealMoveID;
  }

  // receives an instance of Board class
  score(testGame, depth) {
    if (testGame.isWinner(ai)) {
      return 10 - depth;
    } else if (testGame.isWinner(player)) {
      return depth - 10;
    }
    else {
      return 0;
    }
  }

}

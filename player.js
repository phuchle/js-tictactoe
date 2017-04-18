class Player {
  constructor() {
    this.idealMove;
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
    this.minimax(game, this.depth);
    debugger;
    var targetSquare = document.getElementById(this.idealMove);

    targetSquare.innerHTML = this.symbol;
  }

  // creates a set of possible moves, analyzes for the best move
  // returns the div#id of the ideal move
  minimax(testGame, depth = 0) {
    // debugger;
    var scores = [];
    var moves = [];

    if (testGame.over()) {
      // debugger;
      return this.score(testGame, depth);
    } else {
      depth++;

      // possibleMoves is an array with div ID as value
      var possibleMoves = testGame.getPossibleMoves();
      // debugger;
      possibleMoves.forEach(coord => {
        // debugger;
        // create a new possible game state for the move
        // run minimax on this new game state
        // eventually returns a score, push score to scores
        // push move to moves
        var possibleGame = testGame.getNewState(coord);

        scores.push(this.minimax(possibleGame, depth));
        moves.push(coord);
      });

      //if it's the AI's turn
      // find index of max score
      // return move at same index as max score

      // if it's player's turn
      // find indeex of min score
      // return move at index of min score
      if (testGame.activePlayer === ai) {
        var maxIndex = scores.indexOf(Math.max(...scores));
        debugger;
        this.idealMove = moves[maxIndex];
        return scores[maxIndex];
      } else {
        var minIndex = scores.indexOf(Math.min(...scores));
        debugger;
        this.idealMove = moves[minIndex];
        return scores[minIndex];
      }
    }
  }

  // receives an instance of Board class
  score(testGame, depth) {
    var score;
    if (testGame.isWinner(ai)) {
      score = 10 - depth;
    } else if (testGame.isWinner(player)) {
      score = depth - 10;
    }
    else {
      score = 0;
    }
    // debugger;
    return score;
  }

  // returns the div where the AI just moved
  showIdealMove() {
    return document.getElementById(this.idealMove);
  }
}

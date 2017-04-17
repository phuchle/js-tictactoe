class Player {
  constructor() {
    this.depth = 0;
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
    var idealMoveDivID = this.minimax(game, this.depth);
    var targetSquare = document.getElementById(idealMoveDivID);
    this.depth = 0;
    targetSquare.innerHTML = this.symbol;
    this.passTurn();
  }

  // creates a set of possible moves, analyzes for the best move
  // returns the div#id of the ideal move
  minimax(testGame, depth) {
    if (testGame.over()) {
      // debugger;
      return this.score(testGame, depth);
    } else {
      depth++;
      var moves = [];
      var scores = [];

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
        var maxIndex = scores.indexOf(Math.max(scores));
        return moves[maxIndex];
        debugger;
      } else {
        var minIndex = scores.indexOf(Math.min(scores));
        return moves[minIndex];
        debugger;
      }
    }
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

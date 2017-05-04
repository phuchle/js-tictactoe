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
    let targetSquare = document.getElementById(this.idealMove);
    targetSquare.innerHTML = this.symbol;
  }

  // creates a set of possible moves, analyzes for the best move
  // returns the div#id of the ideal move
  minimax(testGame, depth = 0) {
    if (testGame.over()) {
      return this.score(testGame, depth);
    } else {
      depth++;
      let scores = [];
      let moves = [];

      // possibleMoves is an array with div ID as value
      let possibleMoves = testGame.getPossibleMoves();

      possibleMoves.forEach(coord => {
        // create a new possible game state for the move
        // run minimax on this new game state
        // eventually returns a score, push score to scores
        // push move to moves
        let possibleGame = testGame.getNewState(coord);

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
        let maxIndex = scores.indexOf(Math.max(...scores));
        this.idealMove = moves[maxIndex];

        return scores[maxIndex];
      } else {
        let minIndex = scores.indexOf(Math.min(...scores));

        this.idealMove = moves[minIndex];
        return scores[minIndex];
      }
    }
  }

  // receives an instance of Board class
  score(testGame, depth) {
    let score;

    if (testGame.isWinner(ai)) {
      score = 10 - depth;
    } else if (testGame.isWinner(player)) {
      score = depth - 10;
    }
    else {
      score = 0;
    }

    return score;
  }

  // returns the div where the AI just moved
  showIdealMove() {
    return document.getElementById(this.idealMove);
  }
}

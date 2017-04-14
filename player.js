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
      ai.move();
    } else {
      game.activePlayer = player;
    }
  }

}

class AI extends Player {
  move() {
    var idealMove = this.minimax(game, this.depth);
    this.depth = 0;
    idealMove.innerHTML = this.symbol;
    this.passTurn();
  }

  minimax(game, depth) {
    debugger;
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

}

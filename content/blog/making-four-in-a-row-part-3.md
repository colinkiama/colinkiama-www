+++
title = "Making Four-In-A-Row - Part 3: Making Moves"
date = 2023-04-19T23:02:00Z
updated = 2023-04-22T18:20:00Z
description = "Allow players to make moves in your Four-In-A-Row game!"
+++

## Intro

In the [previous blog](@/blog/making-four-in-a-row-part-2.md) post, you set up your `FourInARowGame` class's fields.

Now you're ready to start implementing player moves and updating the state of the game accordingly.

## Creating the method

You'll start off by creating a new method in the `FourInARowGame` class called `playMove()`:

```js
export default class FourInARowGame {
  // ..

  static createBoard() {
    // ..
  }

  playMove(columnIndex) {
    return {
      board: this.currentBoard,
      winner: Constants.PlayerColor.NONE,
      status: {
        value: Constants.MoveStatus.SUCCESS,
      },
      winLine: [],
    };
  }
}
```

Note: You're just returning mock data for now. You'll properly implement this method later on.

The `playMove()` method actually takes in a `columnIndex` argument. From this input, a move will be attempted and the result of the move will be evaluated and returned. The code example above shows a `MoveResult` object being returned in the `playMove()` method. A `MoveResult` can contain:

- The current state of the board after a move has been played
- The winner
- The status of the move
- The win line - an array of positions of 4 consecutive tokens were located, if found.

## Interacting with your state machine

### Exposing your state machine object

Now, to try out your code, you'll interact with your Four-In-A-Row state machine in your browser.

First, you'll need to expose the object so that the browser's console can access it. One way you can do this is by adding an instance of the `FourInARowGame` class to the `window` object. Let's do that right now. Replace the contents of `src/index.js` with the following:

```js
import FourInARowGame from "./FourInARowGame.js";

window.fourInARowGame = new FourInARowGame();
```

Now, ensure that the a HTTP server is running in the root of project and navigate to the server's address in your web browser.

Open up the console your browser's developer tools (The keyboard shortcut to open in it Google Chrome is `CTRL` + `Shift` + `J`) in your web browser then enter in: `window.fourInARowGame`. You should see an output of the `FourInARowGame` instance object. In Google Chrome it looks like this:

```js
FourInARowGame {startingColor: 'yellow', currentTurn: 'yellow', status: 'start', board: Array(6)}
```

There is also the options to expand the object so you can view more details about the object.

If you don't see some sort of representation of an `FourInARow` instance object then please go over your code and check that you've followed the instructions correctly!

### Play a (fake) move

Now, call the `playMove` method from the `FourInARow` instance, in the browser console window.

First, store the state machine in an easier to reference variable called `game`:

```js
let game = window.fourInARowGame;
```

Then, call the `playMove` method with the `columnIndex` parameter set to `0`:

```js
game.playMove(0);
```

Your browser's console window should output something resembling the `MoveResult` object you discussed earlier:

```js
{board: Array(6), winner: 'none', status: {…}, winLine: Array(0)}
```

When expanded, you get more details:

```js
{board: Array(6), winner: 'none', status: {…}, winLine: Array(0)}
    board: (6) [Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7)]
    status: {value: 'success'}
    winLine: []
    winner: "none"
    [[Prototype]]: Object
```

Now that you know the type of result that you're expecting after calling `playMove()`, let's properly implement the method so that it returns real data based on the state of the board.

## Implementing the method (for real this time!)

Firstly, you'll update the `playMove()` method in your `FourInARowGame` class so that it checks the current status of the game before allowing the player to make a move.

It wouldn't make sense for a player to be able to perform a move when the game has already ended in a win or a draw.

You'll also update the current status of the game from `GameStatus.START` to being `GameStatus.IN_PROGRESS`.

```js
playMove(columnIndex) {
    switch (this.status) {
        case Constants.GameStatus.START:
            this.status = GameStatus.IN_PROGRESS;
            break;
        case Constants.GameStatus.DRAW:
        case Constants.GameStatus.WIN:
            // The game is over at this point so
            // re-evaluate the latest board, returning the same game status
            // and board details.

            // TODO: Implement this properly
            console.log("Game already ended in win or draw. re-evaluating latest game state);
        default:
            break;
    }
}
```

You'll re-evaluate the latest game state when a win or draw happens later.

For now, let's continue focusing on allowing a player to make a move that changes the game's state.

You will first create a method called `performMove()`:

```js
performMove(columnIndex) {
  // ...
}
```

Now you need to create a copy of the current board that you can modify without changing the value of `this.currentBoard`.

To do this, you'll create a static method called `deepBoardCopy()`:

```js
static deepBoardCopy(oldBoard) {
  let newBoard = new Array(Constants.BoardDimensions.ROWS);

  for (let rowIndex = 0; rowIndex < Constants.BoardDimensions.ROWS; rowIndex++) {
      newBoard[rowIndex] = new Uint8Array(Constants.BoardDimensions.COLUMNS);
      for (let columnIndex = 0; columnIndex < Constants.BoardDimensions.COLUMNS; columnIndex++) {
          newBoard[rowIndex][columnIndex] = oldBoard[rowIndex][columnIndex];
      }
  }

  return newBoard;
}
```

Now store the board copy in a variable called `nextBoard`:

```js
performMove(columnIndex) {
  let nextBoard = FourInARowGame.deepBoardCopy(this.currentBoard);
}
```

The next thing you need to do is to actually perform the move on the board, to do this you'll create a method called `tryPerformMove()`:

```js
tryPerformMove(columnIndex, nextBoard) {
    let isMoveValid = false;

    for (let i = nextBoard.length - 1; i > -1; i--) {
        let boardRow = nextBoard[i];
        let boardPosition = boardRow[columnIndex];

        if (boardPosition !== Constants.BoardToken.NONE) {
            continue;
        }

        boardRow[columnIndex] = FourInARowGame.playerColorToBoardToken(this.currentTurn);
        isMoveValid = true;
        break;
    }

    if (!isMoveValid) {
        return {
            status: Constants.MoveStatus.INVALID,
        };
    }

    return {
        status: Constants.MoveStatus.SUCCESS,
        board: nextBoard
    };
}
```

The method above checks the column in the board the player specified from the bottom to the top for an empty position then attempts to add the current player's token to the board position. Later it returns the result.

There is a static method here called `playerColorToBoardToken` that was used, this sets the set's the value in the board position to a numeric value that is associated with the current player's colour.

Add it to the `FourInARowGame` class too:

```js
  static createBoard() {
    // ...
  }

  static playerColorToBoardToken(playerColor) {
      switch (playerColor) {
          case Constants.PlayerColor.YELLOW:
              return Constants.BoardToken.YELLOW;
          case Constants.PlayerColor.RED:
              return Constants.BoardToken.RED;
          default:
              return Constants.BoardToken.NONE;
      }
  }
```

Now you'll go back to the `performMove()` method and set the current game board to the board in the object returned from the `tryPerformMove()` method:

```js
performMove(columnIndex) {
  let nextBoard = FourInARowGame.deepBoardCopy(this.currentBoard);

  let moveAttemptResult = this.tryPerformMove(columnIndex, nextBoard);

  if (moveAttemptResult.status === Constants.MoveStatus.INVALID) {
    return {
        board: nextBoard,
        winner: Constants.PlayerColor.NONE,
        status: {
            message: "Returned column is filled",
            value: Constants.MoveStatus.INVALID
        },
        winLine: []
    }
  }

  // From this point, the board move was successful.
  this.currentBoard = moveAttemptResult.board;
}
```

If the value of the `moveAttemptResult.status` is `MoveStatus.Invalid` then you return a `MoveResult` which has the same structure as the move data you returned in your fake `playMove()` method implementation.

Lastly, you need create a method called `evaluateGame()` which will be used to check if the status of the game has changed then returns a `MoveResult`.

For now, you'll just return the `MoveResult` of a successful move, that also indicates that the game is still in progress.

```js
evaluateGame(board) {
    // From this point, you can assume that a successful move was made and the game will
    // continue on.
    return {
        board: board,
        winner: Constants.PlayerColor.NONE,
        status: {
            value: Constants.MoveStatus.SUCCESS
        },
        winLine: []
    };
}
```

Now the `MoveResult` will show an updated board value based on the column the player placed their token in.

To complete your updates to the `playMove()` method, you'll add a few more lines to it:

```js
playMove(columnIndex) {
    switch (this.status) {
        case Constants.GameStatus.START:
            this.status = Constants.GameStatus.IN_PROGRESS;
            break;
        case Constants.GameStatus.DRAW:
        case Constants.GameStatus.WIN:
            // The game is over at this point so
            // re-evaluate the latest board, returning the same game status
            // and board details.

            // TODO: Implement this properly
            console.log("Game already ended in win or draw. re-evaluating latest game state);
        default:
            break;
    }

    let moveResults = this.performMove(columnIndex);
    this.currentTurn = this.currentTurn === Constants.PlayerColor.YELLOW
        ? Constants.PlayerColor.RED
        : Constants.PlayerColor.YELLOW;

    return moveResults;
}
```

You perform a move, update the current turn to the opposing player's turn then return the results of the move.

## Testing out your changes

You added quite a few changes, let's test them out.

Assuming your have a local HTTP server running at the root of the project, navigate to the server's address in your web browser and open the browser console window again.

First, enter the following line in your browser's console:

```js
let game = window.fourInARowGame;
```

Now call the `playMove` method with the `columnIndex` parameter set to `1` instead of `0` to add the token to the second column on the game board:

```js
game.playMove(1);
```

You should see a `MoveResult` object returned. If you expand the object then expand the `board` field, you'll see that the value `1` has been added to the bottom of the second column on the board.

If you do, congratulations!

If not, please go over this post carefully to check for mistakes you may have made.

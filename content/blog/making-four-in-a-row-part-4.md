+++
title = "Making Four-In-A-Row Using JavaScript - Part 4: Winning Ways and Tedious Ties"
date = 2023-04-30T05:17:00Z
description = "Detecting wins and draws in your Four-In-A-Row game!"
+++

## Intro

In the [previous blog post](@/blog/making-four-in-a-row-part-3.md), you implemented player moves.

Now you're ready to check for wins and draws in the game.

## Checking For Wins

In four-in-a-row, there are three ways for a player to win a game:

1. Place 4 consecutive tokens horizontally
2. Place 4 consecutive tokens vertically
3. Place 4 consecutive tokens diagonally.

Since the board in the game has been created using an array of arrays, you can check for consecutive tokens by iterating through the game board, checking each direction for win lines.

### Finding Win Lines

While the directions to check for wins are different, we still are checking for the same number of consecutive tokens in each direction so, we can create a method that checks for the win lines for you.

Add a static method to the `FourInARowGame` class called `tryFindWinLine`:

```js
/**
 *
 * options: {
 *     startRowIndex,
 *     startColumnIndex,
 *     rowCountStep,
 *     columnCountStep
 * }
 *
 * Any missing options will be 0 by default.
 */
static tryFindWinLine(board, options) {
    // If `options` is null/undefined, set it's value to an empty object.
    options = options || {};

    let config = {
        startRowIndex: options.startRowIndex || 0,
        startColumnIndex: options.startColumnIndex || 0,
        rowCountStep: options.rowCountStep || 0,
        columnCountStep: options.columnCountStep || 0
    };

    let count = 0;
    let tokenToCheck = Constants.BoardToken.NONE;
    let winLine = [];

    for (let i = 0; i < Constants.BoardDimensions.WIN_LINE_LENGTH; i++) {
        let row = config.startRowIndex + config.rowCountStep * i;
        let column = config.startColumnIndex + config.columnCountStep * i;

        if (FourInARowGame.checkIfOutOfBounds(row, column)) {
            break;
        }

        let currentToken = board[row][column];
        if (currentToken === Constants.BoardToken.NONE) {
            break;
        }

        if (tokenToCheck === Constants.BoardToken.NONE) {
            tokenToCheck = currentToken;
        }

        if (currentToken === tokenToCheck) {
            count++;
        }

        winLine.push({ row: row, column: column });
    }

    if (count === Constants.BoardDimensions.WIN_LINE_LENGTH) {
        return {
            winLine: winLine,
            winner: FourInARowGame.boardTokenToPlayerColor(tokenToCheck),
        };
    }

    return {
        winLine: []
    };
}
```

The method above counts checks for consecutive tokens from a starting position. The behaviour of this method is controlled by the `options` object that is passed in.

`startRowIndex` and `startColumnIndex` sets the start position.

The `rowCountStep` and `columnCountStep` control the direction win lines will be checked in. For example, A `rowCountStep` of `0` and a `columnCountStep` of `1` will check for a win line horizontally from the start position.

Two other methods are called in `checkForWinLine()`.

`FourInARowGame.checkIfOutBounds()` checks if a specified position is out of bounds. This allows us to stop checking for a win line early.

Add the static method to the `FourInARowGame` class:

```js
static checkIfOutOfBounds(row, column) {
    return row < 0
        || row > Constants.BoardDimensions.ROWS
        || column < 0
        || column > Constants.BoardDimensions.COLUMNS;
}
```

The other method is another static one called `FourInARow.boardTokenToPlayerColor()` which turns board token values to player colour values.

Add it to the `FourInARowGame` class:

```js
static boardTokenToPlayerColor(boardToken) {
    switch (boardToken) {
        case Constants.BoardToken.YELLOW:
            return Constants.PlayerColor.YELLOW;
        case Constants.BoardToken.RED:
            return Constants.PlayerColor.RED;
        default:
            return Constants.PlayerColor.NONE;
    }
}
```

### Checking For Wins In All Directions

Now that you've created methods to help you find win lines on the board, you're now ready to start checking if a player has won the game.

Create a new static method to the `FourInARowGame` class called `checkForWin()`:

```js
// Each win line is an array of board position coordinates:
// e.g: winLine = [{row: 0, column: 0}, {row: 0, column: 1}, {row: 0, column : 2}, {row: 0, column: 3}]
static checkForWin(board) {
    // Starts from bottom left of the board and ends on top right of board
    for (let columnIndex = 0; columnIndex < Constants.BoardDimensions.COLUMNS; columnIndex++) {
        for (let rowIndex = Constants.BoardDimensions.ROWS - 1; rowIndex > -1; rowIndex--) {
            // Check for vertical win
            let verticalWinCheckResult = FourInARowGame.tryFindWinLine(board, {
                startRowIndex: rowIndex,
                startColumnIndex: columnIndex,
                rowCountStep: -1,
            });

            if (verticalWinCheckResult.winner) {
                return verticalWinCheckResult;
            }

            let horizontalWinCheckResult = FourInARowGame.tryFindWinLine(board, {
                startRowIndex: rowIndex,
                startColumnIndex: columnIndex,
                columnCountStep: -1,
            });

            if (horizontalWinCheckResult.winner) {
                return horizontalWinCheckResult;
            }

            let leftDiagonalWinCheck = FourInARowGame.tryFindWinLine(board, {
                startRowIndex: rowIndex,
                startColumnIndex: columnIndex,
                rowCountStep: -1,
                columnCountStep: -1
            });

            if (leftDiagonalWinCheck.winner) {
                return leftDiagonalWinCheck;
            }

            let rightDiagonalWinCheck = FourInARowGame.tryFindWinLine(board, {
                startRowIndex: rowIndex,
                startColumnIndex: columnIndex,
                rowCountStep: -1,
                columnCountStep: 1
            });

            if (rightDiagonalWinCheck.winner) {
                return rightDiagonalWinCheck;
            }
        }
    }

    return {
        winLine: [],
        winner: Constants.PlayerColor.NONE
    };
}
```

This method above checks for win lines in all directions from each board position. It then returns a `WinCheckResult` which is made up of:
- a `winLine` which is a list of consecutive board positions 
- a `winner`, which contains the who won the game.

Notice how the `rowCountStep` and `columnCountStep` values are set for each direction.

### Allowing Players To Win

Now that you have created a method that checks for wins, you can now detect wins and update the status of the game accordingly.

Update the `evaluateGame()` method so that it handles wins being detected:

```js
evaluateGame(board) {
    let winCheckResult = FourInARowGame.checkForWin(board);

    if (winCheckResult.winner !== Constants.PlayerColor.NONE) {
        this.status = Constants.GameStatus.WIN;
        return {
            board: board,
            winner: winCheckResult.winner,
            status: {
                value: Constants.MoveStatus.WIN
            },
            winLine: winCheckResult.winLine
        };
    }

    // From this point, we can assume that a successful move was made and the game will
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

One more thing you need to do is update `playMove()` so that it re-evaluates the board when the game has already concluded:

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
            return this.evaluateGame(this.currentBoard);
        default:
            break;
    }

    let moveResults = this.performMove(columnIndex);

    // Do not change player turn if move is invalid
    if (moveResults.status !== Constants.MoveStatus.INVALID && moveResults.status.value !== Constants.MoveStatus.INVALID) {
        this.currentTurn = this.currentTurn === Constants.PlayerColor.YELLOW
            ? Constants.PlayerColor.RED
            : Constants.PlayerColor.YELLOW;
    }
    return moveResults;
}
```

Feel free to test this out in your browser's console.

When a move results in a win, the move result object in the output will have the `status` field with a value of `win`, `winner` will be set to either `Red` or `Yellow` and `winLine` will be filled with positions.

Subsequent calls to `playMove()` will produce the same output every time. The game is already over after all 😉.

## Checking For A Draw

Not every four-in-a-row game concludes with a win. There are cases where the board is filled with no winner. In these cases, the game ends in a draw.

You're now going to add the ability to detect a draw.

First, add a static method called `checkForFilledBoard()` to the `FourInARowGame` class:

```js
static checkForFilledBoard(board) {
    for (let j = 0; j < board.length; j++) {
        let boardColumn = board[j];
        for (let i = 0; i < boardColumn.length; i++) {
            let boardPosition = boardColumn[i];
            if (boardPosition === Constants.BoardToken.NONE) {
                return false;
            }
        }
    }

    return true;
}
```

Now, make another update to the `evaluateGame()` method so that it checks for a draw and if true, returns a `MoveResult` object that indicates that the game has ended with a draw:

```js
evaluateGame(board) {
    let winCheckResult = FourInARowGame.checkForWin(board);

    if (winCheckResult.winner !== Constants.PlayerColor.NONE) {
        this.status = Constants.GameStatus.WIN;
        return {
            board: board,
            winner: winCheckResult.winner,
            status: {
                value: Constants.MoveStatus.WIN,
            },
            winLine: winCheckResult.winLine,
        };
    }

    // If board is full right now, we can assume the game to be a draw
    // since there weren't any winning lines detected.
    if (FourInARowGame.checkForFilledBoard(board)) {
        this.status = Constants.GameStatus.DRAW;

        return {
            board: board,
            winner: Constants.PlayerColor.NONE,
            status: {
            value: Constants.MoveStatus.DRAW,
            },
            winLine: [],
        };
    }

    // From this point, we can assume that a successful move was made and the game will
    // continue on.
    return {
        board: board,
        winner: Constants.PlayerColor.NONE,
        status: {
            value: Constants.MoveStatus.SUCCESS,
        },
        winLine: [],
    };
}
```

Feel free to test out these changes yourself in your browser's console. The `MoveResult` object returned in the output will have a `status` field with a value of `draw`.

If you encounter any errors or unexpected behaviour then please go over the code you've written so far and read over this post again.

Otherwise, congratulations! You've now implemented the core logic of a four-in-a-row game in JavaScript.

In the upcoming posts in this blog series, you'll be working on the HTML5 Canvas front-end for your game and integrating the state machine object you've created into it!

That's all for now 👋!

[Next Post](@/blog/making-four-in-a-row-part-5.md)

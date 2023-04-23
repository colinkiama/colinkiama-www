+++
title = "Making Four-In-A-Row - Part 4: Winning Ways and Tedious Ties"
date = 2023-04-22T23:00:00Z
description = "Detecting wins and draws in your Four-In-A-Row game!"
+++

## Intro

In the [previous blog](@/blog/making-four-in-a-row-part-3.md) post, you implemented player moves.

Now you're ready to check for wins and draws in the game.

## Checking for Wins

In four-in-a-row, there are three ways to for a player to win a game:

1. Place 4 consecutive tokens horizontally
2. Place 4 consecutive tokens vertically
3. Place 4 consecutive tokens diagonally.

Since the board in game has been created using an array of arrays, you can create check for consecutive tokens by iterating through the game board, checking each direction for win lines.

### Finding win lines

While the directions to check for wins are different, we still are checking for the same number consecutive tokens in each direction so, we can create a method that checks for the win lines for you.

Add a method to the `FourInARowGame` class called `tryFindWinLine`:

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
tryFindWinningLine(board, options) {
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

        if (this.checkIfOutOfBounds(row, column)) {
            break;
        }

        let currentToken = board[row][column];
        if (currentToken === BoardToken.NONE) {
            break;
        }

        if (tokenToCheck === BoardToken.NONE) {
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

TODO: Brief explanation of method, introduce the `checkIfOutOfBounds()` method and the `boardTokenToPlayerColor()` method, then move onto to creation of `checkWin()` method (different section).

The method above counts checks for consecutive tokens from a starting position. The behaviour of this method is controlled by the `options` object that is passed in.

`startRowIndex` and `startColumnIndex` sets the start position.

The `rowCountStep` and `columnCountStep` controls the direction win lines will be checked in. For example: A `rowCountStep` of `0` and a `columnCountStep` of `1` will check for a win line horizontally from the start position.

There two other methods that are called in `checkForWinLine()`.

`checkIfOutBounds()` checks if a specified position is out of bounds. This allows us to stop checking for a win line early.

Add the method to the `FourInARowGame` class:

```js
checkIfOutOfBounds(row, column) {
    return row < 0
        || row > Constants.BoardDimensions.ROWS
        || column < 0
        || column > Constants.BoardDimensions.COLUMNS;
}
```

The other method is the a static one called `FourInARow.boardTokenToPlayerColor`

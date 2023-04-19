+++
title = "Making Four-In-A-Row - Part 2: Beginning"
date = 2023-02-23T22:00:00Z
description="Start implementing the logic of your Four-In-A-Row game!"
+++

## Intro

In the last blog post, you set up the prerequisites of the project created
the file structure of the project.

Now let's start implementing the logic of the game.

## Rules Of The Game

Four-in-a-row is a two-player game played on a 6 (rows) x 7 (columns) rack
board, where the objective is to be the first player to form a vertical,
horizontal or vertical line with four of your own tokens.

The player who meets the objective will win. If the board is completely filled
and there is no winner, the game ends in a draw.

Each token a player puts down falls down the lowest available space within a column.

## Preparing to implement the logic

### Constants

Now that we'll know the rules, we'll now write down constant values that we'll be using throughout this project.

Create a new JavaScript file called `index.js` in `src/constants`.

Now add the following to the file you've just created:

```js
export const GameStatus = {
  IN_PROGRESS: "in-progress",
  START: "start",
  WIN: "win",
  DRAW: "draw",
};

export const MoveStatus = {
  INVALID: "invalid",
  WIN: "win",
  SUCCESS: "success",
  DRAW: "draw",
};

export const PlayerColor = {
  NONE: "none",
  YELLOW: "yellow",
  RED: "red",
};

export const BoardDimensions = {
  ROWS: 6,
  COLUMNS: 7,
  WIN_LINE_LENGTH: 4,
};

export const BoardToken = {
  NONE: 0,
  YELLOW: 1,
  RED: 2,
};
```

### Setting up the state machine

Now we will create a state machine which represents a four-in-a-row-game.

Create a new JavaScript file called `FourInARowGame.js` and add the following to it:

```js
import * as Constants from "./constants/index.js";

export default class FourInARowGame {
  // State machine code is going to be here!
}
```

#### Simple Fields

These lines reference the constants we wrote in `src/constants/index.js`, making them available to use in `FourInARowGame.js`. It also creates a class called
`FourInARowGame`.

To get the game going, what we'll need to track the following:

- The current game's status in order to know whether the game has ended or not and if it has ended, how it ended.
- The current turn in order to figure out which player's token to put down when a move is next played
- The starting colour player token to help determine who gets to gets to start of the game and to figure out the which player's turn it is over time.
- The state of the board

Let's add these fields to our `FourInARowGame` class:

```js
export default class FourInARowGame {
  startingColor;
  currentTurn;
  status;
  currentBoard;

  // More to come...
}
```

Regarding the starting colour, there isn't any rule about which colour should start but we'll set it to `yellow` by default
to keep things simple:

```js
export default class FourInARowGame {
  // ..

  constructor() {
    this.startingColor = Constants.PlayerColor.YELLOW;
  }
}
```

Next up is the `currentTurn` and `status`. Since the game has just started, we'll make the value of `currentTurn` the same value of
`startingColor` and `status` to `GameStatus.START`:

#### Initialising the History Field

```js
export default class FourInARowGame {
  // ..

  constructor() {
    this.startingColor = Constants.PlayerColor.YELLOW;
    this.currentTurn = this.startingColor;
    this.status = Constants.GameStatus.START;
  }
}
```

Now with the `currentBoard` field, we want initially set it's value to an empty board; a single board in a game of Four-In-A-Row has 6 rows and 7 columns (42 positions in total).
We'll use an array of arrays to represent this structure in JavaScript.

The first step is creating a static method in the `FourInARowGame` class that creates an empty board for us:

```js
export default class FourInARowGame {
  // ..

  static createBoard() {
    let board = new Array(Constants.BoardDimensions.ROWS);

    for (let i = 0; i < Constants.BoardDimensions.ROWS; i++) {
      board[i] = new Uint8Array(Constants.BoardDimensions.COLUMNS);
      board[i].fill(Constants.BoardToken.NONE);
    }

    return board;
  }
}
```

Notice that `Uint8Array` was used instead of `Array` in the enclosed loop. This is because numbers in JavaScript are
stored as the `Number` data type by default, which stores 64-bit floating point numbers. We will only be
using 3 possible numbers in each board position so `Uint8` makes more sense which is the smallest numeric data type that
our range of possible numbers fits in.

This saves memory considering that there are 42 positions in a board.

Now we can finish of initialising the `history` field:

```js
export default class FourInARowGame {
  constructor() {
    // ..

    this.currentBoard = FourInARowGame.createBoard();
  }
}
```
We are now ready to implement the logic that runs when a player makes a move.

We'll do this in the next post! See you then! 👋

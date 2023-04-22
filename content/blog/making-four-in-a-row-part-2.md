+++
title = "Making Four-In-A-Row - Part 2: Beginning"
date = 2023-04-19T23:00:00Z
updated = 2023-04-22T18:19:00Z
description = "Start implementing the logic of your Four-In-A-Row game!"
+++

## Intro

In the [last blog post](@/blog/making-four-in-a-row-part-1.md), you set up the prerequisites and file structure of the project.

Now let's start implementing the logic of the game.

## Rules Of The Game

Four-in-a-row is a two-player game played on a 6 (rows) x 7 (columns) rack board, where the objective is to be the first player to form a vertical, horizontal or vertical line with four of your own tokens.

The player who meets the objective first, wins. If the board is completely filled and there is no winner, the game ends in a draw.

Each token a player puts down falls down the lowest available space within a column.

## Preparing to implement the logic

### Constants

Now that you'll know the rules, you'll now write down relevant constant values that you'll be using throughout this project.

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

Now you will create a state machine which represents a four-in-a-row-game.

Create a new JavaScript file called `FourInARowGame.js` in `/src` and add the following to it:

```js
import * as Constants from "./constants/index.js";

export default class FourInARowGame {
  // State machine code is going to be here!
}
```

These lines reference the constants you wrote in `src/constants/index.js`, making them available to use in `FourInARowGame.js`. It also creates a class called `FourInARowGame`.

#### Simple Fields

To get the game going, you'll need to be aware of the following:

- The current game's status - To know whether the game has ended or not and if it has ended, how it ended
- The current turn - To figure out which player's token to put down when a move is next played
- The starting colour player token - To determine who starts the game
- The state of the board - To know which tokens have been placed on the board

Let's add these fields to your `FourInARowGame` class:

```js
export default class FourInARowGame {
  startingColor;
  currentTurn;
  status;
  currentBoard;

  // More to come...
}
```

Regarding the starting colour, there isn't any rule about which colour should start but you'll set it to `yellow`:

```js
export default class FourInARowGame {
  // ..

  constructor() {
    this.startingColor = Constants.PlayerColor.YELLOW;
  }
}
```

Next up is the `currentTurn` and `status`. Since the game has just started, you'll set the value of `currentTurn` to the value of `startingColor` and set the value of `status` to `GameStatus.START`:

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

#### Initialising the board Field

Now, for the `currentBoard` field, you will initially set its value to an empty board; a single board in a game of Four-In-A-Row has 6 rows and 7 columns (42 positions in total). You'll use an array of arrays to represent this structure in JavaScript.

The first step is creating a static method in the `FourInARowGame` class that creates an empty board for you:

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

Notice that `Uint8Array` was used instead of `Array` in the enclosed loop. This is because numbers in JavaScript are stored as the `Number` data type by default, which stores 64-bit floating point numbers. You will only be using 3 possible numbers in each board position so `Uint8` makes more sense which is the smallest numeric data type that your range of possible numbers fits in.

This saves memory considering that there are 42 positions in a board.

Now you can finish of initialising the `currentBoard` field:

```js
export default class FourInARowGame {
  constructor() {
    // ..

    this.currentBoard = FourInARowGame.createBoard();
  }
}
```

You are now ready to implement the logic that runs when a player makes a move.

You'll do this in the next post! See you then! 👋

[Next Post](@/blog/making-four-in-a-row-part-3.md)

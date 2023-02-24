+++
title = "Making Four-In-A-Row - Part 2: Beginning"
date = 2023-02-23T22:00:00Z
description="Implementing the logic of your Four-In-A-Row game!"
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

These lines reference the constants we wrote in `src/constants/indexj.js`, making them available to use in `FourInARowGame.js`. It also creates a class called
`FourInARowGame`.

To get the game going, what we'll need to track the following:

- The current game's status in order to know whether the game has ended or not and if it has ended, how it ended.
- The current turn in order to figure out which player's token to put down when a move is next played
- The starting colour player token to help determine who gets to gets to start of the game and to figure out the which player's turn it is over time.

We'll also be tracking the history of the board over time in order to help figure
out which player's turn it is over time and to keep the last move played in case the next move played is invalid.

Let's add these fields to our `FourInARowGame` class:

```js
export default class FourInARowGame {
  startingColor;
  currentTurn;
  status;
  history;

  // More to come...
}
```

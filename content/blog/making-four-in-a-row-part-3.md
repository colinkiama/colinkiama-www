+++
title = "Making Four-In-A-Row - Part 3: Making Moves"
date = 2023-08-03T22:00:00Z
description="Allow players to make moves in your Four-In-A-Row game!"
+++

## Intro

In this previous blog post, we set up our `FourInARowGame` class's fields.

Now we're ready to start implementing player moves and updating the state of
the game accordingly.

## Creating the method

We'll start off by creating a new method in the `FourInARowGame` class called
`playMove()`:

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

Note: We're just just returning mock data for now. We'll properly implement this method
later on.

The `playMove` method actually takes in a `columnIndex` argument. From this input, a move will be attempted and
the result of the attempted move will be evaluated and returned. The code example above shows the a `MoveResult` object
being returned. It can contain:

- The current state of the board after a move has been played
- The winner
- The status of the move
- The win line - an array of positions of 4 consecutive tokens were located, if found.

## Interacting with our state machine

### Exposing our state machine object

Now, to try out our code, we'll try interacting with our Four-In-A-Row state machine with the browser.

First, we'll need to expose the object so that the browser's console can access it. One way we can do this is by adding
an instance of the `FourInARowGame` class to the `window` object. Let's do that right now. Replace the contents of
`src/index.js` with the following:

```js
import FourInARowGame from "./FourInARowGame.js";

window.fourInARowGame = new FourInARowGame();
```

Now, ensure that the a http server is running in the root of project and navigate to the server's address in your
web browser.

Open up your the console window in your web browser then enter in: `window.fourInARowGame`. You should see an output
of the `FourInARowGame` instance object. In Google Chrome it looks like this:

```js
FourInARowGame {startingColor: 'yellow', currentTurn: 'yellow', status: 'start', board: Array(6)}
```

There is also the options to expand the object so you can view more details about the object.

If you don't see some sort of representation of an `FourInARow` instance object then please go over your code and check
that you've followed the instructions correctly!

### Play a (fake) move

Now let's call the `playMove` method from the `FourInARow` instance, in the browser console window.

First let's store the state machine in an easier to reference variable called `game`:

```js
let game = window.fourInARowGame;
```

Now call the `playMove` method with the `columnIndex` parameter set to `0`:

```js
game.playMove(0);
```

Your browser console window should output something resembling the `MoveResult` object we discussed earlier:

```js
{board: Array(6), winner: 'none', status: {…}, winLine: Array(0)}
```

When expanded, we get more details:

```js
{board: Array(6), winner: 'none', status: {…}, winLine: Array(0)}
    board: (6) [Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7), Uint8Array(7)]
    status: {value: 'success'}
    winLine: []
    winner: "none"
    [[Prototype]]: Object
```

Now that we know the type of result that we're expecting after calling `playMove()`, let's properly implement the
method so that it returns real data based on the state of the board.

## Implementing the method (for real this time!)

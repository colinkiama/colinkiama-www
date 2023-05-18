+++
title = "Making Four-In-A-Row - Part 5: Reorganisation"
date = 2023-05-14T21:00:00Z
description = "Making changes to the work you've done so far in preparation for your four-in-a-row game's HTML5 Canvas front-end."
+++

## Intro

In the [previous blog post](@/blog/making-four-in-a-row-part-4.md), you checked for wins and draws in `FourInARowGame`.

Now you'll be reorganising the work you've done so far in preparation the the HTML5 Canvas front-end that you'll be creating for the game.

## Creating Game Logic Directory

First, create a new directory in the `src` directory called `gameLogic`.

Now move the `src/constants` directory and `src/FourInARowGame.js` to `src/gameLogic`.

Lastly, create a file under `src/gameLogic` called `index.js` with the following contents:

```js
import FourInARowGame from "./FourInARowGame.js";
import * as Constants from "./constants/index.js";

export { Constants, FourInARowGame };
```

From now on the core game logic will be stored in and referenced from `src/gameLogic`. The outside of `src/gameLogic` will be for the front-end.

## Importing from the game logic Module

You're now exporting your core game logic as a module from `src/gameLogic/index.js`. You'll now need to fix outdated imports of the `FourInARowGame` class.

To do this, fix the import statement in `src/index.js` so that you import the `FourInARowGame` class from the game logic module:

```js
import { FourInARowGame } from "./gameLogic/index.js";

window.fourInARowGame = new FourInARowGame();
```

If you test the code in your web browser's console, you should still be able to interact with `window.fourInARowGame` just like before.

If not, please make sure that you've followed the instructions in this post correctly!

Great! Now, you're ready to start working on the front-end in the next post.

[Next Post](@/blog/making-four-in-a-row-part-6.md)

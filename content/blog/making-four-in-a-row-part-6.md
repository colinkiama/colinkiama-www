+++
title = "Making Four-In-A-Row - Part 6: Blank Canvas"
date = 2023-05-27T20:22:00Z
description = "Start working on the front-end of your Four-In-A-Row game!"
+++

## Intro

First of all, great job following along with this series! You've completed the first 50% of this tutorial so far!

In the [previous blog post](@/blog/making-four-in-a-row-part-5.md), you reorganised the project in preparation for work on the front end of the game. This is the post where the work starts.

Here's your expected outcome at the end of this tutorial:

![A four-in-a-row game where the yellow player has won with a diagonal win](https://ik.imagekit.io/mune/four-in-a-row-goal_ua2AQmcTE.png)

Here's a breakdown of the image above:

- Top part: Status Area - Displays the colour of the current player's turn as well as a status message explaining what's happening in the game.
- Middle part: Game Board - Displays where players have placed their tokens in the game.
- Bottom Part: Play Again Button: Restarts the game. Shows up when the game is over.

This post will be focused on setting up the canvas - where each part of the game will be displayed on.

## Setting up constants (again)

In the same way that you created a constants file for the game logic, you'll also need to create one for the front end.

Create a new directory in `src` called `constants` then, inside the directory you've just created (`src/constants`), create a called `index.js` with these contents:

```js
export const FrontEndConfig = {
  GAME_BACKGROUND_COLOR: "#122A67",
};

export const StatusMessages = {
  DRAW: "DRAW!",
  YELLOW_TURN: "YELLOW PLAYER'S TURN",
  RED_TURN: "RED PLAYER'S TURN",
  YELLOW_WIN: "YELLOW PLAYER WINS!",
  RED_WIN: "RED PLAYER WINS!",
};

export const StatusAreaConfig = {
  HEIGHT: 100,
  PADDING_TOP: 40,
  INNER_MARGIN: 28,
  INDICATOR_WIDTH: 16,
};

export const BoardConfig = {
  WIDTH: 284,
  HEIGHT: 242,
  MARGIN_TOP: 20,
  MARGIN_LEFT: 18,
  HORIZONTAL_PADDING: 18,
  VERTICAL_PADDING: 16,
  SLOT_MARGIN: 8,
  SLOT_WIDTH: 28,
  BACKGROUND_COLOR: "#1D48B8",
  SLOT_OUTLINE_COLOR: "#225FFD",
};

export const TokenColor = {
  NONE: "#D9D9D9",
  YELLOW: "#EAC02B",
  RED: "#EA2B2B",
};

export const PlayAgainButtonConfig = {
  WIDTH: 128,
  HEIGHT: 40,
  TEXT: "Play Again",
  MARGIN_BOTTOM: 80,
  BORDER_WIDTH: 1,
  BACKGROUND_START_COLOR: "#225FFD",
  BACKGROUND_END_COLOR: "#1D48B8",
};
```

## Setting up the canvas

### Adding canvas to the body

First, you'll need to add the `<canvas>` element to the `<body>` of the page. It'll need to have a `width` of 320, a `height` of 480, and an `id` of "canvas". You do this in `index.html`. It should look like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Four in a row</title>
  </head>

  <body>
    <canvas id="canvas" width="320" height="480"></canvas>
    <script src="src/index.js" type="module"></script>
  </body>
</html>
```

### Referencing the canvas in Javascript

Next, you'll reference the `<canvas>` element that you've added to the page from JavaScript.

Create a new file called in the `src` directory called `FrontEnd.js`. This will handle the front-end logic of the game.

Add the following code to the file you've just created:

```js
export default class FrontEnd {
  constructor(game) {
    this.game = game;
  }
}
```

The constructor of the `FrontEnd` class has a parameter called `game` which contains an instance of the `FourInARowGame` class. The `FourInARowGame` instance will be stored in the `FrontEnd` class in the `game` field. This will be used to update and retrieve the core game's state.

Next, you'll set up the canvas.

In the `FrontEnd` class's constructor, obtain a reference to the canvas element on the page and store it in a class field called `canvas`:

```js
export default class FrontEnd {
  game;
  canvas;

  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
  }
}
```

Next, set 2 more fields called `width` and `height` to the canvas' width and height respectively:

```js
export default class FrontEnd {
  game;
  canvas;
  width;
  height;

  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
    this.width = canvas.width;
    this.height = canvas.height;
  }
}
```

This will come in handy later once you start drawing on the canvas.

Lastly, set the background of the canvas:

```js
import { FrontEndConfig } from "./constants/index.js";

export default class FrontEnd {
  game;
  canvas;
  width;
  height;

  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
    this.canvas.style.background = FrontEndConfig.GAME_BACKGROUND_COLOR;
    this.width = canvas.width;
    this.height = canvas.height;
  }
}
```

Now let's see if you've referenced the canvas element properly.

In `src/index.js`, update the code to create a new instance of the `FrontEnd` class:

```js
import { FourInARowGame } from "./gameLogic/index.js";
import FrontEnd from "./FrontEnd.js";

let frontEnd = new FrontEnd(new FourInARowGame());
```

If you run an HTTP server and check the address it's pointing to, you should see a blue rectangle (That's the canvas you've created!):

![Image of canvas with blue background](https://ik.imagekit.io/mune/four-in-a-row-canvas-setup_h3F8XfyjC.png?updatedAt=1685214594926)

### Drawing on the canvas

Let's proceed to draw on the canvas. To do this you'll need to get a [2D canvas rendering context](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D). Another way to think about this is that you're getting a set of art supplies (paints, paintbrushes, stencils, etc.) made for creating 2D drawings.

You'll set this rendering context object in the `context` field of your `FrontEnd` class:

```js
import { FrontEndConfig } from "./constants/index.js";

export default class FrontEnd {
  game;
  canvas;
  width;
  height;
  context;

  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
    this.canvas.style.background = FrontEndConfig.GAME_BACKGROUND_COLOR;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = this.canvas.getContext("2d");
  }
}
```

Next up, you'll need to [scale the canvas for high-resolution displays to prevent issues with blurry drawings](https://web.dev/canvas-hidipi).

First, create a method called `enableHiDPIDisplaySupport()` in the `FrontEnd` class:

```js
export default class FrontEnd {
  // ...
  enableHiDPISupport() {
    // Get the DPR and size of the canvas
    const dpr = window.devicePixelRatio;
    const rect = this.canvas.getBoundingClientRect();

    // Set the "actual" size of the canvas
    this.canvas.width = rect.width * dpr;
    this.canvas.height = rect.height * dpr;

    // Scale the context to ensure correct drawing operations
    this.context.scale(dpr, dpr);

    // Set the "drawn" size of the canvas
    this.canvas.style.width = `${rect.width}px`;
    this.canvas.style.height = `${rect.height}px`;
  }
}
```

Now call the `enableHiDPIDisplaySupport()` method in the `FrontEnd` class constructor:

```js
export default class FrontEnd {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas");
    this.canvas.style.background = FrontEndConfig.GAME_BACKGROUND_COLOR;
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = this.canvas.getContext("2d");

    this.enableHiDPIDisplaySupport();
  }

  // ...
}
```

You're now ready to start drawing on the canvas.

Create a method called `start()` in the `FrontEnd` class and draw a white rectangle with a width of `50` and a height of `100`:

```js
export default class FrontEnd {
  constructor(game) {
    // ...
  }

  start() {
    this.context.fillStyle = "white";
    this.context.fillRect(20, 20, 50, 100); // fillRect(x, y, width, height);
  }
}
```

Now go back to `src/index.js` and call the `start()` method on the `FrontEnd` class instance that you created:

```js
import { FourInARowGame } from "./gameLogic/index.js";
import FrontEnd from "./FrontEnd.js";

let frontEnd = new FrontEnd(new FourInARowGame());
frontEnd.start();
```

Now, if you check your project with an HTTP server, in your browser, you'll see a blue canvas with a white rectangle drawn on it:

![Image of canvas drawing with a white rectangle over a blue background](https://ik.imagekit.io/mune/four-in-a-row-first-canvas-drawing_l-1NGyp-X.png?updatedAt=1685214594885)

Congratulations, you've covered the basics of drawing using the HTML5 Canvas API!

In the next post, you'll draw the game board on the canvas.

That's all for now! 👋️

[Next Post](@/blog/making-four-in-a-row-part-7.md)

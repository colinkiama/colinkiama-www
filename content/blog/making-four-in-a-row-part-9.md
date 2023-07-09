+++
title = "Making Four-In-A-Row - Part 9: Play Again"
date = 2023-07-09T12:00:00Z
description = 'The Finale. Add a "Play Again" button your Four-In-A-Row game!'
+++

## Intro

In the [previous blog post](@/blog/making-four-in-a-row-part-8.md), you added the status area to the game. Players and spectators could now clearly understand what's happening at any time during gameplay.

In this post, you'll add the ability to restart the game without having to refresh your browser.

You'll do this by adding a "Play Again" button to the game.

## What Is The Play Again Button?

Let's take one more look at the mockup of the finished game:
![Image of game mockup](https://ik.imagekit.io/mune/four-in-a-row-goal_ua2AQmcTE.png)

The "Play Again" button is a the button.

It's only visible when the game ends (a player wins or the game ends in a draw).

When it's clicked on, the game restarts and the button disappears.

## Creating The PlayAgainButton class

Just like the other components you've added so far, the "Play Again" button is also a game object.

In the `src/components` directory, create a file create a file called `PlayAgainButton.js`.

In that file, create a class called `PlayAgainButton` that extends from `GameObject`:

```js
import GameObject from "./GameObject.js";

export default class PlayAgainButton extends GameObject {
   
}
```

You are also going to need some constants specific to this component too. Import `PlayAgainButtonConfig`:

```js
import GameObject from "./GameObject.js";
import { PlayAgainButtonConfig } from "../constants/index.js";

export default class PlayAgainButton extends GameObject {
    
}
```

Next, add the drawing logic for the button's background. Add `renderBackground()` to the `PlayAgainButton` class:

```js
export default class PlayAgainButton extends GameObject {
    renderBackground() {
        const backgroundGradient = this.context.createLinearGradient(this.x, this.y, this.x, this.y + this.height);
        backgroundGradient.addColorStop(0, PlayAgainButtonConfig.BACKGROUND_START_COLOR);
        backgroundGradient.addColorStop(1, PlayAgainButtonConfig.BACKGROUND_END_COLOR);

        this.context.fillStyle = backgroundGradient;
        this.context.strokeStyle = `${PlayAgainButtonConfig.BORDER_WIDTH}px black`;
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.strokeRect(this.x, this.y, this.width, this.height);
    }    
}
```

Thn, override the `clear()` method from `GameObject` to also take into account the button's borders:

```js
export default class PlayAgainButton extends GameObject {
    // ..

    clear() {
        const clearRectX = this.x - PlayAgainButtonConfig.BORDER_WIDTH;
        const clearRectY = this.y - PlayAgainButtonConfig.BORDER_WIDTH;
        const clearRectWidth = this.width + PlayAgainButtonConfig.BORDER_WIDTH * 2;
        const clearRectHeight = this.height + PlayAgainButtonConfig.BORDER_WIDTH * 2;

        this.context.clearRect(clearRectX, clearRectY, clearRectWidth, clearRectHeight);
    }
}
```

Now to add text to the button, add `renderText()` to the `PlayAgainButton` class:

```js
export default class PlayAgainButton extends GameObject {
    // ..

    renderText() {
        this.context.fillStyle = "white";
        this.context.font = "16px Arial";
        this.context.textAlign = "center";
        this.context.textBaseline = "top";

        const textMetrics = this.context.measureText(PlayAgainButtonConfig.TEXT);
        const textHeight = textMetrics.actualBoundingBoxDescent;

        // Calculation ensures that text is displayed at the vertical center of the button
        const finalTextY = this.y + (this.height / 2) - textHeight / 2;

        this.context.fillText(PlayAgainButtonConfig.TEXT, this.x + PlayAgainButtonConfig.WIDTH / 2, finalTextY);
    }
}
```

## Rendering The Button

You'll now add the "Play Again" button to the game.
First, add the `PlayAgainButton` class to `src/components/index.js` so that it can be imported from there:

```js
import Board from "./Board.js";
import StatusArea from './StatusArea.js';
import PlayAgainButton from "./PlayAgainButton.js";


export { Board, StatusArea, PlayAgainButton };
```

Now switch to `src/FrontEnd.js`. Import `PlayAgainButton` and `PlayAgainButtonConfig`:

```js
import { FrontEndConfig, BoardConfig, StatusAreaConfig, StatusMessages, PlayAgainButtonConfig } from "./constants/index.js";
import { Board, StatusArea, PlayAgainButton } from "./components/index.js";
import { Constants } from "./gameLogic/index.js";

export default class FrontEnd {
    // ..
}
```

Add the `playAgainButton` field to the `FrontEnd` class:

```js

export default class FrontEnd {
    game;
    canvas;
    width;
    height;
    context;
    board;
    statusArea;
    playAgainButton;
    gameOver;

    // ..

}
```

Then add `createPlayAgainButton()` to the `FrontEnd` class:

```js
export default class FrontEnd {
    // ..

    createPlayAgainButton() {
        let buttonX = this.width / 2 - PlayAgainButtonConfig.WIDTH / 2;
        let buttonY = this.height - PlayAgainButtonConfig.MARGIN_BOTTOM;
        let button = new PlayAgainButton(this.context, buttonX, buttonY, PlayAgainButtonConfig.WIDTH, PlayAgainButtonConfig.HEIGHT);
        return button;
    }
}
```

In the `start()` method, set the `playAgainButton` field to the value returned from `createPlayAgainButton()`:

```js
export default class FrontEnd {
    // ..

    start() {
        this.statusArea = this.createStatusArea();
        this.board = this.createBoard();
        this.playAgainButton = this.createPlayAgainButton();

        document.body.addEventListener('click', (clickEvent) => {
            this.board.handleClick(clickEvent);
        });
    }
}
```

If you check the game in your browser with a server running, you'll see the "Play Again" button on the canvas:

![Image of start of the game with "Play Again" button displayed at the bottom of the canvas]()

It's great that the button shows up but nothing happens when you click on it. It's not supposed to show up at this stage of the game either 😂️. You'll fix these problems next.

## Handling Input
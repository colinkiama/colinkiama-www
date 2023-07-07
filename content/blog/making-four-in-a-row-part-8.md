+++
title = "Making Four-In-A-Row - Part 8: Status Updates"
date = 2023-07-01T12:00:00Z
description = "Visibly track the current status of your Four-In-A-Row game!"
+++

## Intro

Welcome back! In the [previous blog post](@/blog/making-four-in-a-row-part-7.md), you drew the game board and made the game playable by clicking on board columns. In this post, you'll be adding the status area component to your four-in-a-row game.

## Breaking Down The Status Area Component

Let's refer back to the mockup of the finished game:

![Image of game mockup]()

The status area is at the top. It's broken down into 2 parts:
- Player Turn Indicator: Indicates the current player's turn via the associated player's colour being shown.
- Status Message: Describes what is at each stage of the game (whose turn is it? Which player won? etc.)

Together they inform players and spectators about what is happening in the game.

## Creating The StatusArea Class

To get started, create a file under the `src/components` directory called `StatusArea.js`.

In the file that you've just created, create an empty class called `StatusArea`. This class will inherit `GameObject`:

```js
import GameObject from "./GameObject.js";

export default class StatusArea extends GameObject {
   
}
```

## Player Turn Indicator

The player turn indicator is a small circle that appears in the status area. It may have either of these states:
- Display Yellow - Has a yellow colour when it's the yellow's player's turn of the yellow player has won the game.
- Display Red - Has a red colour when it's the red player's turn or the red player has won the game.
- Invisible - The indicator is not visible when the game ends in a draw.

Now that you know how the player turn indicator behaves, the next step for you is to add it to your game.

### Start Drawing The Player Turn Indicator

To start off, import the `Constants` object from the `gameLogic` directory as well as `StatusAreaConfig` and `TokenColor` from the `constants` directory:

```js
import { Constants } from "../gameLogic/index.js";
import { StatusAreaConfig, TokenColor } from "../constants/index.js";
import GameObject from "./GameObject.js";

export default class StatusArea extends GameObject {
   
}
```  

Then, add `renderPlayerTurnIndicator()` to the `StatusArea` class:

```js
export default class StatusArea extends GameObject {
    renderPlayerTurnIndicator(indicatorColor) {
        let indicatorColorValue;

        switch (indicatorColor) {
            case Constants.PlayerColor.YELLOW:
                indicatorColorValue = TokenColor.YELLOW;
                break;
            case Constants.PlayerColor.RED:
                indicatorColorValue = TokenColor.RED;
                break;
            default:
                // Unknown color. Do not attempt to render player turn indicator.
                return;
        }

        this.context.fillStyle = indicatorColorValue;
        const indicatorY = this.y + StatusAreaConfig.INDICATOR_WIDTH / 2 + StatusAreaConfig.PADDING_TOP;
        this.context.beginPath();

        // Draws a circle using CanvasDrawingContext2D.arc(): https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc
        this.context.arc(this.width / 2, indicatorY, StatusAreaConfig.INDICATOR_WIDTH / 2, 0, Math.PI * 2);

        this.context.closePath();
        this.context.fill();
    }
}
```

Next, add `render()` to the `StatusArea` class:

```js
export default class StatusArea extends GameObject {
    render(indicatorColor) {
        this.context.save();
        this.clear();

        if (indicatorColor !== Constants.PlayerColor.NONE) {
            this.renderPlayerTurnIndicator(indicatorColor);
        }

        this.context.restore();
    }

    // ..
}
```

Before continuing any further, you need to expose the `StatusArea` class as a module through the `src/components/index.js`:

```js
import Board from "./Board.js";
import StatusArea from './StatusArea.js';


export { Board, StatusArea };
```

Now what you've implemented the rendering logic of the player turn indicator, and exposed the `StatusArea` class through the `components` directory, you are now ready to start rendering the player turn indicator.

### Render Player Turn Indicator

In `src/FrontEnd.js` import `StatusAreaConfig`:

```js
import { FrontEndConfig, BoardConfig, StatusAreaConfig } from "./constants/index.js";
import { Board } from "./components/index.js";
import { Constants } from "./gameLogic/index.js";

export default class FrontEnd {
    // ..
}
```

Next, add the `statusArea` field to the `FrontEnd` class:

```js
export default class FrontEnd {
    game;
    canvas;
    width;
    height;
    context;
    board;
    statusArea;
    gameOver;

    // ..

}
```



Add `createStatusArea()` to the `FrontEnd` class:

```js
export default class FrontEnd {
    // ..

    createStatusArea() {
        let statusArea = new StatusArea(this.context, 0, 0, this.width, StatusAreaConfig.HEIGHT);
        statusArea.render(this.game.currentTurn);
        return statusArea;
    }
}
```

In `start()`, set `statusArea` to a new status area return from `createStatusArea()`:

```js
export default class FrontEnd {
    // ..

    start() {
        this.statusArea = this.createStatusArea();
        this.board = this.createBoard();

        document.body.addEventListener('click', (clickEvent) => {
            this.board.handleClick(clickEvent);
        });
    }
}
```

Then, update `processMoveResult()` so that it also determines the next player's turn, and passes in the colour of the next player to a call to the `render()` method on `statusArea`:

```js
export default class FrontEnd {
    // ..
    
    processMoveResult(moveResult) {
        if (this.gameOver || moveResult.status.value === Constants.MoveStatus.INVALID) {
            return;
        }

        const indicatorColor = moveResult.status.value === Constants.MoveStatus.DRAW ? Constants.PlayerColor.NONE : this.game.currentTurn;

        this.statusArea.render(indicatorColor);
        this.board.render(this.game.currentBoard);

        if (moveResult.status.value === Constants.MoveStatus.WIN || moveResult.status.value === Constants.MoveStatus.DRAW) {
            this.gameOver = true;
        }
    }
}
```

Lastly, in `createBoard()`, update the call to the `Board` constructor to so that the board when the game board is rendered, it's shifted down below the status area:

```js
    createBoard() {
        let board = new Board(this.context, BoardConfig.MARGIN_LEFT, this.statusArea.height + BoardConfig.MARGIN_TOP, BoardConfig.WIDTH, BoardConfig.HEIGHT);
        board.setColumnSelectionHandler((columnIndex) => this.playMove(columnIndex));
        board.render(this.game.currentBoard);
        return board;
    }
```

If you check the game in your browser while a server is running, you'll see the indicator colour being rendered.

It'll updated based on the current state of the game.

![Scenario 1 of game with player turn indicator]()

![Scenario 2 of game with player turn indicator]()

![Scenario 3 of game with player turn indicator]()

## Status Messages
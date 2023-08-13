+++
title = "Making Four-In-A-Row Using JavaScript - Part 8: Status Updates"
date = 2023-07-08T11:30:00Z
description = "Visibly track the current status of your Four-In-A-Row game!"
+++

## Intro

Welcome back! In the [previous blog post](@/blog/making-four-in-a-row-part-7.md), you drew the game board and made the game playable by clicking on the board columns. In this post, you'll be adding the status area component to your four-in-a-row game.

## Breaking Down The Status Area Component

Let's refer back to the mockup of the finished game:

![Image of game mockup](https://ik.imagekit.io/mune/four-in-a-row-goal_ua2AQmcTE.png)

The status area is at the top. It's broken down into 2 parts:
- Player Turn Indicator: Indicates the current player's turn by showing the associated player's colour.
- Status Message: Describes what is happening at each stage of the game (whose turn is it? Which player won? etc.)

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
- Yellow - Has a yellow colour when it's the yellow player's turn or the yellow player has won the game.
- Red - Has a red colour when it's the red player's turn or the red player has won the game.
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

Now what you've implemented the rendering logic of the player turn indicator and exposed the `StatusArea` class through the `components` directory, you are now ready to start rendering the player turn indicator.

### Render Player Turn Indicator

In `src/FrontEnd.js` import `StatusAreaConfig` and `StatusArea`:

```js
import { FrontEndConfig, BoardConfig, StatusAreaConfig } from "./constants/index.js";
import { Board, StatusArea } from "./components/index.js";
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

In `start()`, set `statusArea` to a new status area returned from `createStatusArea()`:

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

Add `determineIndicatorColor()` to the `FrontEnd` class:

```js
export default class FrontEnd {
    // ..

    determineIndicatorColor(moveResult) {
        if (moveResult.status.value === Constants.MoveStatus.DRAW) {
            return Constants.PlayerColor.NONE
        } else if (moveResult.status.value === Constants.MoveStatus.WIN) {
            return moveResult.winner;
        } else {
            return this.game.currentTurn;
        }
    }
}
```

Then, update `processMoveResult()` so that it also determines the next player's turn and passes in the colour of the next player to a call to the `render()` method on `statusArea`:

```js
export default class FrontEnd {
    // ..
    
    processMoveResult(moveResult) {
        if (this.gameOver || moveResult.status.value === Constants.MoveStatus.INVALID) {
            return;
        }

        const indicatorColor = this.determineIndicatorColor(moveResult);

        this.statusArea.render(indicatorColor);
        this.board.render(this.game.currentBoard);

        if (moveResult.status.value === Constants.MoveStatus.WIN || moveResult.status.value === Constants.MoveStatus.DRAW) {
            this.gameOver = true;
        }
    }
}
```

Lastly, in `createBoard()`, update the call to the `Board` constructor so that the board when the game board is rendered, it's shifted down below the status area:

```js
export default class FrontEnd {
    // ..

    createBoard() {
        let board = new Board(this.context, BoardConfig.MARGIN_LEFT, this.statusArea.height + BoardConfig.MARGIN_TOP, BoardConfig.WIDTH, BoardConfig.HEIGHT);
        board.setColumnSelectionHandler((columnIndex) => this.playMove(columnIndex));
        board.render(this.game.currentBoard);
        return board;
    }
}
```

If you check the game in your browser while a server is running, you'll see the indicator colour being rendered.

It'll update based on the current state of the game.

![Red player's turn on game board with player turn indicator displayed with a red colour](https://ik.imagekit.io/mune/four-in-a-row-player-turn-indicator_yk8A1O0mq.png?updatedAt=1688811167441)

## Status Messages

The status message is the text portion of the status area.

It is used to:
- Display the current player's turn
- Reveal which player has won a game
- Shows when a game ends in a draw

### Start Implementing Status Messages

Add the `renderMessage()` method to the `StatusArea` class:

```js
export default class FrontEnd {
    // ..

    renderMessage(message) {
        this.context.fillStyle = "white";
        this.context.font = "bold 16px Arial";
        this.context.textBaseline = "top";
        this.context.textAlign = "center"; // Default value had vertical alignment issues. "center" fixes those in this case
        const messageY = this.y + StatusAreaConfig.PADDING_TOP + StatusAreaConfig.INNER_MARGIN;
        this.context.fillText(message, this.width / 2, messageY);
    }
}
```

Proceed by adding the `message` parameter to the `render()` method then calling `renderMessage()` in `render()`:

```js
export default class StatusArea extends GameObject {
    render(indicatorColor, message) {
        this.context.save();
        this.clear();

        if (indicatorColor !== Constants.PlayerColor.NONE) {
            this.renderPlayerTurnIndicator(indicatorColor);
        }

        this.renderMessage(message);
        this.context.restore();
    }

    // ..
```

Once you've done that, switch back to the `src/FrontEnd.js` file. Import `StatusMessages` from the `constants` directory:

```js
import { FrontEndConfig, BoardConfig, StatusAreaConfig, StatusMessages } from "./constants/index.js";
import { Board } from "./components/index.js";
import { Constants } from "./gameLogic/index.js";
```

Now, add logic that determines which status message to display depending on the current state of the game. Add `pickStatusMessage()` to the `FrontEnd` class:

```js
export default class FrontEnd {
    // ..

    pickStatusMessage(status) {
        switch (status) {
            case Constants.GameStatus.WIN:
                // The game is on the the next turn but the somebody has won from the previous turn. The winning player is the opposite of the player who currently has a turn.
                return this.game.currentTurn === Constants.PlayerColor.YELLOW ? StatusMessages.RED_WIN : StatusMessages.YELLOW_WIN;
            case Constants.GameStatus.DRAW:
                return StatusMessages.DRAW;
        }

        // At this point, we can assume that the game is either has just started 
        // or is still in progress.
        return this.game.currentTurn === Constants.PlayerColor.YELLOW ? StatusMessages.YELLOW_TURN : StatusMessages.RED_TURN;
    }
}
```

Then in the `processMoveResult()` method, update the `render()` call on `statusArea` so that it has an additional argument passed in. This argument is a method call to `pickStatusMessage()` with the status value of `moveResult` passed in:

```js
export default class FrontEnd {
    // ..

    processMoveResult(moveResult) {
        if (this.gameOver || moveResult.status.value === Constants.MoveStatus.INVALID) {
            return;
        }

        const indicatorColor = this.determineIndicatorColor(moveResult);

        this.statusArea.render(indicatorColor, this.pickStatusMessage(moveResult.status.value))
        this.board.render(this.game.currentBoard);

        if (moveResult.status.value === Constants.MoveStatus.WIN || moveResult.status.value === Constants.MoveStatus.DRAW) {
            this.gameOver = true;
        }
    }
}
```

Lastly, repeat this same change in `createStatusArea()` except that the argument passed in to `pickStatusMessage()` will be the game's current status:

```js
export default class FrontEnd {
    // ..

    createStatusArea() {
        let statusArea = new StatusArea(this.context, 0, 0, this.width, StatusAreaConfig.HEIGHT);
        statusArea.render(this.game.currentTurn, this.pickStatusMessage(this.game.status));
        return statusArea;
    }
}
```

If you check the game in your browser with a server running, you'll see that the status area will always reflect the current status of the game:
- The player turn indicator will appear in states regarding a specific player
- The status message will describe the current state of the game

![Screenshot of yellow player's run with player turn indicator and the status message indicating this in the status area](https://ik.imagekit.io/mune/four-in-a-row-status-message_8h89jKXII.png?updatedAt=1688811167473)

## Conclusion

Congratulations on getting this far! It's now clear to understand what is happening during gameplay.

Unfortunately, when the game ends, there's no way to start a new game without refreshing the page.

In the next (and final) part of this tutorial, you'll solve this problem by adding the final component to the game, the play again button.

[Next Post](@/blog/making-four-in-a-row-part-9.md)

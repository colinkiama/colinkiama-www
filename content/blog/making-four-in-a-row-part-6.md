+++
title = "Making Four-In-A-Row - Part 6: Blank Canvas"
date = 2023-05-18T22:00:00Z
description = "Start working on the front-end of your Four-In-A-Row game!"
+++

## Intro

First of all, great job following along with this series! You have completed the first 50% of this tutorial so far!

In the [previous blog post](@/blog/making-four-in-a-row-part-5.md), reogranised the project in preparation for work on front-end of the game. This is the post where the work starts.

Here's your goal at the end of this tutorial:

![A four-in-a-row game where the yellow player has won with a diagonal win](https://ik.imagekit.io/mune/tr:w-320,h-480/four-in-a-row-win.png)

Here's a breakdown of the image above:

- Top part: Status Area - Displays the colour of the current player's turn as well as a status message explaining what's happening in the game.
- Middle part: Game Board - Displays where players have placed their tokens in the game.
- Bottom Part: Play Again Button: Restarts the game. Shows up when the game is over.

This post will be focused on setting up the canvas where each part of the game will be displayed on.

## Getting Started

### Adding Front-End Constants

The same way you created a constants file for the game logic, you'll need to also create one for the front-end

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

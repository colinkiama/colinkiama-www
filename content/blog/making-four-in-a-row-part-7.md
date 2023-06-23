+++
title = "Making Four-In-A-Row - Part 7: Drawing The Board"
date = 2023-06-22T20:22:00Z
description = "Draw the game board in your Four-In-A-Row game!"
+++

## Intro

Welcome back! In the [previous blog post](@/blog/making-four-in-a-row-part-6.md), you set up the canvas and created drawings on it. Now in this post, you'll draw the game board.

## Game Objects

### What is a game object?

The game features multiple drawings on the canvas. These distinct drawings take up space both horizontally and vertically. They may be made up of other smaller related drawings. These distinct drawings will be referred as "game objects".

### Why do we need game objects?

Looking back at the breakdown of the game's UI. There are three components that can be identified:
1. Status Area
2. Game Board
3. Play Again Button

All of these components have share things in common with each other:
- Position
- Dimensions
- All drawn on the canvas

When referring to these components in a generalised way, we'll be considering these common traits and properties only. In the context of this game, the general name for these components will be "Game Object". The components listed above are all **game objects**.

To represent this relationship in code, you'll create a `GameObject` class. The component classes will inherit from the `GameObject` class. This will avoid you from rewriting the common logic and properties shared across all the components.

### Creating the GameObject class

Unlike with the HTML elements, you will have to implement the game objects' size and positioning yourself. You'll also have to draw the game objects yourself.

Create a directory under the `src` directory called "components".

In the `src/components` directory, create a new file called "GameObject.js".

In `src/components/GameObject.js`, add the following to the file:

```js
export default class GameObject {
    x;
    y;
    width;
    height;
    context;

    constructor(context, x, y, width, height) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    clear() {
        this.context.clearRect(this.x, this.y, this.width, this.height);
    }
}
```
### Inheriting the GameObject class

Now that you've created the `GameObject` class, in the `src/components` directory, create a new file named "Board.js". After, in that file, create a `Board` class that inherits from the `GameObject` class:

```js
import GameObject from './GameObject.js';

export default class Board extends GameObject {

}
```

## Drawing the game board

To test out whether the `GameObject` is being inherited by `GameObject` correctly, you'll recreate the last post's white rectangle drawing using the `Board` class.

Now to do so, create a new 
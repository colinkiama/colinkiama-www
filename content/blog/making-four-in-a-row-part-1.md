+++
title = "Making Four-In-A-Row Using JavaScript - Part 1: Setup"
date = 2023-04-19T23:00:00Z
updated = 2023-04-22T18:18:00Z
description = "Your first step towards creating your own Four-In-A-Row game!"
+++

## Intro

In this blog series, I'll be walking you through how to make an HTML 5 Canvas Game.

Outline:

1. First, you'll create the core logic of the game - A back-end.
2. After implementing the back-end logic of the game, you'll create a front-end for the game using the HTML5 Canvas API.

The benefit of this approach is that you reduce the scope of bugs with core game logic by storing it all in a state machine object. The front end will simply be an interface for interacting with the state machine object.

Another benefit of this approach is that you'll have flexibility when choosing how to implement the game's front end. Maybe you'll find another way to use the HTML5 Canvas API. Maybe you'll use the built-in HTML elements. You could even try recreating the front end with WebGL or a game engine.

After this tutorial, you will be free to explore these various options!

Now, let's get started!

## Prerequisites

You'll need the following to be able to complete this tutorial:

1. A text editor (I recommend using [Visual Studio Code](https://code.visualstudio.com/) if you're unsure) - This is where you'll be writing your code.
2. A Web browser with access to developer tools - you'll be interacting with the browser console throughout the tutorial, especially at the start since the game won't have a front-end yet. I'll be using Google Chrome throughout this tutorial.
3. An HTTP Server (I recommend using the [Live Server Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdeyLiveServer)). This is required because you'll be using [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) without any JavaScript build tools. Attempting to try this without an HTTP server will result in a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) error.

Note: I strongly recommend using an HTTP Server with live reload support. You'll feel at peace knowing that you don't have to manually refresh your browser and possibly clear your cache to see the latest changes that you've made!

## Setup

### Directory Structure

First, create a directory where you'll write the code for the game. I suggest naming it "four-in-a-row".

Then, create this directory structure in the "four-in-a-row" project:

```
/src
   /constants
```

### The HTML File

Now let's set up the HTML file.

Create a file called `index.html` in the root of the project directory.

Add this to the file's contents:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Four in a row</title>
  </head>

  <body>
    <script src="src/index.js" type="module"></script>
  </body>
</html>
```

The code above sets the title of your page to "Four in a row", matches the page's width and scale to the device's screen width and scale, and references a JavaScript file called `index.js`. This will be the entry point for your code for the game.

### Entry point

Now, create the file: `src/index.js`.

You'll now do a quick check to see if the script file has been referenced correctly.

Add the following to `src/index.js`:

```js
console.log("Hello world");
```

Next, start an HTTP server in the root of your project directory.

When you visit the address of the server, you'll see an empty page. This is normal, you haven't added any controls or styling. However, if you open the developer tools in your web browser and select the console, you should see the following message:

```
Hello world
```

If you don't see the message above, you probably didn't follow the instructions properly. Please go back over the previous steps and ensure that you've completed them.

Otherwise, congratulations! You've completed the first part of this tutorial! 🥳

In the next post, you'll begin the creation of the back end by creating a four-in-a-row state machine!

[Next Post](@/blog/making-four-in-a-row-part-2.md)

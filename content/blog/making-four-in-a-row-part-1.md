+++
title = "Making Four-In-A-Row - Part 1: Setup"
date = 2023-02-20T22:00:00Z
description="Your first step towards creating your own Four-In-A-Row game!"
+++

## Intro

In this blog series, I'll be walking you through how to make a HTML 5 Canvas Game.

Outline:

1. First we'll create the create the core logic of the game - A backend.
2. After implementing the backend logic of the game, we'll create a front-end
   for the game using the HTML5 Canvas API.

The benefit of this approach is that we reduce the scope of bugs with core game
logic by storing it all in a state machine object. The front-end will simply be
an interface for interacting with the state machine object.

Another benefit of this approach is that you have flexible choice for how you'll
implement the game's front-end. Maybe you find another way to use the HTML5 Canvas APIs? Maybe you want to use the built-in HTML elements. You could even try creating
the front-end with WebGL or a game engine. After this tutorial, you will be free
to explore these various options!

Now, let's get started!

## Prerequisites

You'll need the following to be able to complete this tutorial:

1. A text editor (I recommend using Visual Studio Code if you're unsure) -
   This is where you'll be writing your code.
2. A Web Browser with access to developer tools - We'll be interacting with the browser console throughout the tutorial, especially at the start since the game
   won't have a front-end around this point
3. A HTTP Server (I recommend using the
   [Live Server Visual Studio Code extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)). This is required because we'll be using
   [ECMAScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) without any JavaScript build tools. Attempting to try this without a HTTP
   server will result in a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) error.

Note: I strongly recommend using a HTTP Server with live reload support. You'll have peace of mind
knowing that you don't have to refresh your browser and possibly clear your cache to see the latest
changes that you've made!

## Setup

First, create a directory where you'll write the code the game. I suggest naming
it "four-in-a-row".

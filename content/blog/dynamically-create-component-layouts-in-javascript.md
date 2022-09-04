+++
title = "Dynamically creating component layouts in JavaScript"
date = 2021-07-30T23:38:00Z  
description="No frameworks required! 😲"
+++

## One function in a new file is all you need
Check this out!

```js
// BlockListItem.js

/// HTML Output
///<li class="block-list-item" data-controller="block-list-item" data-block-list-item-url-value="{{url}}">
// <span>{{url}}</span>
// <button class="primary" data-action="block-list-item#delete">Remove</button>
// </li>
export function create(url) {
    let urlSpan = document.createElement("span");
    urlSpan.textContent = url;

    let removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.classList.add("primary");
    removeButton.setAttribute("data-action", "block-list-item#delete");

    let blockListItem = document.createElement('li');
    blockListItem.classList.add("block-list-item");
    blockListItem.setAttribute("data-controller", "block-list-item");
    blockListItem.setAttribute("data-block-list-item-url-value", url);

    blockListItem.appendChild(urlSpan);
    blockListItem.appendChild(removeButton);

    return blockListItem;
}

```

...and just like that, you have a component layout that can be reused across multiple vanilla JS code files!

## Reusing the layout across different JavaScript files.

In another JavaScript file, you could can use this component layout like this:
```js
import * as BlockListItemElement from "./BlockListItem.js";

// Somewhere down in the code, we'll create the HTML layout for the component:
let url = "https://www.instagram.com";
let blockListItem = BlockListItemElement.create(url);
```


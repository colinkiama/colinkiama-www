+++
title = "My experience with Zola - The static site generator"
date = 2022-02-10
description = "Speed 🤝 Simplicity"
+++

## Introduction 

Around the time this article was written, this website was generated using Zola - a super-fast, modern static-site generator written in [Rust](https://www.rust-lang.org/)!

## Why is Zola used for this website?

My requirements were:

- Speed - I need the site to be generated as fast as possible
- Frictionless setup - I just want something that is simple to download install. I don’t want to deal with potentially complex prerequisites

Zola fits my requirements the best. [It’s typically distributed as a executable binary file](https://www.getzola.org/documentation/getting-started/installation/). The program several MBs large which is awesome considering everything it does.

In November 2020, when I was deciding which static-site generator to use, the alternatives were mostly [Node.js](https://nodejs.org/en/)-based programs (and still are  [https://jamstack.org/generators/](https://jamstack.org/generators/) 😆).

So, while these generators provide so many useful, cool features, the issues are that:

- They require Node.js on the machine that generates the site.
- NPM package dependencies! I’ve seen the `node_modules` folder can grow over 100x the size of the Zola itself.
- Slower to generate the site than Zola.

I also checked out [Hugo](https://gohugo.io/) and [Jekyll](https://jekyllrb.com/) but I didn’t like the templating syntax of Hugo and Jekyll requires you to set up Ruby as a prerequisite.

## Tradeoffs

Here are tradeoffs based on the way I use Zola for this website:

### Advantages:

- It’s (really really) fast. Written in Rust. 
- [Compiles Sass for you](https://www.getzola.org/documentation/content/sass/)
- [Decent templating syntax](https://tera.netlify.app/)
- [Image resizing at build-time](https://www.getzola.org/documentation/content/image-processing/)
- [Search](https://www.getzola.org/documentation/content/search/)
- [Multilingual Site Support](https://www.getzola.org/documentation/content/multilingual/)
- [Shortcodes](https://www.getzola.org/documentation/content/shortcodes/)
- [Generates RSS feeds](https://www.getzola.org/documentation/templates/feeds/)
- [Live reloads when serving the site locally](https://www.getzola.org/documentation/getting-started/cli-usage/#serve)

### Disadvantages:
- Still maturing. There may be some features not available on here. You can help out here though: [https://github.com/getzola/zola](https://github.com/getzola/zola)
- Tooling around it isn’t as mature as other static-site generators.

## Conclusion

For my needs, no other static-site generator comes close.

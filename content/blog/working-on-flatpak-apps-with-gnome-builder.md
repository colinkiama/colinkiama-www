+++
title = "Working on Vala Flatpak apps with Gnome Builder"
date = 2022-10-01 
description = "There are a few key differences to be aware of."
draft = true
+++

## Looks familiar in the beginning


Make sure to include the following Vala Freedesktop SDK extension to your project's flatpak manifest, in order for Vala Language Server to work in Builder:

```json
"sdk-extensions" : [
        "org.freedesktop.Sdk.Extension.vala"
],
```

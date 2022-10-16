+++
title = "Working on Vala Flatpak apps with Gnome Builder"
date = 2022-10-01 
description = "There are a few key differences to be aware of."
draft = true
+++

## Looks familiar in the beginning

The code you actually write will use the same tools you usaully use (meson, CMAKE, valac etc.)

## Flatpak + Builder Differences

### 1. You may need to clean before you rebuild when you make changes to your code.

One some Flatpak projects oepned with GNOME Builder, some builds will refuse to work if you don' clean the project before building it again.

### 2. A freedesktop SDK extension is needed to make Vala Language Server work

Make sure to include the following Vala Freedesktop SDK extension to your project's flatpak manifest, in order for Vala Language Server to work in Builder:

```json
"sdk-extensions" : [
        "org.freedesktop.Sdk.Extension.vala"
],
```

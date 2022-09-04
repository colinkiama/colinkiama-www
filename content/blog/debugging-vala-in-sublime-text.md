+++
title = "Get started with debugging Vala programs in Sublime Text"
date = 2021-08-23T10:51:00Z  
description="Achieving IDE-level debugging for Vala in Sublime Text"
+++

## Prerequisites
This tutorial assumes that you have a Vala program setup with Meson Build project structure. 

Vala is pretty underrated programming language in my opinion (but I'll probably get into that in another post). Find out more about it here: [https://wiki.gnome.org/Projects/Vala](https://wiki.gnome.org/Projects/Vala)

Find out more about meson here: [https://mesonbuild.com](https://mesonbuild.com)

## Step 1

Install the Sublime Debugger package: [https://packagecontrol.io/packages/Debugger](https://packagecontrol.io/packages/Debugger)

## Step 2

Install the LLDB adapter for it: Debugger > Install Adapters

## Step 3

Build your program if you haven't already. In the code's root directory, run this command:
```sh
meson build && ninja -C build
```
_Note: Meson Debug Build. The setup command use the 'debug' build flag by default. It also inserts debug build flag arguments too like `-g`._

## Step 4

Ensure that you've opened a sublime text project. If not, create one. It's necessary for the debugger to work. You can do so by selecting: Project > Save Project As..

Save the project file to the root directory of your code.

## Step 5

Add debugger configuration project settings

You can also add debugger configuration templates in Debugger > Add or Select Configuration then select the type of configuration you want to add. For this project, we'll pick `lldb`.

At the time of writing this, these were the following options:

- LLDB: Launch
- LLDB: Attach by PID
- LLDB: Attach by Name
- LLDB: Custom Launch
- LLDB: Debug Cargo Output
- LLDB: Debug Cargo Tests

For this project , we'll pick `LLDB: Launch`.

Now the project configuration file should open up with the configuration template added.

Customise the `debugger_configurations` field so that it looks something like this:

```json

    "debugger_configurations":
    [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Launch (LLDB)",
            "program": "${workspaceFolder}/build/<your_program_name_here>",
            "args": [""],
            "cwd": "${workspaceFolder}",
            "terminal": "console"
        },
    ]
```

## Step 6

Start debugging.
Select: Debugger > Open, to reveal the debugger's UI. You'll be able to press the play button to get started. 

You can place breakpoints by clicking left of line numbers in the editor.

In the Debugger UI, the down arrow is for stepping over and the left and right arrows are for stepping out and in your code respectively.

This is just a small taste of what the debugger pakcage offers. You can find out more about it in the project's readme: [https://github.com/daveleroy/sublime_debugger](https://github.com/daveleroy/sublime_debugger)

Happy debugging!







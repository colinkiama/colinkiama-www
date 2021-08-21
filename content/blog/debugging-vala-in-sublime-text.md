+++
title = "Debugging Vala programs in Sublime Text"
date = 2021-08-21T11:36:00Z  
description="Using Sublime Debugger package, we can have IDE-level debugging for Vala on Sublime Text!"
+++


## Step 1

Install Sublime Debugger

## Step 2

Use the lldb configuration they have provided

## Step 3

WIth the args field in the debugger configuration, include the `-g` flag to include Vala line number information. You might also need to add `--save-temps` too to keep around the temporary C source files: [https://wiki.gnome.org/Projects/Vala/Tutorial#Debugging](https://wiki.gnome.org/Projects/Vala/Tutorial#Debugging)

## Step 4

Start debugging! 😉
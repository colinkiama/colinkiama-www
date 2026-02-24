+++
title = "Get started with debugging Vala programs in Sublime Text"
date = 2021-08-23T10:51:00Z
updated = 2026-02-23T23:00:00Z
description="Achieving IDE-level debugging for Vala in Sublime Text"
+++


**February 2026 Update!** 

Now includes gdb adapter instructions and additional configuration fields for a better debugging experience!

---

## Prerequisites

This tutorial assumes that you have a Vala program set up with Meson Build project structure. 

Vala is a pretty underrated programming language in my opinion (but I'll probably get into that in another post). Find out more about it here: [https://vala.dev](https://vala.dev)

Find out more about meson here: [https://mesonbuild.com](https://mesonbuild.com)

## Step 1

Install the Sublime Debugger package: [https://packagecontrol.io/packages/Debugger](https://packagecontrol.io/packages/Debugger)

## Step 2

So depending on which compiler was used to compile the program, you need to use the correct debugger adapter for the best debugging experience. Otherwise, you'll experience issues
like not being able to view variable values correctly.

### GDB Debugger Adapter Instructions

If your Vala project is being compiled with a GNU compiler, install the GDB adapter for the Sublime Debugger package: `Debugger: Install Adapters`

The GDB Adapter is "Native Debug" (code-debug) by WebFreak001: [https://github.com/WebFreak001/code-debug](https://github.com/WebFreak001/code-debug)

#### Node.js requirement

This adapter does require Node.js to be installed to work. If you have problems with Sublime Text detecting Node.js in your PATH environment variable, you can adjust the Sublime Debugger package settings and set the path to `node` binary manually.

To do this:

Open the Sublime Debugger settings: `Preferences: Debugger Settings`

Then you can set the path to `node` like this:

```json
{
    "node": "/path/to/node"
}
```

### LLDB Debugger Adapter Instructions 

If your Vala project is being compiled with an LLVM/Clang compiler, install the LLDB adapter for the Sublime Debugger package: `Debugger: Install Adapters`.

The LLDB adapter is "codelldb" by vadimcn: [https://github.com/vadimcn/codelldb](https://github.com/vadimcn/codelldb)

## Step 3

Build your program if you haven't already. You can run this command from the project root directory to set up a build directory in `build/` then compile the program in the `build/` directory:

```sh
meson setup build && meson compile -C build
```
_Note: Meson Debug Build. The setup command uses the 'debug' build flag by default. It also inserts debug build flag arguments like `-g`._

## Step 4

Ensure that you've opened a Sublime Text project. If not, create one. It's necessary for the debugger to work. You can do so by selecting: Project > Save Project As..

Save the project file to the root directory of your code.

## Step 5

Add debugger configuration project settings.

You can do this manually in the Sublime Text project file (`project-name.sublime-project`), however, in this blog post we'll be using one of the
debugger configuration templates via `Debugger: Add Configuration`.

Based on the debugger adapter you want to use, there are differences to the way the debugger configurations are structured

### GDB Instructions

Next, select `gdb` from the list.

At the time of writing this blog post, these are the following options:

- GDB: Launch Program
- GDB: Launch Attach to PID
- GDB: Connect to gdbserver
- GDB: Launch over SSH
- GDB: Launch GUI over SSH with X11 forwarding
- GDB: Debug external embedded device

Pick `GDB: Launch Program`.

Now the project configuration file should open up with the configuration template added. 
Customise the `debugger_configurations` field so that it looks something like this:

```json
    "debugger_configurations": [
        {
            "name": "Launch",
            "type": "gdb",
            "request": "launch",
            "target": "<relative_path_to_compiled_program_binary_from_cwd>",
            "cwd": "<current_working_directory_of_compiled_binary_program_to_run_in>",
            "env": {
                "G_MESSAGES_DEBUG": "all"
            },
            "valuesFormatting": "prettyPrinters"
        }
    ]
```

Here's a real life example:

```json
    "debugger_configurations": [
        {
            "name": "Launch",
            "type": "gdb",
            "request": "launch",
            "target": "./valdo-plus",
            "cwd": "${folder}/build/src",
            "valuesFormatting": "prettyPrinters",
            "env": {
                "G_MESSAGES_DEBUG": "all"
            }
        }
    ]   
```

`cwd` refers to the current working directory that the program will run in.

Notice that `target` (the compiled program binary to run) is a relative path from the value of `cwd`.

Also `${folder}` refers to the root folder of the project.

For more information about the configuration attributes, visit the Native Debug project website: https://github.com/WebFreak001/code-debug


### LLDB Instructions

Next, select `lldb` from the list.

At the time of writing this blog post, these are the following options:

- CodeLLDB: Launch
- CodeLLDB: Attach by PID
- CodeLLDB: Attach by Name
- CodeLLDB: Custom Launch
- CodeLLDB: Debug Cargo Output
- CodeLLDB: Debug Cargo Tests

Pick `CodeLLDB: Launch`.

Now the project configuration file should open up with the configuration template added.

Customise the `debugger_configurations` field so that it looks something like this:

```json
    "debugger_configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Launch",
            "program": "<path_to_compiled_program_binary>",
            "terminal": "console",
            "cwd": "<current_working_directory_of_compiled_binary_program_to_run_in>",
            "env": {
                "G_MESSAGES_DEBUG": "all"
            }
        }
    ]
```

Here's a real life example:

```json
    "debugger_configurations": [
        {
            "type": "lldb",
            "request": "launch",
            "name": "Launch",
            "program": "${folder}/build/src/valdo-plus",
            "terminal": "console",
            "cwd": "${folder}/build/src",
            "env": {
                "G_MESSAGES_DEBUG": "all"
            }
        }
    ]
```

`cwd` refers to the current working directory that the program will run in.

Notice that `program` is a path to the compiled program binary to run.

Also `${folder}` refers to the root folder of the project.


For more information about the configuration attributes, visit the CodeLLDB project website: https://github.com/vadimcn/codelldb

### Environment Variables For a Better Debugging Experience

Take note that in the debugger configuration examples above, the environment variables are being set via the `env` field. `G_MESSAGES_DEBUG=all` is being set so that the Vala program can output debug log messages.

## Step 6

Start debugging.

Select `Debugger: Open` to reveal the debugger's UI. You'll be able to press the play button to get started. 

You can place breakpoints by clicking left of line numbers in the editor.

In the Debugger UI, the down arrow is for stepping over and the left and right arrows are for stepping out and into your code respectively.

This is just a small taste of what the debugger package offers. You can find out more about it in the project's readme: [https://github.com/daveleroy/sublime_debugger](https://github.com/daveleroy/sublime_debugger)

Happy debugging!

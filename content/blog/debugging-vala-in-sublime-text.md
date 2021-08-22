+++
title = "Debugging Vala programs in Sublime Text"
date = 2021-08-21T11:36:00Z  
description="Using Sublime Debugger package, we can have IDE-level debugging for Vala on Sublime Text!"
+++

## Step 1

Install Sublime Debugger

## Step 2

Install the lldb adapter for it: Debugger > Install Adapters

## Step 3 (Optional)

Set up build system. This one assumes that your project using meson.

Tools > Build System > New Build System.

Debug build command:

```json
{
    "shell_cmd": "meson build && ninja -C build",
    "working_dir": "${project_path}",
}
```
Note: Meson Debug Build. The setup command use the 'debug' build flag by default. It also inserts debug build flag args too like `-g`.

## Step 4

Ensure that you've opened a sublime text project. If not, create one. It's necessary for the debugger to work.

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
            "cwd": "${workspaceFolder}"
        },
    ]
```

## Step 6

Start debugging! 😉
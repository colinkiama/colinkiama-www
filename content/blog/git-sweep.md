+++
title = "Git Sweep Alias - Deleting stale local remote-tracking branches"
date = 2022-02-17
description = "Git cleaner repositories with one simple alias 😉"
+++

I never remember the command for cleaning my remote branches so I decided to create an alias for them.

## The alias

```sh
git sweep
```

This is a shortcut for the [git fetch --prune](https://git-scm.com/docs/git-fetch#Documentation/git-fetch.txt---prune) command and a script that finds branches marked as `gone` then deletes all of them. There's more detail about the process here: [https://www.erikschierboom.com/2020/02/17/cleaning-up-local-git-branches-deleted-on-a-remote/](https://www.erikschierboom.com/2020/02/17/cleaning-up-local-git-branches-deleted-on-a-remote/)

## Setting the alias

You can use set them using the [git config command](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) or [edit the git config file directly](https://git-scm.com/docs/git-config#FILES). 

Here's the command to set the alias with the `git config` command:

```sh
git config --global alias.sweep "! git fetch -p && git for-each-ref --format '%(refname:short) %(upstream:track)' | awk '\$2 == \"[gone]\" {print \$1}' | xargs -r git branch -D"
```

Here's what the config file should look like the aliases added:

```ini
...
[alias]
...
        sweep = ! "git fetch -p && git for-each-ref --format '%(refname:short) %(upstream:track)' | awk '$2 == \"[gone]\" {print $1}' | xargs -r git branch -D"
...
```

## Special Thanks
Thank you [Erik Schierboom](https://www.erikschierboom.com) for providing the solution. Hopefully this gets added directly into git one day. This alias is super useful for maintaining your repositories.

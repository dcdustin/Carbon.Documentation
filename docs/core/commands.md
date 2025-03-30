#commands
![Static Badge](https://img.shields.io/badge/Auth_Level-2-red)
![Static Badge](https://img.shields.io/badge/Auth_Level-0-green)

### Title <Badge type="info" text="default" />
### Title <Badge type="tip" text="^1.9.0" />
### Title <Badge type="warning" text="beta" />
### Title <Badge type="danger" text="caution" />

### c.client.editor.addon_live_update <Badge type="danger" text="Auth 2" />
- Carbon Editor requested RCon command for loading an addon.

### c.find <Badge type="danger" text="Auth 2" />
- Searches through Carbon-processed console commands.

### c.findchat <Badge type="danger" text="Auth 2" />
- Searches through Carbon-processed chat commands.

### c.addconditional <Badge type="danger" text="Auth 2" />
- Adds a new conditional compilation symbol to the compiler.

### c.remconditional <Badge type="danger" text="Auth 2" />
- Removes an existent conditional compilation symbol from the compiler.

### c.conditionals <Badge type="danger" text="Auth 2" />
- Prints a list of all conditional compilation symbols used by the compiler.

### c.client.loadconfig <Badge type="danger" text="Auth 2" />
- Loads Carbon Client config from file.

### c.client.saveconfig <Badge type="danger" text="Auth 2" />
- Saves Carbon Client config to file.

### c.client.addons <Badge type="danger" text="Auth 2" />
- Prints a list of the currently available addons.

### c.client.stats <Badge type="danger" text="Auth 2" />
- Prints a list of useful statistic information of Carbon Client performance.

### c.client.addons_reinstall <Badge type="danger" text="Auth 2" />
- Unloads all currently loaded addons then reloads them relative to the config changes. (Options: async [bool|true])

### c.client.addons_uninstall <Badge type="danger" text="Auth 2" />
- Unloads all currently loaded addons then reloads them relative to the config changes.

### c.editconfig <Badge type="danger" text="Auth 2" />
- When ran by an admin client, the Carbon Admin module will open up a config editor.

### c.loadconfig <Badge type="danger" text="Auth 2" />
- Loads Carbon config from file.

### c.saveconfig <Badge type="danger" text="Auth 2" />
- Saves Carbon config to file.

### c.assignalias <Badge type="danger" text="Auth 2" />
- Assigns a new command alias. (Eg. ### c.assignalias myalias ### c.reload)

### c.unassignalias <Badge type="danger" text="Auth 2" />
- Unassigns a command alias. (Eg. ### c.unassignalias myalias)

### c.aliases <Badge type="danger" text="Auth 2" />
- Prints the full list of aliases and respective redirected commands.

### c.changeversion <Badge type="danger" text="Auth 2" />
- It changes the current Carbon version you're running. Next reboot will swap to the overriden version. Run ### c.changeversion for syntax.

### c.wipeui <Badge type="danger" text="Auth 2" />
- Clears the entire CUI containers and their elements from the caller's client.

### c.resethooks <Badge type="danger" text="Auth 2" />
- Clears all progress on all of the current hooks (hook time, fires, memory usage, exceptions and lag spikes).

### c.devdump <Badge type="danger" text="Auth 2" />
- Creates a zip package in the temporary directory of the Carbon folder with useful information (output log & profile snapshot). Syntax: ### c.devdump [logfile] [duration]

### c.shutdown <Badge type="danger" text="Auth 2" />
- Completely unloads Carbon from the game, rendering it fully vanilla. WARNING: This is for testing purposes only.

### c.help <Badge type="danger" text="Auth 2" />
- Returns a brief introduction to Carbon.

### c.version <Badge type="danger" text="Auth 2" />
- Version information of the Carbon build and Rust.

### c.build 
- Information about the currently running Carbon build.

### c.protocol 
- Protocol information used by the hook system of the Carbon build.

### c.commit 
- Information about the Git commit of this build.

### c.whymodded 
- Prints an intricate list of all the reasons why the server is set to modded and solutions to fix it.

### c.gocommunity 
- Executes a variety of changes necessary to set the server viable for the Community section. Run '### c.whymodded' to see what will be changed.

### c.extensions 
- Prints a list of all currently loaded extensions.

### c.hooks 
- Prints total information for all currently active and patched hooks in the server. (syntax: ### c.hooks [loaded] [-p|-s|-d])

### c.hookinfo 
- Prints advanced information about a specific hook (takes [uint|string]). From hooks, hook times, hook memory usage to plugin and modules using it and other things.

### c.debughook 
- Enables debugging on a specific hook, which logs each time it fires. This can affect server performance, depending on how ofter the hook is firing.

### c.debugallhooks 
- Enables debugging on all hooks and future hooks that will be processed (defaults debugging enabled on hooks).

### c.firehook 
- For debugging purposes, it executes a hook manually. If the hook have arguments, it'll most likely throw plugin/module errors, but we probably want those.

### c.wipemarkers 
- Removes all markers of the calling player or argument filter.

### c.setmodule 
- Enables or disables Carbon modules. Visit root/carbon/modules and use the config file names as IDs.

### c.savemodules 
- Saves the configs and data files of all available modules.

### c.savemodule 
- Saves Carbon module config & data file.

### c.loadmodules 
- Loads the configs and data files of all available modules.

### c.loadmodule 
- Loads Carbon module config & data file.

### c.modules 
- Prints a list of all available modules. Eg. ### c.modules [-abc|--json|-t|-m|-f] [-asc]

### c.moduleinfo 
- Prints advanced information about a currently loaded module. From hooks, hook times, hook memory usage and other things.

### c.reloadmodules 
- Fully reloads all modules.

### c.reloadmodule 
- Reloads a currently loaded module assembly entirely.

### c.openplugin 
- Locally opens the cs file of a loaded plugin.

### c.openroot 
- Locally opens the root folder of Carbon.

### c.openconfigs 
- Locally opens the configs folder of Carbon.

### c.openmodules 
- Locally opens the modules folder of Carbon.

### c.opendata 
- Locally opens the data folder of Carbon.

### c.openplugins 
- Locally opens the plugins folder of Carbon.

### c.openextensions 
- Locally opens the extensions folder of Carbon.

### c.openlogs 
- Locally opens the logs folder of Carbon.

### c.openlang 
- Locally opens the language folder of Carbon.

### c.delete 
- Locally deletes a file or directory relative to the server root. Syntax: ### c.deleteext "path/to"

### c.deleteext 
- Locally deletes all files with a specified extension relative to the server root. Syntax: ### c.deleteext "path/to" "cs"

### c.createplugin 
- It creates a new plugin in the plugins folder. Syntax: ### c.createplugin "PluginName" "Author" "Description"

### c.grant 
- Grant one or more permissions to users or groups. Do '### c.grant' for syntax info.

### c.revoke 
- Revoke one or more permissions from users or groups. Do '### c.revoke' for syntax info.

### c.show 
- Displays information about a specific player or group (incl. permissions, groups and user list). Do '### c.show' for syntax info.

### c.usergroup 
- Adds or removes a player from a group. Do '### c.usergroup' for syntax info.

### c.group 
- Adds or removes a group. Do '### c.group' for syntax info.

### c.plugins 
- Prints the list of mods and their loaded plugins. Eg. ### c.plugins [-j|--j|-json|-abc|--json|-t|-m|-f|-ls] [-asc]

### c.reload 
- Reloads all or specific mods / plugins. E.g '### c.reload * <except[]>' to reload everything, '### c.reload PluginA [PluginB..]' to reload multiple..

### c.load 
- Loads all mods and/or plugins. E.g '### c.load * <except[]>' to load everything, '### c.load PluginA [PluginB..]' to load multiple.

### c.unload 
- Unloads all mods and/or plugins. E.g '### c.unload * <except[]>' to unload everything, '### c.unload PluginA [PluginB..]' to unload multiple. They'll be marked as 'ignored'.

### c.plugininfo 
- Prints advanced information about a currently loaded plugin. From hooks, hook times, hook memory usage and other things.

### c.plugincmds 
- Prints a full list of chat and console commands for a specific plugin.

### c.reloadconfig 
- Reloads a plugin's config file. This might have unexpected results, use cautiously.

### c.pluginintgen 
- Generates the internal hook call override in 'carbon/plugins/debug'.

### c.uninstallplugin 
- Unloads and uninstalls (moves the file to the backup folder) the plugin with the name.

### c.installplugin 
- Looks up the backups directory and moves the plugin back in the plugins folder installing it with the name.

### c.profile 
- Toggles recording status of the Carbon native Mono-profiling. Syntax: ### c.profile [duration] [-cm] [-am] [-t] [-c] [-gc]

### c.profileabort 
- Aborts recording of the Carbon native Mono-profiling if it was recording.

### c.profiler.print 
- If any parsed data available, it'll print basic and advanced information. (-c=CSV, -j=JSON, -t=Table, -p=ProtoBuf [default])

### c.profiler.tracks 
- All tracking lists present in the config which are used by the Mono profiler for tracking.

### c.profiler.track 
- Adds an object to be tracked. Reloading the plugin will start tracking. Restarting required for assemblies, modules and extensions.

### c.profiler.untrack 
- Removes a plugin from being tracked. Reloading the plugin will remove it from being tracked. Restarting required for assemblies, modules and extensions.

### c.test_beds 
- Prints all currently queued up tests ready to be executed.

### c.test_run 
- Executes all Test Beds that are currently queued up.

### c.test_clear 
- Clears all Test Beds that are currently queued up.
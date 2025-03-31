# ConVars

### c.isforcemodded  
- Is the server forcefully set to modded due to options affecting significant gameplay changes in Carbon Auto?

### c.ovenblacklist  
- Blacklisted oven entity prefabs.

### c.notechtreeunlock  
- Players will no longer be able to progress on any tech trees.

### c.nogivenotices  
- Will prohibit 'gave' messages to be printed to chat when admins give items.

### c.custommapname  
- The map name displayed in the Rust server browser. Shouldn't be longer than 64 characters.

### c.client.enabled   
- Enable this if the server is Carbon client-enabled server. [Only applies on server restart]

### c.developermode  
- Enables developer mode which grants a few features that are designed and used by the developers.

### c.modding  
- Mark this server as modded or not.

### c.scriptwatchers  
- When disabled, you must load/unload plugins manually with ### c.load or ### c.unload.

### c.scriptwatchersoption  
- Indicates wether the script watcher (whenever enabled) listens to the 'carbon/plugins' folder only, or its subfolders. (0 = Top-only directories, 1 = All directories)

### c.modulewatchers  
- When disabled, modules only get loaded when the server boots.

### c.extensionwatchers  
- When disabled, extensions only get loaded when the server boots.

### c.debug  
- The level of debug logging for Carbon. Helpful for very detailed logs in case things break. (Set it to -1 to disable debug logging.)

### c.logfiletype  
- The mode for writing the log to file. (0=disabled, 1=saves updates every 5 seconds, 2=saves immediately)

### c.language  
- Server language used by the Language API.

### c.unloadonfailure  
- Unload already loaded plugins when recompilation attempt fails. (Disabled by default)

### c.bypassadmincooldowns  
- Bypasses the command cooldowns for admin-authed players.

### c.logsplitsize  
- The size for each log (in megabytes) required for it to be split into separate chunks.

### c.scriptprocessrate  
- The speed of detecting local file changes for items in the carbon/plugins directory.

### c.zipscriptprocessrate  
- The speed of detecting local file changes for zipscript items in the carbon/plugins directory.

### c.consoleinfo  
- Show the Windows-only Carbon information at the bottom of the console.

### c.scriptdebugorigin  
- [For debugging purposes] Overrides the script directory to this value so remote debugging is possible.

### c.hooklsthreshold  
- The threshold value used by the hook caller to determine what minimum time is considered as a server lag spike. Defaults to 1000ms.

### c.lang  
- Current server language for Carbon and plugins loaded.

### c.default_player_group  
- The default group for any player with the regular authority level they get assigned to.

### c.default_admin_group  
- The default group players with auth-level 2 get assigned to.

### c.default_mod_group  
- The default group players with auth-level 1 get assigned to.

### c.autogrant_player_group  
- Carbon should automatically grant (newer) players the default player group to them.

### c.autogrant_admin_group  
- Carbon should automatically grant (auth level 2) players the default admin group to them.

### c.autogrant_mod_group  
- Carbon should automatically grant (auth level 1) players the default moderator group to them.

### c.profilestatus  
- Mono profiling status.

### c.profiler.recwarns  
- It should or should not print a reminding warning every 5 minutes when profiling for an un-set amount of time.

### c.recycletickmultiplier  
- Configures the recycling ticks multiplier base speed relative.

### c.safezonerecycletickmultiplier  
- Configures the SafeZone recycling ticks multiplier base speed relative.

### c.researchdurationmultiplier  
- The duration multiplier of blueprint researching finalization time.

### c.vendingbuydurationmultiplier  
- The duration multiplier of transaction delay when buying from vending machines.

### c.craftingspeedmultiplier_nowb  
- The time multiplier of crafting items without a workbench.

### c.craftingspeedmultiplier_wb1  
- The time multiplier of crafting items at workbench level 1.

### c.craftingspeedmultiplier_wb2  
- The time multiplier of crafting items at workbench level 2.

### c.craftingspeedmultiplier_wb3  
- The time multiplier of crafting items at workbench level 3.

### c.mixingspeedmultiplier  
- The speed multiplier of mixing table crafts.

### c.exacavatorresourcetickratemultiplier  
- Excavator resource tick multiplier rate.

### c.excavatortimeforfullresourcesmultiplier  
- Excavator time multiplier for processing full resources.

### c.excavatorbeltspeedmaxmultiplier  
- Excavator belt maximum speed multiplier.

### c.ovenspeedmultiplier  
- The burning speed multiplier of ovens.

### c.ovenblacklistspeedmultiplier  
- The burning speed multiplier of blacklisted ovens.

### c.oventemperaturemultiplier  
- The burning temperature multiplier of ovens.

### c.ovenblacklisttemperaturemultiplier  
- The burning temperature multiplier of blacklisted ovens.

### c.defaultserverchatname  
- Default server chat name.

### c.defaultserverchatcolor  
- Default server chat message name color.

### c.defaultserverchatid  
- Default server chat icon SteamID.
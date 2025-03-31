# ⚙️ Configuring Carbon

## Switches

### `-carbon.rootdir`
- Overrides the root directory of Carbon, aka the "carbon" folder. Upon changing this, you must also apply another command line variable which links to the custom Carbon root, Carbon.Preloader.dll;\
`--doorstop-target-assembly "customrootdir/managed/Carbon.Preloader.dll"`

### `-carbon.scriptdir`
- Overrides the scripts directory of Carbon, aka the "carbon/plugins" folder.

### `-carbon.configdir`
- Overrides the config directory of Carbon, aka the "carbon/configs" folder.

### `-carbon.datadir`
- Overrides the data directory of Carbon, aka the "carbon/data" folder.

### `-carbon.langdir`
- Overrides the lang directory of Carbon, aka the "carbon/lang" folder.

### `-carbon.logdir`
- Overrides the log directory of Carbon, aka the "carbon/logs" folder.

### `-carbon.moduledir`
- Overrides the modules directory of Carbon, aka the "carbon/modules" folder.

### `-carbon.extdir`
- Overrides the extensions directory of Carbon, aka the "carbon/extensions" folder.

### `+carbon.onboot`
- A set of commands separated by "|" that get executed when Carbon boots. Can be defined in "cfg/server.cfg" as well.

### `+carbon.onserverinit`
- A set of commands separated by "|" that get executed when the server is fully initialized and ready to be connected to. Can be defined in "cfg/server.cfg" as well.

##
## Config

### **ScriptDebuggingOrigin**
- It's a local path which when is not set, it'll use the Carbon plugins folder as origin. Setting the value will override the compiler file path origin to this one. This is ideal for remotely debugging a plugin.

### **ScriptWatchers**
- Watches the carbon/plugins folder for `*.cs` files, and loads/unloads files that are created/removed from the folder automatically (when enabled).

### **ZipScriptWatchers**
- Watches the carbon/plugins folder for `*.cszip` archive files, and loads/unloads files that are created/removed from the folder automatically (when enabled).

### **ScriptWatcherOption**
- It can be either 0 (which is Top Directory Only) or 1 (which is All Directories - Carbon folders such as `backup`, `debug`, are blacklisted).

### **FileNameCheck**
- Checks for file names. Otherwise will load the plugins regardless. Recommended to be enabled.

### **IsModded**
- Marks the server as "modded" in the Steam server metadata (when enabled).

### **PlayerDefaultGroup**
- The default group for any player with the regular authority level they get assigned to.

### **AdminDefaultGroup**
- The default group players with the admin flag get assigned to.

### **LogFileMode**
- Is a value 0 to 2, which changes the way Carbon logs are stored/processed. 0 means disabled, 1 saves updates every 5 seconds, 2 saves logs immediately after being printed in console.

### **LogVerbosity**
- We rank our logs and debugging logs from 0 (default) up to 10. The higher the verbosity, the more detailed debugging logs will be printed, regarding internal processing and other useful for debugging things.

### **BypassAdminCooldowns**
- Once enabled, commands with the \[Cooldown] attribute, will not cooldown high auth level players from executing them.&#x20;

### **PluginTrackingTime**
- The value in seconds of how long the period of tracking average hook time and hook memory usage.

### **LogSplitSize**
- The size in megabytes of the log file being split in multiple chunks, to save local space.

### **CommandPrefixes**
- A list of prefixes that are used when players attempt to execute a chat command.

### **UnityStackTrace**
- Enables a big chunk of detail of Unity's default stacktrace. Recommended to be disabled as a lot of it is internal and unnecessary for the average user.

### **ConditionalCompilationSymbols**
- It's a string array which the compiler uses to compile code with. Best use scenario is having plugins that are supposed to have chunks of code that get compiled only when CCS exist in the list.

### **LogSeverity**
- Defaults to Notice. It's a filter (minimum value) of what logs can be printed. Can be 0 - 3. 0 is Error, 1 is Warning, 2 is Notice (regular logs) and 3 is Debug, which is super detailed.

### **PermissionSerialization**
- Defaults to Protobuf. 0 is Protobuf, 1 is for SQL. We'll soon implement it so you may serialize the permissions and user database (oxide.groups.data, oxide.users.data) into SQL databases.

### **Language**
- Is the default server language. Defaults to "en".

### **WebRequestIp**
- The IP webrequest calls use when making http calls.

### **oCommandChecks**
- Prints a reminding warning if RCON/console attempts at calling an o.\* command.

### **ShowConsoleInfo**
- (Windows-only) will show the strip of info on the console, example:\
`Carbon v2023.02.23.1153-Debug-develop-b3ab790, 3 mods, 24 plgs`
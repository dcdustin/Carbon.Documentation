---
title: Configuring Carbon
description: A detailed documentation about Carbon's configuration file and explaining what everything does.
slug: configuring-carbon
---

# ⚙️ Configuring Carbon
Carbon comes with an extensive list of configurable properties. Keep reading to learn more.



## Default Config
Here's the full default config out of the box.
```json:line-numbers
{
  "DeveloperMode": false,
  "IsModded": true,
  "Prefixes": [
    {
      "Value": "/",
      "PrintToChat": false,
      "PrintToConsole": false,
      "SuggestionAuthLevel": 2
    }
  ],
  "Aliases": {
    "carbon": "c.version"
  },
  "Rcon": true,
  "Language": "en",
  "WebRequestIp": null,
  "Watchers": {
    "ScriptWatchers": true,
    "ZipScriptWatchers": true,
    "ScriptWatcherOption": 0,
    "ModuleWatchers": true,
    "ExtensionWatchers": true
  },
  "Permissions": {
    "PlayerDefaultGroup": "default",
    "AdminDefaultGroup": "admin",
    "ModeratorDefaultGroup": "moderator",
    "AutoGrantPlayerGroup": true,
    "AutoGrantAdminGroup": true,
    "AutoGrantModeratorGroup": true,
    "BypassAdminCooldowns": false,
    "PermissionSerialization": 0
  },
  "Analytics": {
    "Enabled": true
  },
  "SelfUpdating": {
    "Enabled": true,
    "HookUpdates": true
  },
  "Debugging": {
    "ScriptDebuggingOrigin": "",
    "HookLagSpikeThreshold": 1000
  },
  "Processors": {
    "ScriptProcessingRate": 0.2,
    "ZipScriptProcessingRate": 0.5
  },
  "Publicizer": {
    "PublicizedAssemblies": [
      "Assembly-CSharp.dll",
      "Facepunch.Console.dll",
      "Facepunch.Network.dll",
      "Facepunch.Nexus.dll",
      "Facepunch.Ping.dll",
      "Facepunch.Unity.dll",
      "Rust.Clans.Local.dll",
      "Rust.FileSystem.dll",
      "Rust.Harmony.dll",
      "Rust.Global.dll",
      "Rust.Data.dll"
    ],
    "PublicizerMemberIgnores": [
      "^HiddenValueBase$",
      "^HiddenValue`1$",
      "^Pool$"
    ]
  },
  "Logging": {
    "LogSplitSize": 2.5,
    "LogSeverity": 2,
    "LogFileMode": 2,
    "LogVerbosity": 0,
    "CommandSuggestions": true
  },
  "Profiler": {
    "RecordingWarnings": true
  },
  "Compiler": {
    "UnloadOnFailure": false,
    "ConditionalCompilationSymbols": [
      "CARBON",
      "RUST",
      "OXIDE_PUBLICIZED"
    ]
  },
  "Misc": {
    "ShowConsoleInfo": true
  }
}
```
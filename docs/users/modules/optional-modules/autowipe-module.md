# AutoWipe Module

The AutoWipe Module is an **optional Carbon module** that automates scheduled map and full wipes for your Rust server using a configurable wipe list and cron expressions. It can trigger commands and delete files after each wipe.

> **Note:** This module is **not enabled by default**. It must be explicitly enabled in the server configuration or Carbon module settings.


## Overview
- **Class Name:** `AutoWipeModule`
- **Enabled by default:** No
- **Supports Configuration:** Yes
- **Source:** [AutoWipeModule](https://github.com/CarbonCommunity/Carbon.Modules/tree/develop/src/AutoWipeModule)
- **Forces Modded Tag:** No

AutoWipe lets you schedule wipes using cron syntax, execute commands or delete files/folders after wiping, and even randomize maps from a pool.


## Configuration
The configuration is stored in the `AutoWipeConfig` class and includes the following:

```json
{
  "WipeChatCommand": "nextwipe",
  "FullWipe": {
    "PostWipeCommands": ["oxide.reload MyPlugin"],
    "PostWipeDeletes": ["oxide/data/myfile.json"]
  },
  "MapWipe": {
    "PostWipeCommands": [],
    "PostWipeDeletes": []
  },
  "Maps": [
    { "Url": "https://example.com/my-map.map", "Temp": false }
  ],
  "AvailableWipes": [
    {
      "WipeName": "Biweekly Full Wipe",
      "MapBrowserName": "MyMap",
      "MapUrl": "POOL",
      "MapSize": 4000,
      "ServerSeed": 12345,
      "Cron": "0 18 */14 * *",
      "Temp": false,
      "Type (0=fullwipe 1=mapwipe)": 0,
      "Commands": ["say Full wipe incoming!", "server.save"]
    }
  ]
}
```

- **WipeChatCommand**: Optional. Adds a chat command to display next scheduled wipe.
- **FullWipe / MapWipe**: Command and file delete hooks after each wipe.
- **Maps**: Pool of reusable maps. If `MapUrl` is set to `POOL`, one of these is randomly used.
- **AvailableWipes**: List of scheduled wipes with cron expressions.


## Commands

### Chat Command
```csharp
nextwipe
```
Displays time until next wipe (configured via `WipeChatCommand`).

### Console Commands
- `autowipe.wipes` – Lists all configured wipes
- `autowipe.add` – Adds a new wipe entry
- `autowipe.delete` – Deletes a wipe
- `autowipe.maps` – Lists map URLs from the pool
- `autowipe.addmap` – Adds a new map to the pool
- `autowipe.deletemap` – Deletes a map URL from the pool
- `autowipe.wipechat` – Sets the chat command name


## How It Works
- Every 30 seconds, the module checks if a wipe is due via cron.
- Once a wipe runs, there is a 1 hour cooldown before another wipe can happen.
- When a wipe matches:
  - Runs any `Commands` listed in the wipe entry
  - Runs configured `PostWipeCommands`
  - Deletes files/folders in `PostWipeDeletes`
  - Updates the current wipe state and resets timers

Maps can be randomly pulled from the map pool using `"MapUrl": "POOL"`.

---

This module is ideal for server operators looking to fully automate wipe logic and maintenance tasks without manual intervention.
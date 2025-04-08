# AutoWipe Module
The Carbon autowipe module allows you to schedule wipes using cron, pick from a list of maps, pick between a full or map wipe, and much more.


## Module information

Here's an up to date description about all of the config values, what they mean and how they're used.


### Full & Map Wipe Configs

Config definitions for a full wipe type and a map wipe. These events happen after a new server start where a new wipe is detected.

### Maps

It's a list of map URLs. If marked as temporary, when they're picked from the list, they will get removed. Basically a one-time map pick.

### Wipes

The base definition of a wipe.&#x20;

* **WipeName** - An unused value and its sole purpose is to identify the wipes in the config.&#x20;
* **Commands** - A list of commands which execute after the server was initialized, ideally used to let players know that a new wipe is available before restarting.
* **MapBrowserName** - The custom name of your map which shows up in the server browser. Keep empty for default behavior.
* **MapUrl** - The wipe's map URL. Keep empty for procedural mode (map size and seed are used), set it with a custom map URL or name it "POOL" if you want for a random map from the MapPool to be used for said wipe.
* **MapSize** - Only used when MapUrl is empty/not set, when procedural mode is activated.
* **ServerSeed** - Only used when MapUrl is empty/not set, when procedural mode is activated.
* **WipeType** - The wipe type which can be 0 (full wipe) or 1 (map wipe). Depending on this, when wipes happen, events defined in the previous Full & Map Wipe configs will happen.
* **Temp** - Once true, the wipe configuration that got picked as the new wipe will be removed from the list - it's a one-time wipe.
* **Cron** - The Cron expression of when the Wipe configuration should be applied. If this condition is met, all Commands defined in this wipe, will be ran while the server is running. Do the announcements and restarts there. Next boot will apply this wipe configuration accordingly.

## Commands

They're minimal and straightforward to quickly configure the module. Otherwise update the config directly in `carbon/modules/AutoWipe/config.json` then run `c.reloadmodule AutoWipe`.

* `autowipe.wipes`: **Prints all available wipes present in the Wipes config property.**
* `autowipe.delete`: **Deletes an existent wipe present in the Wipes config property.**
* `autowipe.add`: **Adds a new wipe to the list.**
* `autowipe.maps`: **Prints all available map urls present in the MapPool config property.**
* `autowipe.deletemap`: **Deletes an existent map url present in the MapPool config property.**
* `autowipe.addmap`: **Adds a new map url to the list. (Syntax eg. autowipe.addmap "MapUrl")**

## Configuration
```json
{
  "Enabled": true,
  "Config": {
    "FullWipe": {
      "PostWipeCommands": [
        "echo Woop woop! Full wipe."
      ],
      "PostWipeDeletes": null
    },
    "MapWipe": {
      "PostWipeCommands": [
        "echo Woop woop! Map wipe."
      ],
      "PostWipeDeletes": null
    },
    "MapPool": [
      "https://..map1.map",
      "https://..map2.map"
    ],
    "AvailableWipes": [
      {
        "WipeName": "Wipe1",
        "Commands": [
          "restart 10 gamers, we gone, Wipe1 is happening!",
          "echo ay carumba"
        ],
        "MapBrowserName": "",
        "MapUrl": "",
        "MapSize": 1000,
        "ServerSeed": 69,
        "Cron": "15 * * * *",
        "Temp": false,
        "Type (0=fullwipe 1=mapwipe)": 0
      },
      {
        "WipeName": "Wipe2",
        "Commands": [
	  "echo zoinks!",
          "restart 10"
        ],
        "MapBrowserName": "",
        "MapUrl": "",
        "MapSize": 1000,
        "ServerSeed": 0,
        "Cron": "30 * * * *",
        "Temp": true,
        "Type (0=fullwipe 1=mapwipe)": 0
      }
    ]
  },
  "Version": "1013077839"
}
```
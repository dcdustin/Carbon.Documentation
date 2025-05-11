---
title: Modifiers
description: Carbon modifiers are plugin developer directed modifiers designed to enhance plugin designing experience by adding new field members in Rust classes and more.
---

# Modifiers
Carbon modifiers are JSON plugin developer directed modifiers designed to enhance plugin designing experience by adding new field members in Rust classes and more.

> A restart is necessary for the modifiers to apply (of course).

:::tip DIRECTORY
All Carbon modifier files go inside the `carbon/modifiers` folder by default, it being changeable with `-carbon.modifierdir` command-line.
:::

## Example
As stated previously, Carbon modifiers are in the format of JSON files, designed to be easily managed and shipped with plugins.

:::tabs

===carbon/modifiers/MyPlugin.json
```json:line-numbers
[
  {
    "Assembly": "Assembly-CSharp",
    "Name": "BasePlayer",
    "Fields": [
      {
        "Name": "IsSkibidi",
        "Type": "System.Boolean",
        "DefaultValue": true
      },
	  {
        "Name": "DuckCounter",
        "Type": "System.Int32",
        "DefaultValue": 0,
        "IsStatic": true
      },
      {
        "Name": "Tags",
        "Type": "System.Collections.Generic.List`1[System.String]"
      }
    ]
  }
]
```
:::

Then you can use it in your plugin(s) like this.
```csharp:line-numbers
namespace Carbon.Plugins;

[Info("MyPlugin", "dev101", "1.0")]
public class MyPlugin : CarbonPlugin
{
	private void OnServerInitialized()
	{
        foreach(var player in BasePlayer.allPlayerList)
        {
            player.Tags ??= new();
            Puts($"{player} {(player.IsSkibidi ? "is" : "isn't")} skibidi.");
            BasePlayer.DuckCounter++;
        }

		Puts($"Counted {BasePlayer.DuckCounter:n0} ducks.");
	}
}
```
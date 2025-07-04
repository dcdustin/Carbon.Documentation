---
title: Configuration Management
description: Learn to create, save, load, and update Rust plugin config files using C# classes for Oxide and Carbon!
header: https://files.facepunch.com/paddy/20250221/hopper_01.jpg
date: 2025-07-04T01:04:36.171Z
tags:
    - tutorial
    - configuration
    - management
layout: news-layout
sidebar: false
fmContentType: blogpost
category: tutorials
published: false
author: Bubbafett5611
hidden: false
logo: /news/config-manage.webp
---

<NewsSectionTitle text="Introduction" author="bubbafett5611"/>
<NewsSection>

If you ever want to add a configurable option to your plugin, it might be tempting to simply define a field at the top of your code and call it done. However, if you plan to share your plugin publicly or expect others to modify its settings, it's best to use a configuration file instead.

In this article, we will cover how to create, save, load, and update configuration files!

</NewsSection>

<NewsSectionSubtitle text="What are Configuration Files?"/>
<NewsSection>

Configuration files for Carbon and Oxide are saved in JSON format at `carbon/configs/plugin_name.json` or `oxide/config/plugin_name.json`. These files allow server owners to customize plugin behavior by adjusting various settings specific to each plugin.

**Example Config:**
```json
// Config of the WhiteList Module from Carbon
{
  "Enabled": false,
  "Config": {
    "BypassPermission": "whitelist.bypass",
    "BypassGroup": "whitelisted"
  },
  "Version": "781308331"
}
```

</NewsSection>

<NewsSectionSubtitle text="Creating your Class!"/>
<NewsSection>

Let’s say we want to create a plugin that sends a message when a player with a specific permission connects, but we also want the server owner to be able to configure that permission. That’s easy to do!

First, we need to create a configuration class inside our plugin. I like to keep this organized by placing it inside a `#region`, which helps separate it from the rest of the code.

```cs:line-numbers {3}
#region Config

    public class Configuration { }

#endregion
```

Next, we'll add our first property to the class. I usually start with a version number. This is easily done using the `VersionNumber` struct from `Oxide.Core`. We’ll also use `[JsonProperty()]` to control how the field appears in the JSON file, specifically setting `PropertyName = "string"` and ordering it last using `Order = int.MaxValue`.

```cs:line-numbers {8,9}
using Oxide.Core;

#region Config

    public class Configuration
    {
        // Version numbers follow this format: Major.Minor.Patch
        [JsonProperty(PropertyName = "Version (DO NOT CHANGE)", Order = int.MaxValue)]
        public VersionNumber Version = new(1, 0, 0);
    }

#endregion
```

The **version number** will be useful later if we add new options after the plugin has been released publicly or deployed on a server. It allows us to safely update the configuration file as needed without breaking compatibility.

Now, let's add the permission string we'll check for when a player connects. We'll do that by adding a new property to our **Configuration** class:

```cs:line-numbers {10,11}
using Oxide.Core;

#region Config

    public class Configuration
    {
        [JsonProperty(PropertyName = "Version (DO NOT CHANGE)", Order = int.MaxValue)]
        public VersionNumber Version = new(1, 0, 0);

        [JsonProperty(PropertyName = "Permission")]
        public string UsePermission = "CoolPlugin.use";
    }

#endregion
```

This gives server owners the flexibility to change the required permission via the configuration file, without modifying the plugin code directly.

Next, we will create a public instance of the `Configuration` class:

```cs:line-numbers {5}
using Oxide.Core;

#region Config

    public Configuration PluginConfig;

    public class Configuration
    {
        [JsonProperty(PropertyName = "Version (DO NOT CHANGE)", Order = int.MaxValue)]
        public VersionNumber Version = new(1, 0, 0);

        [JsonProperty(PropertyName = "Permission")]
        public string UsePermission = "CoolPlugin.use";
    }

#endregion
```
We create this instance so that we can **store and access** the loaded configuration data within our plugin. When the plugin is loaded, we’ll read the configuration file from disk and assign its values to this `PluginConfig` object. This way, any part of our plugin can reference `PluginConfig.UsePermission` (or other future options) without needing to parse the file every time.

</NewsSection>

<NewsSectionSubtitle text="Config File Management"/>
<NewsSection>

The first thing you’ll want to do when managing your config file is ensure that a new one is created if none exists. This is especially important when your plugin is first loaded or if the config has been deleted or corrupted. To handle this, we override the `LoadDefaultConfig()` method. This method is called automatically by the plugin system when a config file is missing. In our implementation, we simply return a new instance of the `Configuration` class using a lambda expression.

Next, we need to make sure the configuration can be saved whenever it changes, whether those changes come from the plugin or from server owners. We do this by overriding the `SaveConfig()` method. This method uses the `Config` object (a `DynamicConfigFile` provided by the base plugin class) and calls `WriteObject()` to serialize our `PluginConfig` instance into a readable JSON format.

We use lambda expressions for both methods to keep things concise and maintainable, but the logic behind them is essential for robust configuration handling.

After that, we override the `LoadConfig()` method. In this override, we first call `base.LoadConfig()` to ensure the base functionality is executed. Then we set our public instance of the configuration class by calling `Config.ReadObject<Configuration>()`. If the result is `null`, we create a new config using our class and save it immediately. This guarantees that the plugin always has a valid configuration available.

```cs:line-numbers {16,18,20-30}
using Oxide.Core;

#region Config

    public Configuration PluginConfig;

    public class Configuration
    {
        [JsonProperty(PropertyName = "Version (DO NOT CHANGE)", Order = int.MaxValue)]
        public VersionNumber Version = new(1, 0, 0);

        [JsonProperty(PropertyName = "Permission")]
        public string UsePermission = "CoolPlugin.use";
    }

    protected override void LoadDefaultConfig() => new Configuration();

    protected override void SaveConfig() => Config.WriteObject(PluginConfig, true);

    protected override void LoadConfig()
    {
        base.LoadConfig();
        PluginConfig = Config.ReadObject<Configuration>();
        if (PluginConfig == null)
        {
            PluginConfig = new Configuration();
            SaveConfig();
            return;
        }
    }
```
And that's it! You now have a fully functional configuration system. But how do you actually use it? How do you safely read values from the config, and what happens if you add new options to the configuration file later?

Let’s walk through how to read from your config and add values later when the plugin updates!

</NewsSection>
<NewsSectionSubtitle text="Reading the Config"/>
<NewsSection>

Let’s start by listening to the `Init()` hook, which runs when the plugin is initialized. In this method, we’ll register the permission defined in the config so it can be used elsewhere in the plugin. To keep things organized, we’ll wrap this logic in a `#region` called **Hooks**.

We reference the configuration by accessing the public `Configuration` instance we created earlier, `PluginConfig`, and using its `UsePermission` property.

```cs:line-numbers {3-6}
#region Hooks

    private void Init()
    {
        permission.RegisterPermission(PluginConfig.UsePermission, this);
    }

#endregion
```

Next, we’ll listen for when a player connects using the `OnPlayerConnected()` hook. If the player has the required permission, we’ll send a message to everyone in chat welcoming them to the server.

We do this by calling `permission.UserHasPermission()` inside an `if` statement, and broadcasting the appropriate message using `server.Broadcast()`.

```cs:line-numbers {8-18}
#region Hooks

    private void Init()
    {
        permission.RegisterPermission(PluginConfig.UsePermission, this);
    }

    private void OnPlayerConnected(BasePlayer player)
    {
        if (permission.UserHasPermission(player.UserIDString, PluginConfig.UsePermission))
        {
            server.Broadcast("Someone has connected with the Cool Plugin features enabled!");
        }
        else
        {
            server.Broadcast("Someone has connected without the Cool Plugin features enabled.");
        }
    }

#endregion
```

</NewsSection>
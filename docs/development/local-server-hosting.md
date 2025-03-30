# 🖥 Local Server Hosting

  This is a guide on how to get started with the Carbon.QuickStart repository on
  running a local server (for development purposes).

## Repository

Go to the [**Carbon.QuickStart**](https://github.com/CarbonCommunity/Carbon.QuickStart/tree/main/win) repository, and download the Windows (`win`) files and place them in a brand new folder in your computer.



## Download

Run any of the `update_*.bat` files representing different Rust &/or Carbon branches, which will start doing the following:

1. Downloads & updates `steamcmd` (under the `<root>/steam` folder).
2. Downloads the select Carbon branch build (under the `<root>/server/carbon` folder).
3. Downloads the Rust dedicated server (under the `<root>/server` folder).

:::tip
It's all handled by the batch file and no additional work is required!
:::

## 🎯 Debugger (Optional)

To enable the debugger, which is explained in the **Debugging Plugins** section, open the `<root>/doorstop_config.ini` and change the following values:

```ini
[UnityMono]
debug_enabled=true
debug_suspend=true
debug_address=127.0.0.1:5337
```

:::warning IMPORTANT!

Whenever you run the `update_*.bat` file, it's going to override the `<root>/doorstop_config.ini` due to the default settings, so keep in mind.
:::

## Run

Open it up in a text editor to read up or modify the default values (such as ports, folders, settings, etc.) on your liking. **To start up your server, all you need to do is to run the `run.bat` file.**
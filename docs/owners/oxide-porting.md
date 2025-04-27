---
title: Oxide Porting
description: An in-depth understanding of the necessary changes that are done when you're willing to transfer your Oxide server to Carbon.
---

# Oxide Porting

An in-depth understanding of the necessary changes that are done when you're willing to transfer your Oxide server to Carbon.

## Automatic Way
Carbon has a built-in process which detects an existent Oxide installation and upon clean Carbon install (patch unzipped in the server root directory), will appropriately move all extensions found in `RustDedicated_Data/Managed` previously used with Oxide, in Carbon's dedicated directory.

Carbon also copies all config, data, lang, user & group data files and migrates it all at launch of the server, after files have been validated with Steam, since they're still patched with Oxide.

Ensure you validate all server files before initially starting up the server with Carbon for a clean boot. If things don't update, delete `steamapps` directory from the root of the folder first.

## Manual Way
To understand changes necessary for handling things manually, follow the following instructions.

### Config Folder
The `<root>/oxide/config` folder **becomes `<root>/carbon/configs`**. This is because early in the development of Carbon, we've named it that way since it makes more sense.

### Extensions
The Oxide extensions, which in Oxide (for some reason) you place then in the brain folder of your Rust server, aka `RustDedicated_Data/Managed`, **in Carbon it goes in its own dedicated directory, namely `<root>/carbon/extensions`**. 

If you need help to identify what an Oxide extension looks like in your files, any file with `Oxide.Ext.*.dll` format would be found in the Managed folder of an Oxide server. 

### Oxide (o.*) Commands
They don't work, this is Carbon. It might be difficult to get used to it, but all our commands are prefixed with c.*. Although you may create aliases which reflect commands. 

Look for `alias` in the Commands page. [Read more here.](/references/commands)

## Full Successful Transfer
There's a requirement where you must delete all `Oxide.*.dll` from your `<root>/RustDedicated_Data/Managed` folder, as well as verifying and re-updating your Rust server so files like Assembly-CSharp.dll get redownloaded, since Oxide processes them.

Take all extensions out of your `<root>/RustDedicated_Data/Managed` directory, and putting them in the respective Carbon extensions folder, removing Managed folder altogether, then performing an update & validation with steamcmd. This ensures that your server is cleansed and vanilla.


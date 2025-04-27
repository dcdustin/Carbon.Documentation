---
title: Commands
description: The general use of commands and introduction to Carbon-only features that will benefit you.
---

# Commands

The general use of commands and introduction to Carbon-only features that will benefit you.

## Console commands

These commands can be executed from your RCon, Windows Console window or from the in-game F1 console.

```csharp
[ConsoleCommand("mycommand")]
private void MyCommand(ConsoleSystem.Arg arg)
{
    arg.ReplyWith("Just got called!");
}
```

Side note, using `arg.ReplyWith` will print a reply log from the place where it was called, for example calling `mycommand` from the client F1 console, it'll print that log only there.

## Chat commands
They can only be executed by clients.

```csharp
[ChatCommand("mycommand2")]
private void MyCommand2(BasePlayer player, string command, string[] args)
{
    player.ChatMessage("You've called this!");
}
```

## Universal commands
They're executable by both in-game client chat, F1 console and windows console (or RCon).

```csharp
[Command("myunicommand")]
private void MyUniversalCommand(BasePlayer player, string command, string[] args)
{
    Puts("Wee woo!");
}
```

Whenever the universal commands are called from the windows console or RCon, the player will always be null.

## Protected commands
This is a special type of command mainly used by Carbon CUI elements (eg. **ProtectedButton**, **ProtectedInputField**) which randomizes the command in a server-specific way to protect servers from players calling plugin commands that are meant to be called using the authority-based UIs and having the ability to do so if they own the said plugins, and know what the commands of the plugin are.

This can be used in many other ways, and it is highly recommended that ALL your plugins that have commands that aren't supposed to be manually called (in console/chat by players) should use this system.

```csharp
[ProtectedCommand("mydopecommand")]
private void SuperSecret(ConsoleSystem.Arg arg)
{
    Puts("How'd you do that!?");
}

private void OnServerInitialized()
{
    var callableCommand = Community.Protect("mydopecommand");
    Puts($"{callableCommand}"); 
    
    // Command that can be called by the clients:
    //     carbonprotecc_npomamd1mompd8d2
    
    ConsoleSystem.Run(ConsoleSystem.Option.Server, callableCommand);
}
```

## Authentication
This allows you to grant authentication levels to your commands, from auth level to permissions, groups, and command cooldowns. **All these authentication attributes work on any kinds of commands explained above.**

### Permission attribute (multiple allowed)
Will only allow players which are granted the permission(s) (or their groups) to execute the command.
```csharp
[ConsoleCommand("helloworld"), Permission("plugin.use")]
private void HelloWorld(ConsoleSystem.Arg arg) { }
```

### Group attribute (multiple allowed)
Will only allow players which are granted the groups(s) to execute the command.
```csharp
[ChatCommand("helloworld"), Group("admin"), Group("vip")]
private void HelloWorld(BasePlayer player, string command, string[] args) { }
```

### AuthLevel attribute
Will only allow players which minimally have the auth-level set to execute the command.

* **Level 0**: Standard players.
* **Level 1**: Moderator players.
* **Level 2**: Owner players.
* **Level 3**: Developer players.

```csharp
[ProtectedCommand("helloworld"), AuthLevel(2)]
private void HelloWorld(ConsoleSystem.Arg arg) { }
```

### Cooldown attribute
This will disallow players from executing a command too fast. It's relative to player calls, meaning others can call the command.

```csharp
[ChatCommand("helloworld"), Cooldown(5000)] // Cools down the command for 5 seconds.
private void HelloWorld(BasePlayer player, string command, string[] args) { }
```

### Multiple authentication levels
You may use one (like above) or multiple authentication levels, like the following example:

```csharp
// Players must have the 'plugin.use' permission, have assigned owner power and will only allow the command to be called every 10 seconds by the same player. 
[ChatCommand("helloworld"), Permission("plugin.use"), AuthLevel(2), Cooldown(10000)]
private void HelloWorld(BasePlayer player, string command, string[] args) { }
```
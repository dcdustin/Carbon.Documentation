---
title: Async Shutdown
description: Grants the ability for plugins to let the server know that it should wait for a bit for the plugin to properly shut down after a while.
---

# Async Shutdown

This is a **CarbonPlugin** specific feature, which allows developers to halt (in a non-laggy way) the server shutdown to complete processes that require more than one frame to complete.

## How It Works
:::danger NOTEWORTHY
This affects the process of the direct shutdown or queued restart of the server.
:::

This is the following source code, a virtual method that can be overridden in your plugin.

```csharp:line-numbers
public virtual async ValueTask OnAsyncServerShutdown()
{
    await Task.CompletedTask;
}
```

And this is an use example of how you can override and make the shutdown process wait until completion:

```csharp:line-numbers
public override async ValueTask OnAsyncServerShutdown()
{
	// Do stuff after 3 seconds.
	await AsyncEx.WaitForSeconds(3f);
	
	// Wait for a full web request call
	await webrequest.EnqueueAsync("https://google.com", null, (code, data) =>
	{
		if(code != 400)
		{
			return;
		}
		
		// Handle `data`
	}, this);
}
```
<Badge type="danger" text="Carbon Compatible"/>
# IServerAsyncShutdown
```csharp
[ClientVar]
[ServerVar]
public static void quit(ConsoleSystem.Arg args)
{
	if (args != null && args.HasArgs())
	{
		args.ReplyWith("Invalid quit command, quit only works if provided with no arguments.");
		return;
	}
	if (UnityEngine.Application.isEditor)
	{
		UnityEngine.Debug.LogWarning("Aborting quit because we're in the editor");
		return;
	}
	if (SingletonComponent<ServerMgr>.Instance != null)
	{
		SingletonComponent<ServerMgr>.Instance.Shutdown();
	}
	Rust.Application.isQuitting = true;
	Network.Net.sv?.Stop("quit");
	System.Diagnostics.Process.GetCurrentProcess().Kill();
	UnityEngine.Debug.Log("Quitting");
	Rust.Application.Quit();
}

```

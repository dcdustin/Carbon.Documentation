<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnServerShutdown
```csharp
public void Shutdown()
{
	BasePlayer[] array = System.Linq.Enumerable.ToArray(BasePlayer.activePlayerList);
	for (int i = 0; i < array.Length; i++)
	{
		array[i].Kick("Server Shutting Down");
	}
	ConsoleSystem.Run(ConsoleSystem.Option.Server, "server.save");
	ConsoleSystem.Run(ConsoleSystem.Option.Server, "server.writecfg");
}

```

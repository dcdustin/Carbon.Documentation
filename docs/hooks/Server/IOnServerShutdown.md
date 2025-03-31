<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnServerShutdown
Called when the server shutdown sequence starts (players are kicked and world is saved).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IOnServerShutdown()
{
	Puts("IOnServerShutdown has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerMgr]
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
:::

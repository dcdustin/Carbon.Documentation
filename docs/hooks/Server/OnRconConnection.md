# OnRconConnection
<Badge type="info" text="Server"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an RCON client connects to the server (remote console connection opened).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRconConnection(System.Net.IPAddress address)
{
	Puts("OnRconConnection has been fired!");
	return (object)default;
}
```
:::

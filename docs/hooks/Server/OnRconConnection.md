# OnRconConnection
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
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

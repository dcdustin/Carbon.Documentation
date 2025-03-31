# OnMixingTableToggle
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a Mixing Table is toggled (started or stopped mixing potions/teas).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnMixingTableToggle(MixingTable mixingTable, BasePlayer player)
{
	Puts("OnMixingTableToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ MixingTable]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void SVSwitch(BaseEntity.RPCMessage msg)
{
	bool flag = msg.read.Bit();
	if (flag != IsOn() && !(msg.player == null))
	{
		if (flag)
		{
			StartMixing(msg.player);
		}
		else
		{
			StopMixing();
		}
	}
}

```
:::

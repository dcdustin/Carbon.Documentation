# OnTrapArm
<Badge type="info" text="Traps"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTrapArm(BearTrap bearTrap, BasePlayer player)
{
	Puts("OnTrapArm has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BearTrap]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Arm(BaseEntity.RPCMessage rpc)
{
	if (!Armed())
	{
		Arm();
	}
}

```
:::

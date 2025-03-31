# OnTurretIdentifierSet
<Badge type="info" text="Turret"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTurretIdentifierSet(AutoTurret autoTurret, BasePlayer player, string local1)
{
	Puts("OnTurretIdentifierSet has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AutoTurret]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void Server_SetID(BaseEntity.RPCMessage msg)
{
	if (msg.player == null || !CanChangeID(msg.player))
	{
		return;
	}
	string text = msg.read.String();
	if (string.IsNullOrEmpty(text) || ComputerStation.IsValidIdentifier(text))
	{
		string text2 = msg.read.String();
		if (ComputerStation.IsValidIdentifier(text2) && text == GetIdentifier())
		{
			UnityEngine.Debug.Log("SetID success!");
			UpdateIdentifier(text2);
		}
	}
}

```
:::

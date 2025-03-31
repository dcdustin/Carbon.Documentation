# OnExcavatorSuppliesRequested
<Badge type="info" text="Electronic"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after the excavator’s supply drop request has been processed (the request has been handled and drop is on the way).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExcavatorSuppliesRequested(ExcavatorSignalComputer excavatorSignalComputer, BasePlayer player, BaseEntity local0)
{
	Puts("OnExcavatorSuppliesRequested has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ExcavatorSignalComputer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(5uL)]
public void RequestSupplies(BaseEntity.RPCMessage rpc)
{
	if (HasFlag(BaseEntity.Flags.Reserved7) && IsPowered() && chargePower >= chargeNeededForSupplies)
	{
		BaseEntity baseEntity = GameManager.server.CreateEntity(supplyPlanePrefab.resourcePath);
		if ((bool)baseEntity)
		{
			UnityEngine.Vector3 position = dropPoints[UnityEngine.Random.Range(0, dropPoints.Length)].position;
			UnityEngine.Vector3 vector = new UnityEngine.Vector3(UnityEngine.Random.Range(-3f, 3f), 0f, UnityEngine.Random.Range(-3f, 3f));
			baseEntity.SendMessage("InitDropPosition", position + vector, UnityEngine.SendMessageOptions.DontRequireReceiver);
			baseEntity.Spawn();
		}
		chargePower -= chargeNeededForSupplies;
		SetFlag(BaseEntity.Flags.Reserved7, b: false);
		SendNetworkUpdate();
	}
}

```
:::

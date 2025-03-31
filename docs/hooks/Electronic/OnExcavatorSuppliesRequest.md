# OnExcavatorSuppliesRequest
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player initiates a supply drop request at the excavator (presses the excavator’s supply drop button, before it's processed).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnExcavatorSuppliesRequest(ExcavatorSignalComputer excavatorSignalComputer, BasePlayer player)
{
	Puts("OnExcavatorSuppliesRequest has been fired!");
	return (object)default;
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

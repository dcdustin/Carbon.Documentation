<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExcavatorSuppliesRequest
```csharp
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

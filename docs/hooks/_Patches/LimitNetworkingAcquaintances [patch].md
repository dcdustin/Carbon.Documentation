<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# LimitNetworkingAcquaintances [patch]
```csharp
public void UpdateAcquaintancesFor(BasePlayer player, float deltaSeconds)
{
	RelationshipManager.PlayerRelationships playerRelationships = GetRelationships(player.userID);
	System.Collections.Generic.List<BasePlayer> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BasePlayer>>();
	BaseNetworkable.GetCloseConnections(player.transform.position, GetAcquaintanceMaxDist(), obj);
	foreach (BasePlayer item in obj)
	{
		if (item == player || item.isClient || !item.IsAlive() || item.IsSleeping())
		{
			continue;
		}
		RelationshipManager.PlayerRelationshipInfo relations = playerRelationships.GetRelations(item.userID);
		if (!(UnityEngine.Vector3.Distance(player.transform.position, item.transform.position) <= GetAcquaintanceMaxDist()))
		{
			continue;
		}
		relations.lastSeenTime = UnityEngine.Time.realtimeSinceStartup;
		if ((relations.type == RelationshipManager.RelationshipType.NONE || relations.type == RelationshipManager.RelationshipType.Acquaintance) && player.IsPlayerVisibleToUs(item, UnityEngine.Vector3.zero, 1218519041))
		{
			int num = UnityEngine.Mathf.CeilToInt(deltaSeconds);
			if (player.InSafeZone() || item.InSafeZone())
			{
				num = 0;
			}
			if (relations.type != RelationshipManager.RelationshipType.Acquaintance || (relations.weight < 60 && num > 0))
			{
				SetRelationship(player, item, RelationshipManager.RelationshipType.Acquaintance, num);
			}
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
}

```

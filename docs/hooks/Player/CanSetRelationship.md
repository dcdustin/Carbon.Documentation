<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanSetRelationship
```csharp
public void SetRelationship(BasePlayer player, BasePlayer otherPlayer, RelationshipManager.RelationshipType type, int weight = 1, bool sendImmediate = false)
{
	if (!contacts)
	{
		return;
	}
	ulong num = player.userID.Get();
	ulong num2 = otherPlayer.userID.Get();
	if (player == null || player == otherPlayer || player.IsNpc || (otherPlayer != null && otherPlayer.IsNpc))
	{
		return;
	}
	RelationshipManager.PlayerRelationships playerRelationships = GetRelationships(num);
	if (!CleanupOldContacts(playerRelationships, num))
	{
		CleanupOldContacts(playerRelationships, num, RelationshipManager.RelationshipType.Enemy);
	}
	RelationshipManager.PlayerRelationshipInfo relations = playerRelationships.GetRelations(num2);
	bool flag = false;
	if (relations.type != type)
	{
		flag = true;
		relations.weight = 0;
	}
	relations.type = type;
	relations.weight += weight;
	float num3 = UnityEngine.Time.realtimeSinceStartup - relations.lastMugshotTime;
	if (flag || relations.mugshotCrc == 0 || num3 >= mugshotUpdateInterval)
	{
		bool flag2 = otherPlayer.IsAlive();
		bool num4 = player.SecondsSinceAttacked > 10f && !player.IsAiming;
		float num5 = 100f;
		if (num4)
		{
			UnityEngine.Vector3 normalized = (otherPlayer.eyes.position - player.eyes.position).normalized;
			bool flag3 = UnityEngine.Vector3.Dot(player.eyes.HeadForward(), normalized) >= 0.6f;
			float num6 = UnityEngine.Vector3Ex.Distance2D(player.transform.position, otherPlayer.transform.position);
			if (flag2 && num6 < num5 && flag3)
			{
				ClientRPC(RpcTarget.Player("CLIENT_DoMugshot", player), num2);
				relations.lastMugshotTime = UnityEngine.Time.realtimeSinceStartup;
			}
		}
	}
	if (sendImmediate)
	{
		SendRelationshipsFor(player);
	}
	else
	{
		MarkRelationshipsDirtyFor(player);
	}
}

```

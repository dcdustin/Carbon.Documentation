<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSprayCreate
Called when a player creates a spray decal (graffiti) using the Spray Can.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSprayCreate()
{
	Puts("OnSprayCreate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ SprayCan]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void CreateSpray(BaseEntity.RPCMessage msg)
{
	if (IsBusy())
	{
		return;
	}
	ClientRPC(RpcTarget.NetworkGroup("Client_ChangeSprayColour"), -1);
	SetFlag(BaseEntity.Flags.Busy, b: true);
	Invoke(ClearBusy, SprayCooldown);
	UnityEngine.Vector3 vector = msg.read.Vector3();
	UnityEngine.Vector3 vector2 = msg.read.Vector3();
	UnityEngine.Vector3 point = msg.read.Vector3();
	int num = msg.read.Int32();
	if (!(UnityEngine.Vector3.Distance(vector, base.transform.position) > 4.5f))
	{
		UnityEngine.Quaternion rot = UnityEngine.Quaternion.LookRotation((new UnityEngine.Plane(vector2, vector).ClosestPointOnPlane(point) - vector).normalized, vector2);
		rot *= UnityEngine.Quaternion.Euler(0f, 0f, 90f);
		bool flag = false;
		if (msg.player.IsDeveloper)
		{
			flag = true;
		}
		if (num != 0 && !flag && !msg.player.blueprints.CheckSkinOwnership(num, msg.player.userID))
		{
			UnityEngine.Debug.Log($"SprayCan.ChangeItemSkin player does not have item :{num}:");
			return;
		}
		ulong num2 = ItemDefinition.FindSkin(SprayDecalItem.itemid, num);
		BaseEntity baseEntity = GameManager.server.CreateEntity(SprayDecalEntityRef.resourcePath, vector, rot);
		baseEntity.skinID = num2;
		baseEntity.OnDeployed(null, GetOwnerPlayer(), GetItem());
		baseEntity.Spawn();
		CheckAchievementPosition(vector);
		LoseCondition(ConditionLossPerSpray);
	}
}

```
:::

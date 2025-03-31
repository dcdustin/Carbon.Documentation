<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnExplosiveThrown
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void DoThrow(BaseEntity.RPCMessage msg)
{
	if (!HasItemAmount() || HasAttackCooldown())
	{
		return;
	}
	UnityEngine.Vector3 vector = msg.read.Vector3();
	UnityEngine.Vector3 normalized = msg.read.Vector3().normalized;
	float num = UnityEngine.Mathf.Clamp01(msg.read.Float());
	if (msg.player.isMounted || msg.player.HasParent())
	{
		vector = msg.player.eyes.position;
	}
	else if (!ValidateEyePos(msg.player, vector))
	{
		return;
	}
	if (!canThrowUnderwater && msg.player.IsHeadUnderwater())
	{
		return;
	}
	BaseEntity baseEntity = GameManager.server.CreateEntity(prefabToThrow.resourcePath, vector, UnityEngine.Quaternion.LookRotation((overrideAngle == UnityEngine.Vector3.zero) ? (-normalized) : overrideAngle));
	if (!(baseEntity == null))
	{
		Item ownerItem = GetOwnerItem();
		if (ownerItem != null && ownerItem.instanceData != null && ownerItem.HasFlag(Item.Flag.IsOn))
		{
			baseEntity.gameObject.SendMessage("SetFrequency", GetOwnerItem().instanceData.dataInt, UnityEngine.SendMessageOptions.DontRequireReceiver);
		}
		baseEntity.SetCreatorEntity(msg.player);
		baseEntity.skinID = skinID;
		baseEntity.SetVelocity(GetInheritedVelocity(msg.player, normalized) + normalized * maxThrowVelocity * num + msg.player.estimatedVelocity * 0.5f);
		if (tumbleVelocity > 0f)
		{
			baseEntity.SetAngularVelocity(new UnityEngine.Vector3(UnityEngine.Random.Range(-1f, 1f), UnityEngine.Random.Range(-1f, 1f), UnityEngine.Random.Range(-1f, 1f)) * tumbleVelocity);
		}
		baseEntity.Spawn();
		if (baseEntity is TimedExplosive timedExplosive)
		{
			ItemOwnershipShare itemOwnership = ownerItem.TakeOwnershipShare();
			timedExplosive.ItemOwnership = itemOwnership;
			timedExplosive.SetCreator(msg.player);
		}
		SetUpThrownWeapon(baseEntity);
		StartAttackCooldown(repeatDelay);
		UseItemAmount(1, reduceItemOwnership: false);
	}
}

```

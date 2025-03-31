# OnExplosiveDropped
<Badge type="info" text="Weapon"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player drops an explosive (instead of throwing it).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnExplosiveDropped()
{
	Puts("OnExplosiveDropped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ThrownWeapon]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void DoDrop(BaseEntity.RPCMessage msg)
{
	if (!HasItemAmount() || HasAttackCooldown() || (!canThrowUnderwater && msg.player.IsHeadUnderwater()))
	{
		return;
	}
	UnityEngine.Vector3 vector = msg.read.Vector3();
	UnityEngine.Vector3 normalized = msg.read.Vector3().normalized;
	if (msg.player.isMounted || msg.player.HasParent())
	{
		vector = msg.player.eyes.position;
	}
	else if (!ValidateEyePos(msg.player, vector))
	{
		return;
	}
	BaseEntity baseEntity = GameManager.server.CreateEntity(prefabToThrow.resourcePath, vector, UnityEngine.Quaternion.LookRotation(UnityEngine.Vector3.up));
	if (baseEntity == null)
	{
		return;
	}
	if (canStick && UnityEngine.Physics.SphereCast(new UnityEngine.Ray(vector, normalized), 0.05f, out var hitInfo, 1.5f, 1237003025))
	{
		UnityEngine.Vector3 point = hitInfo.point;
		UnityEngine.Vector3 normal = hitInfo.normal;
		BaseEntity entity = hitInfo.GetEntity();
		UnityEngine.Collider collider = hitInfo.collider;
		if ((bool)entity && entity is StabilityEntity && baseEntity is TimedExplosive)
		{
			entity = entity.ToServer<BaseEntity>();
			TimedExplosive timedExplosive = baseEntity as TimedExplosive;
			timedExplosive.onlyDamageParent = true;
			timedExplosive.DoStick(point, normal, entity, collider);
			Facepunch.Rust.Analytics.Azure.OnExplosiveLaunched(msg.player, timedExplosive);
		}
		else
		{
			baseEntity.SetVelocity(normalized);
		}
	}
	else
	{
		baseEntity.SetVelocity(normalized);
	}
	baseEntity.creatorEntity = msg.player;
	baseEntity.skinID = skinID;
	baseEntity.Spawn();
	SetUpThrownWeapon(baseEntity);
	StartAttackCooldown(repeatDelay);
	UseItemAmount(1);
}

```
:::

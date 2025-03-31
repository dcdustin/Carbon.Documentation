# CanCreateWorldProjectile
<Badge type="info" text="Weapon"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanCreateWorldProjectile(HitInfo info, ItemDefinition itemDef)
{
	Puts("CanCreateWorldProjectile has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual void CreateWorldProjectile(HitInfo info, ItemDefinition itemDef, ItemModProjectile itemMod, Projectile projectilePrefab, Item recycleItem)
{
	UnityEngine.Vector3 projectileVelocity = info.ProjectileVelocity;
	Item item = ((recycleItem != null) ? recycleItem : ItemManager.Create(itemDef, 1, 0uL));
	BaseEntity baseEntity = null;
	if (!info.DidHit)
	{
		baseEntity = item.CreateWorldObject(info.HitPositionWorld, UnityEngine.Quaternion.LookRotation(projectileVelocity.normalized));
		baseEntity.Kill(BaseNetworkable.DestroyMode.Gib);
		return;
	}
	if (projectilePrefab.breakProbability > 0f && UnityEngine.Random.value <= projectilePrefab.breakProbability)
	{
		baseEntity = item.CreateWorldObject(info.HitPositionWorld, UnityEngine.Quaternion.LookRotation(projectileVelocity.normalized));
		baseEntity.Kill(BaseNetworkable.DestroyMode.Gib);
		return;
	}
	if (projectilePrefab.conditionLoss > 0f)
	{
		item.LoseCondition(projectilePrefab.conditionLoss * 100f);
		if (item.isBroken)
		{
			baseEntity = item.CreateWorldObject(info.HitPositionWorld, UnityEngine.Quaternion.LookRotation(projectileVelocity.normalized));
			baseEntity.Kill(BaseNetworkable.DestroyMode.Gib);
			return;
		}
	}
	if (projectilePrefab.stickProbability > 0f && UnityEngine.Random.value <= projectilePrefab.stickProbability)
	{
		baseEntity = ((info.HitEntity == null) ? item.CreateWorldObject(info.HitPositionWorld, UnityEngine.Quaternion.LookRotation(projectileVelocity.normalized)) : ((info.HitBone != 0) ? item.CreateWorldObject(info.HitPositionLocal, UnityEngine.Quaternion.LookRotation(info.HitNormalLocal * -1f), info.HitEntity, info.HitBone) : item.CreateWorldObject(info.HitPositionLocal, UnityEngine.Quaternion.LookRotation(info.HitEntity.transform.InverseTransformDirection(projectileVelocity.normalized)), info.HitEntity)));
		DroppedItem droppedItem = baseEntity as DroppedItem;
		if (droppedItem != null)
		{
			droppedItem.StickIn();
		}
		else
		{
			baseEntity.GetComponent<UnityEngine.Rigidbody>().isKinematic = true;
		}
	}
	else
	{
		baseEntity = item.CreateWorldObject(info.HitPositionWorld, UnityEngine.Quaternion.LookRotation(projectileVelocity.normalized));
		UnityEngine.Rigidbody component = baseEntity.GetComponent<UnityEngine.Rigidbody>();
		component.AddForce(projectileVelocity.normalized * 200f);
		component.WakeUp();
	}
}

```
:::

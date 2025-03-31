# CanBeTargeted
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called to determine if an entity can be targeted by automated turrets or AI (e.g., auto turrets, helicopter).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanBeTargeted()
{
	Puts("CanBeTargeted has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ GunTrap]
public bool CheckTrigger()
{
	System.Collections.Generic.HashSet<BaseEntity> entityContents = trigger.entityContents;
	if (entityContents == null || entityContents.Count == 0)
	{
		return false;
	}
	if (!CanFire())
	{
		return false;
	}
	System.Collections.Generic.List<UnityEngine.RaycastHit> obj = Facepunch.Pool.Get<System.Collections.Generic.List<UnityEngine.RaycastHit>>();
	BuildingPrivlidge cachedTc = GetCachedTc();
	bool flag = false;
	foreach (BaseEntity item in entityContents)
	{
		BasePlayer component = item.GetComponent<BasePlayer>();
		if (component.IsSleeping() || !component.IsAlive() || (!(cachedTc == null) && cachedTc.IsAuthed(component)))
		{
			continue;
		}
		obj.Clear();
		GamePhysics.TraceAll(new UnityEngine.Ray(component.eyes.position, (GetEyePosition() - component.eyes.position).normalized), 0f, obj, 9f, 1218519297);
		for (int i = 0; i < obj.Count; i++)
		{
			BaseEntity entity = obj[i].GetEntity();
			if (entity != null && (entity == this || entity.EqualNetID(this)))
			{
				flag = true;
				break;
			}
			if (!(entity != null) || entity.ShouldBlockProjectiles())
			{
				break;
			}
		}
		if (flag)
		{
			break;
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	return flag;
}

```
:::

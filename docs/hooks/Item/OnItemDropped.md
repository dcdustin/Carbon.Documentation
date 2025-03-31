<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnItemDropped
```csharp
public BaseEntity Drop(UnityEngine.Vector3 vPos, UnityEngine.Vector3 vVelocity, UnityEngine.Quaternion rotation = default(UnityEngine.Quaternion))
{
	ulong droppedBy = GetRootContainer()?.playerOwner?.userID ?? ((EncryptedValue<ulong>)0uL);
	RemoveFromWorld();
	if (info.AlignWorldModelOnDrop)
	{
		rotation = UnityEngine.Quaternion.Euler(0f, UnityEngine.Quaternion.LookRotation(vVelocity.normalized, UnityEngine.Vector3.up).eulerAngles.y, 0f);
		rotation = UnityEngine.Quaternion.Euler(info.WorldModelDropOffset) * rotation;
	}
	BaseEntity baseEntity = null;
	if (vPos != UnityEngine.Vector3.zero && !info.HasFlag(ItemDefinition.Flag.NoDropping))
	{
		baseEntity = CreateWorldObject(vPos, rotation);
		if ((bool)baseEntity)
		{
			baseEntity.SetVelocity(vVelocity);
		}
		if (baseEntity is DroppedItem droppedItem)
		{
			droppedItem.DroppedBy = droppedBy;
			if (info.AdjustCenterOfMassOnDrop)
			{
				droppedItem.Rigidbody.centerOfMass = info.DropCenterOfMass;
			}
		}
	}
	else
	{
		Remove();
	}
	RemoveFromContainer();
	return baseEntity;
}

```

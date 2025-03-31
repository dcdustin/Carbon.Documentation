<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFrankensteinPetWake [FrankensteinTable]
```csharp
public void WakeFrankenstein(BasePlayer owner)
{
	if (!(owner == null) && CanStartCreating(owner))
	{
		waking = true;
		base.inventory.SetLocked(isLocked: true);
		SendNetworkUpdateImmediate();
		StartCoroutine(DelayWakeFrankenstein(owner));
		ClientRPC(RpcTarget.NetworkGroup("CL_WakeFrankenstein"));
	}
}

```

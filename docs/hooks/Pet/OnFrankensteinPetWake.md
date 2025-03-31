# OnFrankensteinPetWake
<Badge type="info" text="Pet"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a Frankenstein pet is being awakened at the Frankenstein table.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnFrankensteinPetWake(FrankensteinTable frankensteinTable, BasePlayer owner)
{
	Puts("OnFrankensteinPetWake has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ FrankensteinTable]
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
:::

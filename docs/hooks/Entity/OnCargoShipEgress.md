# OnCargoShipEgress
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when the Cargo Ship event ends and the ship departs the area (leaves the map).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCargoShipEgress(CargoShip cargoShip)
{
	Puts("OnCargoShipEgress has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CargoShip]
public void StartEgress()
{
	if (!isDoingHarborApproach && !egressing)
	{
		egressing = true;
		CancelInvoke(PlayHorn);
		radiation.SetActive(value: true);
		SetFlag(BaseEntity.Flags.Reserved8, b: true);
		InvokeRepeating(UpdateRadiation, 10f, 1f);
		Invoke(DelayedDestroy, 60f * egress_duration_minutes);
	}
}

```
:::

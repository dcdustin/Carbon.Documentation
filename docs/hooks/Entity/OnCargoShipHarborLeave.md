# OnCargoShipHarborLeave
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when the Cargo Ship leaves a harbor (after docking, resuming its journey).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCargoShipHarborLeave(CargoShip cargoShip)
{
	Puts("OnCargoShipHarborLeave has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ CargoShip]
public void LeaveHarbor()
{
	if (docking_debug)
	{
		UnityEngine.Debug.Log("Cargo is leaving harbor.");
	}
	PlayHorn();
	SetFlag(BaseEntity.Flags.Reserved1, b: false);
	SetFlag(BaseEntity.Flags.Reserved2, b: true);
	currentHarborApproachNode++;
}

```
:::

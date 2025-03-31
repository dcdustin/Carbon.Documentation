<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCargoShipHarborLeave
```csharp
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

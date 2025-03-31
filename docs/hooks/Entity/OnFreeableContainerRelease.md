<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFreeableContainerRelease
Called when a freeable loot container is triggered to release (e.g., a locked crate that will drop from its holder).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnFreeableContainerRelease()
{
	Puts("OnFreeableContainerRelease has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ FreeableLootContainer]
public void Release(BasePlayer ply)
{
	GetRB().isKinematic = false;
	buoyancy.enabled = true;
	buoyancy.buoyancyScale = 1f;
	SetFlag(BaseEntity.Flags.Reserved8, b: false);
	if (freedEffect.isValid)
	{
		Effect.server.Run(freedEffect.resourcePath, base.transform.position, UnityEngine.Vector3.up);
	}
	if (ply != null && !ply.IsNpc && ply.IsConnected && net != null)
	{
		ply.ProcessMissionEvent(BaseMission.MissionEventType.FREE_CRATE, net.ID, 1f);
		Facepunch.Rust.Analytics.Server.FreeUnderwaterCrate();
		Facepunch.Rust.Analytics.Azure.OnFreeUnderwaterCrate(ply, this);
	}
}

```
:::

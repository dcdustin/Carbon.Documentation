<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFreeableContainerRelease
```csharp
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

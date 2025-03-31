<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityKill
```csharp
public void Kill(BaseNetworkable.DestroyMode mode = BaseNetworkable.DestroyMode.None)
{
	if (IsDestroyed)
	{
		UnityEngine.Debug.LogWarning("Calling kill - but already IsDestroyed!? " + this);
		return;
	}
	Facepunch.Rust.Profiling.EntityProfiler.killed++;
	if (Facepunch.Rust.Profiling.EntityProfiler.mode >= 2)
	{
		Facepunch.Rust.Profiling.EntityProfiler.OnKilled(this);
	}
	base.gameObject.BroadcastOnParentDestroying();
	OnKilled();
	DoEntityDestroy();
	TerminateOnClient(mode);
	TerminateOnServer();
	EntityDestroy();
}

```

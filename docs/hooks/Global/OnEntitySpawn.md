<Badge type="danger" text="Carbon Compatible"/>
# OnEntitySpawn
```csharp
public virtual void Spawn()
{
	Facepunch.Rust.Profiling.EntityProfiler.spawned++;
	if (Facepunch.Rust.Profiling.EntityProfiler.mode >= 2)
	{
		Facepunch.Rust.Profiling.EntityProfiler.OnSpawned(this);
	}
	SpawnShared();
	if (net == null)
	{
		net = Network.Net.sv.CreateNetworkable();
	}
	creationFrame = UnityEngine.Time.frameCount;
	PreInitShared();
	InitShared();
	ServerInit();
	PostInitShared();
	UpdateNetworkGroup();
	ServerInitPostNetworkGroupAssign();
	isSpawned = true;
	SendNetworkUpdateImmediate(justCreated: true);
	Invoke(SendGlobalNetworkUpdate, 0f);
	if (Rust.Application.isLoading && !Rust.Application.isLoadingSave)
	{
		base.gameObject.SendOnSendNetworkUpdate(this as BaseEntity);
	}
}

```

# OnEntitySpawn
<Badge type="info" text="Global"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)
Called when an entity is spawned in the world.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntitySpawn(BaseNetworkable networkable)
{
	Puts("OnEntitySpawn has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
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
:::

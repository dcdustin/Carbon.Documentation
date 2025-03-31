# OnEntitySpawned
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a new entity is spawned in the world. Useful for initialization or tracking newly created entities.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnEntitySpawned(BaseNetworkable baseNetworkable)
{
	Puts("OnEntitySpawned has been fired!");
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

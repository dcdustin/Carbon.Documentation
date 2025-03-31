# OnEntityKill
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity is killed/destroyed (cleanup is initiated). Useful for handling removal logic.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityKill(BaseNetworkable baseNetworkable)
{
	Puts("OnEntityKill has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
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
:::

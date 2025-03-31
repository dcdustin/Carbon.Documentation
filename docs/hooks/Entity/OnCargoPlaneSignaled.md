# OnCargoPlaneSignaled
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a supply signal triggers a cargo plane to be called in (supply drop event starts).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCargoPlaneSignaled(BaseEntity local0, SupplySignal supplySignal)
{
	Puts("OnCargoPlaneSignaled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SupplySignal]
public override void Explode()
{
	BaseEntity baseEntity = GameManager.server.CreateEntity(EntityToCreate.resourcePath);
	if ((bool)baseEntity)
	{
		UnityEngine.Vector3 vector = new UnityEngine.Vector3(UnityEngine.Random.Range(-20f, 20f), 0f, UnityEngine.Random.Range(-20f, 20f));
		baseEntity.SendMessage("InitDropPosition", base.transform.position + vector, UnityEngine.SendMessageOptions.DontRequireReceiver);
		baseEntity.Spawn();
	}
	Invoke(FinishUp, 210f);
	SetFlag(BaseEntity.Flags.On, b: true);
	SendNetworkUpdateImmediate();
}

```
:::

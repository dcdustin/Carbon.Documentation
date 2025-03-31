# OnStashOcclude
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a stash that was visible becomes hidden again (occluded), for example after a player stops looking at it.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnStashOcclude(StashContainer stashContainer)
{
	Puts("OnStashOcclude has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ StashContainer]
public void DoOccludedCheck()
{
	if (UnityEngine.Physics.SphereCast(new UnityEngine.Ray(base.transform.position + UnityEngine.Vector3.up * 5f, UnityEngine.Vector3.down), 0.25f, 5f, 2097152))
	{
		DropItems();
		Kill();
	}
}

```
:::

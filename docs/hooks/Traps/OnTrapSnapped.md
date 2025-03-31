# OnTrapSnapped
<Badge type="info" text="Traps"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTrapSnapped(BaseTrapTrigger baseTrapTrigger)
{
	Puts("OnTrapSnapped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseTrapTrigger]
public override void OnObjectAdded(UnityEngine.GameObject obj, UnityEngine.Collider col)
{
	base.OnObjectAdded(obj, col);
	_trap.ObjectEntered(obj);
}

```
:::

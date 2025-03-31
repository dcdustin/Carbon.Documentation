# CanUseWires
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called to check if a player can modify or connect wires in the electrical system.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseWires()
{
	Puts("CanUseWires has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ WireTool]
public static bool CanPlayerUseWires(BasePlayer player, bool cached = false, float cacheDuration = 1f)
{
	if (player != null && player.IsInCreativeMode && ConVar.Creative.unlimitedIo)
	{
		return true;
	}
	if (!player.CanBuild(cached, cacheDuration))
	{
		return false;
	}
	System.Collections.Generic.List<UnityEngine.Collider> obj = Facepunch.Pool.Get<System.Collections.Generic.List<UnityEngine.Collider>>();
	GamePhysics.OverlapSphere(player.eyes.position, 0.1f, obj, 536870912, UnityEngine.QueryTriggerInteraction.Collide);
	bool result = true;
	foreach (UnityEngine.Collider item in obj)
	{
		if (!item.gameObject.CompareTag("IgnoreWireCheck"))
		{
			result = false;
			break;
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
	return result;
}

```
:::

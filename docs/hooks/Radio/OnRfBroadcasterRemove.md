# OnRfBroadcasterRemove
<Badge type="info" text="Radio"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an RF broadcaster is removed from a frequency (stops broadcasting).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRfBroadcasterRemove(IRFObject obj, int frequency)
{
	Puts("OnRfBroadcasterRemove has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ RFManager]
public static void RemoveBroadcaster(int frequency, IRFObject obj)
{
	frequency = ClampFrequency(frequency);
	System.Collections.Generic.HashSet<IRFObject> broadcasterSet = GetBroadcasterSet(frequency);
	if (broadcasterSet.RemoveWhere((IRFObject b) => b == null || !b.IsValidEntityReference()) > 0)
	{
		UnityEngine.Debug.LogWarning($"Found null entries in the RF broadcaster set for frequency {frequency}... cleaning up.");
	}
	if (broadcasterSet.Remove(obj) && broadcasterSet.Count == 0)
	{
		_isFrequencyBroadcasting[frequency] = false;
		UpdateListenersForFrequency(frequency, isBroadcasting: false);
	}
}

```
:::

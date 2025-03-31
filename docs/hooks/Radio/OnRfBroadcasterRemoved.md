# OnRfBroadcasterRemoved
<Badge type="info" text="Radio"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after an RF broadcaster has been removed from a frequency.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRfBroadcasterRemoved()
{
	Puts("OnRfBroadcasterRemoved has been fired!");
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

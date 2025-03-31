<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfBroadcasterRemove
```csharp
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

# OnRfListenerAdded
<Badge type="info" text="Radio"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after an RF listener has been added to a frequency.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRfListenerAdded(IRFObject obj, int frequency)
{
	Puts("OnRfListenerAdded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ RFManager]
public static void AddListener(int frequency, IRFObject obj)
{
	frequency = ClampFrequency(frequency);
	if (GetListenerSet(frequency).Add(obj))
	{
		bool value;
		bool on = _isFrequencyBroadcasting.TryGetValue(frequency, out value) && value;
		obj.RFSignalUpdate(on);
	}
}

```
:::

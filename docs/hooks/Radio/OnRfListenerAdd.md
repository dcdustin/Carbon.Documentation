# OnRfListenerAdd
<Badge type="info" text="Radio"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an RF listener (receiver device) is added on a frequency (turned on).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRfListenerAdd(IRFObject obj, int frequency)
{
	Puts("OnRfListenerAdd has been fired!");
	return (object)default;
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

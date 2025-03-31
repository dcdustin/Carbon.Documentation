<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfListenerAdded
Called after an RF listener has been added to a frequency.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRfListenerAdded()
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

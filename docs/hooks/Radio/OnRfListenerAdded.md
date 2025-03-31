<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfListenerAdded
```csharp
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

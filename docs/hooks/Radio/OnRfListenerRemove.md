<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfListenerRemove
```csharp
public static void RemoveListener(int frequency, IRFObject obj)
{
	frequency = ClampFrequency(frequency);
	if (GetListenerSet(frequency).Remove(obj))
	{
		obj.RFSignalUpdate(on: false);
	}
}

```

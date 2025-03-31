<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfListenerRemove
Called when an RF listener is removed from a frequency (turned off).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRfListenerRemove()
{
	Puts("OnRfListenerRemove has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ RFManager]
public static void RemoveListener(int frequency, IRFObject obj)
{
	frequency = ClampFrequency(frequency);
	if (GetListenerSet(frequency).Remove(obj))
	{
		obj.RFSignalUpdate(on: false);
	}
}

```
:::

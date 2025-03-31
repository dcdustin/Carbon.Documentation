# OnRfListenerRemoved
<Badge type="info" text="Radio"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after an RF listener has been removed from a frequency.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRfListenerRemoved(IRFObject obj, int frequency)
{
	Puts("OnRfListenerRemoved has been fired!");
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

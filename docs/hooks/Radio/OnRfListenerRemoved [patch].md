<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfListenerRemoved [patch]
Alternate hook called after an RF listener removal (patch hook for additional processing).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRfListenerRemoved [patch]()
{
	Puts("OnRfListenerRemoved [patch] has been fired!");
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

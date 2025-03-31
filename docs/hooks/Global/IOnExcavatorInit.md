<Badge type="danger" text="Carbon Compatible"/>
# IOnExcavatorInit
Called when the excavator monument is initializing (server startup).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IOnExcavatorInit()
{
	Puts("IOnExcavatorInit has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ExcavatorArm]
public void Init()
{
	pendingResources = new ItemAmount[resourcesToMine.Length];
	for (int i = 0; i < resourcesToMine.Length; i++)
	{
		pendingResources[i] = new ItemAmount(resourcesToMine[i].itemDef);
	}
	System.Collections.Generic.List<ExcavatorOutputPile> obj = Facepunch.Pool.Get<System.Collections.Generic.List<ExcavatorOutputPile>>();
	Vis.Entities(base.transform.position, 200f, obj, 512);
	outputPiles = new System.Collections.Generic.List<ExcavatorOutputPile>();
	foreach (ExcavatorOutputPile item in obj)
	{
		if (!item.isClient)
		{
			outputPiles.Add(item);
		}
	}
	Facepunch.Pool.FreeUnmanaged(ref obj);
}

```
:::

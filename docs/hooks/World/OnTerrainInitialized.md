<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTerrainInitialized
Called after the terrain is fully initialized and loaded.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTerrainInitialized()
{
	Puts("OnTerrainInitialized has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ TerrainMeta]
public void PostSetupComponents()
{
	TerrainExtension[] components = GetComponents<TerrainExtension>();
	for (int i = 0; i < components.Length; i++)
	{
		components[i].PostSetup();
	}
}

```
:::

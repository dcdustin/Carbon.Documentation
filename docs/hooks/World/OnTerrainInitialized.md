# OnTerrainInitialized
<Badge type="info" text="World"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
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

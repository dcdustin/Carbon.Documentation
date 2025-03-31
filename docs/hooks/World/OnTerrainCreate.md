# OnTerrainCreate
<Badge type="info" text="World"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when the game world terrain is created (during server startup).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTerrainCreate(TerrainGenerator terrainGenerator)
{
	Puts("OnTerrainCreate has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ TerrainGenerator]
public UnityEngine.GameObject CreateTerrain()
{
	return CreateTerrain(GetHeightMapRes(), GetSplatMapRes());
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTerrainCreate
Called when the game world terrain is created (during server startup).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnTerrainCreate()
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

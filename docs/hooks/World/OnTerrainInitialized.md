<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTerrainInitialized
```csharp
public void PostSetupComponents()
{
	TerrainExtension[] components = GetComponents<TerrainExtension>();
	for (int i = 0; i < components.Length; i++)
	{
		components[i].PostSetup();
	}
}

```

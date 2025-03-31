# OnWallpaperRemove
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWallpaperRemove(BuildingBlock buildingBlock, int side)
{
	Puts("OnWallpaperRemove has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public void RemoveWallpaper(int side)
{
	switch (side)
	{
	case 0:
		wallpaperHealth = -1f;
		wallpaperID = 0uL;
		break;
	case 1:
		wallpaperHealth2 = -1f;
		wallpaperID2 = 0uL;
		break;
	}
	if (base.isServer)
	{
		SetConditionalModel(currentSkin.DetermineConditionalModelState(this));
		SendNetworkUpdateImmediate();
		ClientRPC(RpcTarget.NetworkGroup("RefreshSkin"));
	}
}

```
:::

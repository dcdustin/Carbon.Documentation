# OnWallpaperSet
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWallpaperSet(BuildingBlock buildingBlock, ulong id, int side)
{
	Puts("OnWallpaperSet has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BuildingBlock]
public void SetWallpaper(ulong id, int side = 0)
{
	if (side == 0)
	{
		if (HasWallpaper(side) && wallpaperID == id)
		{
			return;
		}
		wallpaperID = id;
		wallpaperHealth = 100f;
	}
	else
	{
		if (HasWallpaper(side) && wallpaperID2 == id)
		{
			return;
		}
		wallpaperID2 = id;
		wallpaperHealth2 = 100f;
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

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnWallpaperRemove
```csharp
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

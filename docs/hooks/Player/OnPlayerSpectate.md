# OnPlayerSpectate
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player begins spectating another player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerSpectate(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnPlayerSpectate has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void StartSpectating()
{
	if (!IsSpectating())
	{
		SetPlayerFlag(BasePlayer.PlayerFlags.Spectating, b: true);
		UnityEngine.TransformEx.SetLayerRecursive(base.gameObject, 10);
		CancelInvoke(InventoryUpdate);
		ChatMessage("Becoming Spectator");
		UpdateSpectateTarget(spectateFilter);
	}
}

```
:::

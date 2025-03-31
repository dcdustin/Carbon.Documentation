# OnPlayerSpectate
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player begins spectating another player.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerSpectate()
{
	Puts("OnPlayerSpectate has been fired!");
	return (System.Object)default;
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

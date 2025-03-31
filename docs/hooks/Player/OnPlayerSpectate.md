<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerSpectate
```csharp
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

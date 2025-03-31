<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerSpectateEnd
```csharp
public void StopSpectating()
{
	if (IsSpectating())
	{
		SetParent(null);
		SetPlayerFlag(BasePlayer.PlayerFlags.Spectating, b: false);
		UnityEngine.TransformEx.SetLayerRecursive(base.gameObject, 17);
	}
}

```

# OnPlayerSpectateEnd
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player stops spectating.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerSpectateEnd(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnPlayerSpectateEnd has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
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
:::

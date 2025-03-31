# OnPlayerColliderEnable
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player's physics collider is toggled (enabled or disabled).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerColliderEnable(BasePlayer basePlayer, BasePlayer self1)
{
	Puts("OnPlayerColliderEnable has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void EnablePlayerCollider()
{
	if (!playerCollider.enabled)
	{
		RefreshColliderSize(forced: true);
		playerCollider.enabled = true;
	}
}

```
:::

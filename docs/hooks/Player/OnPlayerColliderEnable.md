<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerColliderEnable
Called when a player's physics collider is toggled (enabled or disabled).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerColliderEnable()
{
	Puts("OnPlayerColliderEnable has been fired!");
	return (System.Object)default;
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

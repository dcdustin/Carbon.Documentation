<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerColliderEnable
```csharp
public void EnablePlayerCollider()
{
	if (!playerCollider.enabled)
	{
		RefreshColliderSize(forced: true);
		playerCollider.enabled = true;
	}
}

```

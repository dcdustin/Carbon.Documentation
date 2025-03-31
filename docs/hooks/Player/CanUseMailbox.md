<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanUseMailbox
Called when a player attempts to use a mailbox (e.g., leave or retrieve mail), to decide if it's allowed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanUseMailbox()
{
	Puts("CanUseMailbox has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ Mailbox]
public virtual bool PlayerIsOwner(BasePlayer player)
{
	return player.CanBuild();
}

```
:::

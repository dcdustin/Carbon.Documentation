# CanHideStash
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called to check if a player is allowed to hide (bury) a stash.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanHideStash()
{
	Puts("CanHideStash has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ StashContainer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_HideStash(BaseEntity.RPCMessage rpc)
{
	Facepunch.Rust.Analytics.Azure.OnStashHidden(rpc.player, this);
	SetHidden(isHidden: true);
}

```
:::

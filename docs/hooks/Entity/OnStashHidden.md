# OnStashHidden
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a stash is hidden (buried in the ground and made invisible).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnStashHidden(StashContainer stashContainer, BasePlayer player)
{
	Puts("OnStashHidden has been fired!");
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

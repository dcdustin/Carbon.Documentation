# OnPlayerDig
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a player digs for an item (such as using an Easter basket during an event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerDig(BasePlayer player, BaseDiggableEntity baseDiggableEntity)
{
	Puts("OnPlayerDig has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseDiggableEntity]
public virtual void Dig(BasePlayer player)
{
	if (digsRemaining == RequiredDigCount)
	{
		OnFirstDig(player);
	}
	ClientRPC(RpcTarget.NetworkGroup("RPC_OnDig"), RequiredDigCount - digsRemaining, RequiredDigCount);
	digsRemaining--;
	base.health = digsRemaining;
	SendNetworkUpdate();
	OnSingleDig(player);
	if (digsRemaining <= 0)
	{
		OnFullyDug(player);
		if (DestroyOnDug)
		{
			Kill();
		}
	}
}

```
:::

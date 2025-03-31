<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerDig
Triggered when a player digs for an item (such as using an Easter basket during an event).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerDig()
{
	Puts("OnPlayerDig has been fired!");
	return (System.Object)default;
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

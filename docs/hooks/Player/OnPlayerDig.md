<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerDig
```csharp
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

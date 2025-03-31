<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnXmasLootDistribute
```csharp
public override void ServerInit()
{
	base.ServerInit();
	if (!ConVar.XMas.enabled)
	{
		Invoke(RemoveMe, 0.1f);
		return;
	}
	goodKids = ((BasePlayer.activePlayerList != null) ? new System.Collections.Generic.List<BasePlayer>(BasePlayer.activePlayerList) : new System.Collections.Generic.List<BasePlayer>());
	stockings = ((Stocking.stockings != null) ? new System.Collections.Generic.List<Stocking>(Stocking.stockings.Values) : new System.Collections.Generic.List<Stocking>());
	Invoke(RemoveMe, 60f);
	InvokeRepeating(DistributeLoot, 3f, 0.02f);
	Invoke(SendBells, 0.5f);
}

```

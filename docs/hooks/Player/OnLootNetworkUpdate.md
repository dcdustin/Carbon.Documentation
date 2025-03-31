<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootNetworkUpdate
Called when the server updates the loot interface (e.g., after items move while looting).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnLootNetworkUpdate()
{
	Puts("OnLootNetworkUpdate has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PlayerLoot]
public void SendUpdate()
{
	isInvokingSendUpdate = false;
	if (!base.baseEntity.IsValid())
	{
		return;
	}
	using ProtoBuf.PlayerUpdateLoot playerUpdateLoot = Facepunch.Pool.Get<ProtoBuf.PlayerUpdateLoot>();
	if ((bool)entitySource && entitySource.net != null)
	{
		playerUpdateLoot.entityID = entitySource.net.ID;
	}
	if (itemSource != null)
	{
		playerUpdateLoot.itemID = itemSource.uid;
	}
	if (containers.Count > 0)
	{
		playerUpdateLoot.containers = Facepunch.Pool.Get<System.Collections.Generic.List<ProtoBuf.ItemContainer>>();
		foreach (ItemContainer container in containers)
		{
			playerUpdateLoot.containers.Add(container.Save());
		}
	}
	base.baseEntity.ClientRPC(RpcTarget.Player("UpdateLoot", base.baseEntity), playerUpdateLoot);
}

```
:::

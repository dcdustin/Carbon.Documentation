<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanDeployItem
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void DoDeploy(BaseEntity.RPCMessage msg)
{
	if (!msg.player.CanInteract())
	{
		return;
	}
	Deployable deployable = GetDeployable();
	if (!(deployable == null))
	{
		UnityEngine.Ray ray = msg.read.Ray();
		NetworkableId entityID = msg.read.EntityID();
		if (deployable.toSlot)
		{
			DoDeploy_Slot(deployable, ray, entityID);
		}
		else
		{
			DoDeploy_Regular(deployable, ray);
		}
	}
}

```

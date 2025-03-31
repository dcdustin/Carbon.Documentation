<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnStructureRotate
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void DoRotation(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract() && CanRotate(msg.player) && blockDefinition.canRotateAfterPlacement)
	{
		base.transform.localRotation *= UnityEngine.Quaternion.Euler(blockDefinition.rotationAmount);
		RefreshEntityLinks();
		UpdateSurroundingEntities();
		UpdateSkin(force: true);
		RefreshNeighbours(linkToNeighbours: false);
		SendNetworkUpdateImmediate();
		ClientRPC(RpcTarget.NetworkGroup("RefreshSkin"));
		if (!globalNetworkCooldown)
		{
			globalNetworkCooldown = true;
			GlobalNetworkHandler.server.TrySendNetworkUpdate(this);
			CancelInvoke(ResetGlobalNetworkCooldown);
			Invoke(ResetGlobalNetworkCooldown, 15f);
		}
	}
}

```

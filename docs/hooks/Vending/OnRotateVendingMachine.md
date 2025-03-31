<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRotateVendingMachine
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_RotateVM(BaseEntity.RPCMessage msg)
{
	if (CanRotate())
	{
		UpdateEmptyFlag();
		if (msg.player.CanBuild() && IsInventoryEmpty())
		{
			base.transform.rotation = UnityEngine.Quaternion.LookRotation(-base.transform.forward, base.transform.up);
			SendNetworkUpdate();
		}
	}
}

```

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSpinWheel
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Spin(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && AllowPlayerSpins() && (AnyoneSpin() || rpc.player.CanBuild()) && !(velocity > 15f))
	{
		velocity += UnityEngine.Random.Range(4f, 7f);
		ToggleChildEntityColliders(state: false);
	}
}

```

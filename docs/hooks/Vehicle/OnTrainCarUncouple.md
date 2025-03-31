<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrainCarUncouple
```csharp
[BaseEntity.RPC_Server]
public void RPC_WantsUncouple(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && !(UnityEngine.Vector3.SqrMagnitude(base.transform.position - player.transform.position) > 200f))
	{
		bool front = msg.read.Bit();
		coupling.Uncouple(front);
	}
}

```

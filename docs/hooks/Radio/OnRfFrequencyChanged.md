<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRfFrequencyChanged [PagerEntity]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ServerSetFrequency(BaseEntity.RPCMessage msg)
{
	if (!(msg.player == null) && msg.player.CanBuild() && !(UnityEngine.Time.time < nextChangeTime))
	{
		nextChangeTime = UnityEngine.Time.time + 2f;
		int newFrequency = msg.read.Int32();
		RFManager.ChangeFrequency(frequency, newFrequency, this, isListener: true);
		frequency = newFrequency;
		SendNetworkUpdateImmediate();
	}
}

```

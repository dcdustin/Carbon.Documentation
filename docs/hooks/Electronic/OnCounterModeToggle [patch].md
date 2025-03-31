<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCounterModeToggle [patch]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void ToggleDisplayMode(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanBuild())
	{
		SetFlag(BaseEntity.Flags.Reserved2, msg.read.Bit(), recursive: false, networkupdate: false);
		MarkDirty();
		SendNetworkUpdate();
	}
}

```

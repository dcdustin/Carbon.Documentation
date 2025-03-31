<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTurretModeToggle [AttackAll]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void SERVER_AttackAll(BaseEntity.RPCMessage rpc)
{
	if (IsAuthed(rpc.player))
	{
		SetPeacekeepermode(isOn: false);
	}
}

```

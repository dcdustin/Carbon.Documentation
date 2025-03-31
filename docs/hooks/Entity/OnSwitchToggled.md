<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSwitchToggled [IndustrialConveyor]
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(2uL)]
public void SvSwitch(BaseEntity.RPCMessage msg)
{
	SetSwitch(!IsOn());
}

```

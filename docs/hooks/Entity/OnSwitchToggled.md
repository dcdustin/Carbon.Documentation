<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSwitchToggled
Called after a switch or togglable device has changed its state (turned on or off).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSwitchToggled()
{
	Puts("OnSwitchToggled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ IndustrialConveyor]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
[BaseEntity.RPC_Server.CallsPerSecond(2uL)]
public void SvSwitch(BaseEntity.RPCMessage msg)
{
	SetSwitch(!IsOn());
}

```
:::

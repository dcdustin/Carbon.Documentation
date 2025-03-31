<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSwitchToggle
Called when a player attempts to flip a switch or togglable device (e.g., electrical switch, generator).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSwitchToggle()
{
	Puts("OnSwitchToggle has been fired!");
	return (System.Object)default;
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

# OnSwitchToggle
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player attempts to flip a switch or togglable device (e.g., electrical switch, generator).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSwitchToggle(IndustrialConveyor industrialConveyor, BasePlayer player)
{
	Puts("OnSwitchToggle has been fired!");
	return (object)default;
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

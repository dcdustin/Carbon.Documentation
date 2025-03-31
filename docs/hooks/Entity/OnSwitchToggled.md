# OnSwitchToggled
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a switch or togglable device has changed its state (turned on or off).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSwitchToggled(IndustrialConveyor industrialConveyor, BasePlayer player)
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

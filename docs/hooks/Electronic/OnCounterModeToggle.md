# OnCounterModeToggle
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a Power Counter (electrical counter) toggles its mode (e.g., switching between counting up or down).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCounterModeToggle()
{
	Puts("OnCounterModeToggle has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PowerCounter]
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
:::

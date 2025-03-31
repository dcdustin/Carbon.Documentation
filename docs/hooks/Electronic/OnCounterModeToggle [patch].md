<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCounterModeToggle [patch]
Called when a Power Counter toggles its mode (patched hook variant).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCounterModeToggle [patch]()
{
	Puts("OnCounterModeToggle [patch] has been fired!");
	return (System.Object)default;
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

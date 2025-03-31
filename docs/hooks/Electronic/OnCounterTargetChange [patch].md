<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCounterTargetChange [patch]
Called when a Power Counter’s target value is changed (patched hook variant).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnCounterTargetChange [patch]()
{
	Puts("OnCounterTargetChange [patch] has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PowerCounter]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void SERVER_SetTarget(BaseEntity.RPCMessage msg)
{
	if (CanPlayerAdmin(msg.player))
	{
		targetCounterNumber = msg.read.Int32();
		MarkDirty();
		SendNetworkUpdate();
	}
}

```
:::

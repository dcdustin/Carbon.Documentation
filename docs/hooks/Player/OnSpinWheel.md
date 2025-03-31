# OnSpinWheel
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a spinning wheel or roulette wheel is spun.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSpinWheel(BasePlayer player, SpinnerWheel spinnerWheel)
{
	Puts("OnSpinWheel has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ SpinnerWheel]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Spin(BaseEntity.RPCMessage rpc)
{
	if (rpc.player.CanInteract() && AllowPlayerSpins() && (AnyoneSpin() || rpc.player.CanBuild()) && !(velocity > 15f))
	{
		velocity += UnityEngine.Random.Range(4f, 7f);
		ToggleChildEntityColliders(state: false);
	}
}

```
:::

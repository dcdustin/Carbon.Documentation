# OnRotateVendingMachine
<Badge type="info" text="Vending"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRotateVendingMachine(VendingMachine vendingMachine, BasePlayer player)
{
	Puts("OnRotateVendingMachine has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ VendingMachine]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_RotateVM(BaseEntity.RPCMessage msg)
{
	if (CanRotate())
	{
		UpdateEmptyFlag();
		if (msg.player.CanBuild() && IsInventoryEmpty())
		{
			base.transform.rotation = UnityEngine.Quaternion.LookRotation(-base.transform.forward, base.transform.up);
			SendNetworkUpdate();
		}
	}
}

```
:::

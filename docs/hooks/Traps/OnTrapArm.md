<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTrapArm
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTrapArm()
{
	Puts("OnTrapArm has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BearTrap]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_Arm(BaseEntity.RPCMessage rpc)
{
	if (!Armed())
	{
		Arm();
	}
}

```
:::

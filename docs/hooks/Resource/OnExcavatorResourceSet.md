# OnExcavatorResourceSet
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when the resource type for the excavator is set or changed.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnExcavatorResourceSet()
{
	Puts("OnExcavatorResourceSet has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ ExcavatorArm]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.MaxDistance(3f)]
public void RPC_SetResourceTarget(BaseEntity.RPCMessage msg)
{
	switch (msg.read.String())
	{
	case "HQM":
		resourceMiningIndex = 0;
		break;
	case "Sulfur":
		resourceMiningIndex = 1;
		break;
	case "Stone":
		resourceMiningIndex = 2;
		break;
	case "Metal":
		resourceMiningIndex = 3;
		break;
	}
	if (!IsOn())
	{
		BeginMining();
	}
}

```
:::

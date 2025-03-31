# OnTrainCarUncouple
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnTrainCarUncouple(TrainCar trainCar, BasePlayer player)
{
	Puts("OnTrainCarUncouple has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ TrainCar]
[BaseEntity.RPC_Server]
public void RPC_WantsUncouple(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && !(UnityEngine.Vector3.SqrMagnitude(base.transform.position - player.transform.position) > 200f))
	{
		bool front = msg.read.Bit();
		coupling.Uncouple(front);
	}
}

```
:::

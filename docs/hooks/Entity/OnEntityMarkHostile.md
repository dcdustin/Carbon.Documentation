# OnEntityMarkHostile
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when an entity (such as a player or NPC) is marked as hostile (for example, after attacking in a safe zone).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEntityMarkHostile()
{
	Puts("OnEntityMarkHostile has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override void MarkHostileFor(float duration = 60f)
{
	double currentTimestamp = Network.TimeEx.currentTimestamp;
	double val = currentTimestamp + (double)duration;
	State.unHostileTimestamp = System.Math.Max(State.unHostileTimestamp, val);
	DirtyPlayerState();
	double num = System.Math.Max(State.unHostileTimestamp - currentTimestamp, 0.0);
	ClientRPC(RpcTarget.Player("SetHostileLength", this), (float)num);
}

```
:::

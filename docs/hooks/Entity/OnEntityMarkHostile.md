<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityMarkHostile [BasePlayer]
```csharp
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

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnArcadeScoreAdded
```csharp
public void AddScore(BasePlayer player, int score)
{
	BaseArcadeMachine.ScoreEntry scoreEntry = new BaseArcadeMachine.ScoreEntry();
	scoreEntry.displayName = player.displayName;
	scoreEntry.score = score;
	scoreEntry.playerID = player.userID;
	scores.Add(scoreEntry);
	scores.Sort((BaseArcadeMachine.ScoreEntry a, BaseArcadeMachine.ScoreEntry b) => b.score.CompareTo(a.score));
	scores.TrimExcess();
	SendNetworkUpdate();
}

```

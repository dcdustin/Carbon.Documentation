# OnArcadeScoreAdded
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a score entry is added to an arcade machine (when a player achieves a score in a minigame).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnArcadeScoreAdded(BaseArcadeMachine baseArcadeMachine, BasePlayer player, int score)
{
	Puts("OnArcadeScoreAdded has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseArcadeMachine]
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
:::

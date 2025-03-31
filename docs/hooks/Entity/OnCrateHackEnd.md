# OnCrateHackEnd
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a hackable locked crate’s hacking process ends (the crate is unlocked).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCrateHackEnd()
{
	Puts("OnCrateHackEnd has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ HackableLockedCrate]
public void HackProgress()
{
	hackSeconds += 1f;
	if (hackSeconds > requiredHackSeconds)
	{
		Facepunch.Rust.Analytics.Azure.OnLockedCrateFinished(originalHackerPlayerId, this);
		if (originalHackerPlayer != null && originalHackerPlayer.serverClan != null)
		{
			originalHackerPlayer.AddClanScore(ClanScoreEventType.HackedCrate);
		}
		RefreshDecay();
		SetFlag(BaseEntity.Flags.Reserved2, b: true);
		isLootable = true;
		CancelInvoke(HackProgress);
	}
	ClientRPC(RpcTarget.NetworkGroup("UpdateHackProgress"), (int)hackSeconds, (int)requiredHackSeconds);
}

```
:::

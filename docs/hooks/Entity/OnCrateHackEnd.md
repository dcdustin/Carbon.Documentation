<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCrateHackEnd
```csharp
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

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCrateHack
```csharp
public void StartHacking()
{
	BroadcastEntityMessage("HackingStarted", 20f, 256);
	SetFlag(BaseEntity.Flags.Reserved1, b: true);
	InvokeRepeating(HackProgress, 1f, 1f);
	ClientRPC(RpcTarget.NetworkGroup("UpdateHackProgress"), 0, (int)requiredHackSeconds);
	RefreshDecay();
}

```

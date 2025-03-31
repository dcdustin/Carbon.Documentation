<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanCastFishingRod
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void Server_RequestCast(BaseEntity.RPCMessage msg)
{
	UnityEngine.Vector3 pos = msg.read.Vector3();
	BasePlayer ownerPlayer = GetOwnerPlayer();
	Item currentLure = GetCurrentLure();
	if (currentLure == null)
	{
		FailedCast(BaseFishingRod.FailReason.NoLure);
		return;
	}
	if (!EvaluateFishingPosition(ref pos, ownerPlayer, out var reason, out surfaceBody))
	{
		FailedCast(reason);
		return;
	}
	FishingBobber component = base.gameManager.CreateEntity(FishingBobberRef.resourcePath, base.transform.position + UnityEngine.Vector3.up * 2.8f + ownerPlayer.eyes.BodyForward() * 1.8f, GetOwnerPlayer().ServerRotation).GetComponent<FishingBobber>();
	component.transform.forward = GetOwnerPlayer().eyes.BodyForward();
	component.Spawn();
	component.InitialiseBobber(ownerPlayer, surfaceBody, pos, 150f);
	int usedLureAmount = 0;
	if (FishLookup.Instance != null)
	{
		currentFishTarget = FishLookup.Instance.GetFish(component.transform.position, surfaceBody, currentLure, out fishableModifier, lastFish, out usedLureAmount);
	}
	lureUsed = currentLure.info;
	currentLure.UseItem(usedLureAmount);
	lastFish = fishableModifier;
	currentBobber.Set(component);
	ClientRPC(RpcTarget.NetworkGroup("Client_ReceiveCastPoint"), component.net.ID);
	ownerPlayer.SignalBroadcast(BaseEntity.Signal.Attack);
	catchTime = (ImmediateHook ? 0f : UnityEngine.Random.Range(10f, 20f));
	catchTime = (float)catchTime * fishableModifier.CatchWaitTimeMultiplier;
	float val = (lureUsed.TryGetComponent<ItemModCompostable>(out var component2) ? component2.BaitValue : 0f);
	val = Mathx.RemapValClamped(val, 0f, 20f, 1f, 10f);
	catchTime = UnityEngine.Mathf.Clamp((float)catchTime - val, 3f, 20f);
	playerStartPosition = ownerPlayer.transform.position;
	SetFlag(BaseEntity.Flags.Busy, b: true);
	CurrentState = BaseFishingRod.CatchState.Waiting;
	InvokeRepeating(CatchProcess, 0f, 0f);
	inQueue = false;
	BasePlayer ownerPlayer2 = GetOwnerPlayer();
	if (ownerPlayer2 != null)
	{
		Facepunch.Rust.Analytics.Azure.OnStartFish(ownerPlayer2, currentLure, pos);
	}
}

```

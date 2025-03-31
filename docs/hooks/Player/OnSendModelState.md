# OnSendModelState
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entity's model state (like posture or holding items) is being sent to clients.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSendModelState()
{
	Puts("OnSendModelState has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void SendModelState(bool force = false)
{
	if (force || (wantsSendModelState && !(nextModelStateUpdate > UnityEngine.Time.time)))
	{
		wantsSendModelState = false;
		nextModelStateUpdate = UnityEngine.Time.time + 0.1f;
		if (!IsDead() && !IsSpectating())
		{
			modelState.sleeping = IsSleeping();
			modelState.mounted = isMounted;
			modelState.ragdolling = IsRagdolling();
			modelState.relaxed = IsRelaxed();
			modelState.onPhone = HasActiveTelephone && !activeTelephone.IsMobile;
			modelState.crawling = IsCrawling();
			modelState.loading = IsLoadingAfterTransfer();
			ClientRPC(RpcTarget.NetworkGroup("OnModelState"), modelState);
		}
	}
}

```
:::

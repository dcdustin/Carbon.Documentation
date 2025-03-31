<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSendModelState
```csharp
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

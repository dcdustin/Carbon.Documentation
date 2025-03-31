<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPortalUse
Triggered when a player uses a portal (teleporter) to teleport.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPortalUse()
{
	Puts("OnPortalUse has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePortal]
public virtual void UsePortal(BasePlayer player)
{
	LinkPortal();
	if (targetPortal != null)
	{
		player.PauseFlyHackDetection();
		player.PauseSpeedHackDetection();
		player.ApplyStallProtection(4f);
		UnityEngine.Vector3 position = player.transform.position;
		UnityEngine.Vector3 vector = targetPortal.GetLocalEntryExitPosition();
		UnityEngine.Vector3 vector2 = base.transform.InverseTransformDirection(player.eyes.BodyForward());
		UnityEngine.Vector3 vector3 = vector2;
		if (isMirrored)
		{
			UnityEngine.Vector3 position2 = base.transform.InverseTransformPoint(player.transform.position);
			vector = targetPortal.relativeAnchor.transform.TransformPoint(position2);
			vector3 = targetPortal.relativeAnchor.transform.TransformDirection(vector2);
		}
		else
		{
			vector3 = targetPortal.GetLocalEntryExitRotation() * UnityEngine.Vector3.forward;
		}
		if (disappearEffect.isValid)
		{
			Effect.server.Run(disappearEffect.resourcePath, position, UnityEngine.Vector3.up);
		}
		if (appearEffect.isValid)
		{
			Effect.server.Run(appearEffect.resourcePath, vector, UnityEngine.Vector3.up);
		}
		player.ClientRPC(RpcTarget.Player("StartLoading_Quick", player), arg1: true);
		player.SetParent(null, worldPositionStays: true);
		player.Teleport(vector);
		player.ForceUpdateTriggers();
		player.ClientRPC(RpcTarget.Player("ForceViewAnglesTo", player), vector3);
		if (transitionSoundEffect.isValid)
		{
			Effect.server.Run(transitionSoundEffect.resourcePath, targetPortal.relativeAnchor.transform.position, UnityEngine.Vector3.up);
		}
		player.UpdateNetworkGroup();
		player.SetPlayerFlag(BasePlayer.PlayerFlags.ReceivingSnapshot, b: true);
		SendNetworkUpdateImmediate();
	}
	else
	{
		UnityEngine.Debug.Log("No portal...");
	}
}

```
:::

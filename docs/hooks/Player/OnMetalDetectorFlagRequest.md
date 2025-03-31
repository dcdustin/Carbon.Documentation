# OnMetalDetectorFlagRequest
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a metal detector checks for metal (to decide if it should flag an item).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnMetalDetectorFlagRequest(BaseMetalDetector baseMetalDetector, UnityEngine.Vector3 local1, BasePlayer local0)
{
	Puts("OnMetalDetectorFlagRequest has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseMetalDetector]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(2uL)]
public void RPC_RequestFlag(BaseEntity.RPCMessage rpc)
{
	BasePlayer player = rpc.player;
	if (!(player == null) && !player.InSafeZone() && nearestSource != null)
	{
		UnityEngine.Vector3 pos = rpc.read.Vector3();
		if (nearestSource.VerifyScanPosition(player.transform.position, pos, out var spotPos))
		{
			nearestSource.Detected(spotPos);
		}
	}
}

```
:::

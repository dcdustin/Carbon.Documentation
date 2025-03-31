# OnSensorDetect
<Badge type="info" text="Electronic"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a HBHF sensor (Heartbeat sensor) detects a player or when it clears detection.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnSensorDetect()
{
	Puts("OnSensorDetect has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ HBHFSensor]
public void UpdatePassthroughAmount()
{
	if (base.isClient)
	{
		return;
	}
	int num = detectedPlayers;
	detectedPlayers = 0;
	if (myTrigger.entityContents != null && myTrigger.entityContents.Count > 0)
	{
		BuildingPrivlidge buildingPrivilege = GetBuildingPrivilege();
		foreach (BaseEntity entityContent in myTrigger.entityContents)
		{
			if (entityContent is BasePlayer basePlayer)
			{
				bool flag = buildingPrivilege != null && buildingPrivilege.IsAuthed(basePlayer);
				if ((!flag || ShouldIncludeAuthorized()) && (flag || ShouldIncludeOthers()) && entityContent.IsVisible(base.transform.position + base.transform.forward * 0.1f, 10f) && basePlayer != null && basePlayer.IsAlive() && !basePlayer.IsSleeping() && basePlayer.isServer)
				{
					detectedPlayers++;
				}
			}
		}
	}
	if (num != detectedPlayers && IsPowered())
	{
		MarkDirty();
		if (detectedPlayers > num)
		{
			Effect.server.Run(detectUp.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		}
		else if (detectedPlayers < num)
		{
			Effect.server.Run(detectDown.resourcePath, base.transform.position, UnityEngine.Vector3.up);
		}
	}
}

```
:::

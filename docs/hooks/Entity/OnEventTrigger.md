# OnEventTrigger
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a server event trigger is activated (for example, an in-game trigger volume or custom event triggers).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnEventTrigger(TriggeredEventPrefab triggeredEventPrefab)
{
	Puts("OnEventTrigger has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ TriggeredEventPrefab]
public override void RunEvent()
{
	UnityEngine.Debug.Log("[event] " + targetPrefab.resourcePath);
	BaseEntity baseEntity = GameManager.server.CreateEntity(targetPrefab.resourcePath);
	if (!baseEntity)
	{
		return;
	}
	baseEntity.SendMessage("TriggeredEventSpawn", UnityEngine.SendMessageOptions.DontRequireReceiver);
	baseEntity.Spawn();
	spawnedEntity = baseEntity;
	if (!shouldBroadcastSpawn)
	{
		return;
	}
	foreach (BasePlayer activePlayer in BasePlayer.activePlayerList)
	{
		if ((bool)activePlayer && activePlayer.IsConnected && !activePlayer.IsInTutorial)
		{
			activePlayer.ShowToast(GameTip.Styles.Server_Event, spawnPhrase, false);
		}
	}
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEventTrigger
```csharp
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

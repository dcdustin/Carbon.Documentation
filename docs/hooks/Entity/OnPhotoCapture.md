# OnPhotoCapture
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player takes a photo with the instant camera (at the moment of capture, before it’s finalized).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPhotoCapture()
{
	Puts("OnPhotoCapture has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ InstantCameraTool]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(3uL)]
public void TakePhoto(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	Item item = GetItem();
	if (player == null || item == null || item.condition <= 0f)
	{
		return;
	}
	byte[] array = msg.read.BytesWithSize();
	if (array.Length > 102400 || !ImageProcessing.IsValidJPG(array, resolutionX, resolutionY))
	{
		return;
	}
	Item item2 = ItemManager.Create(photoItem, 1, 0uL);
	if (item2 == null)
	{
		UnityEngine.Debug.LogError("Failed to create photo item");
		return;
	}
	item2.SetItemOwnership(msg.player, ItemOwnershipPhrases.Photographed);
	if (!item2.instanceData.subEntity.IsValid)
	{
		item2.Remove();
		UnityEngine.Debug.LogError("Photo has no sub-entity");
		return;
	}
	BaseNetworkable baseNetworkable = BaseNetworkable.serverEntities.Find(item2.instanceData.subEntity);
	if (baseNetworkable == null)
	{
		item2.Remove();
		UnityEngine.Debug.LogError("Sub-entity was not found");
		return;
	}
	if (!(baseNetworkable is PhotoEntity photoEntity))
	{
		item2.Remove();
		UnityEngine.Debug.LogError("Sub-entity is not a photo");
		return;
	}
	photoEntity.SetImageData(player.userID, array);
	if (!player.inventory.GiveItem(item2))
	{
		item2.Drop(player.GetDropPosition(), player.GetDropVelocity());
	}
	EffectNetwork.Send(new Effect(screenshotEffect.resourcePath, base.transform.position, base.transform.forward, msg.connection));
	if (!hasSentAchievement && !string.IsNullOrEmpty("SUMMER_PAPARAZZI"))
	{
		UnityEngine.Vector3 position = GetOwnerPlayer().eyes.position;
		UnityEngine.Vector3 vector = GetOwnerPlayer().eyes.HeadForward();
		System.Collections.Generic.List<BasePlayer> obj = Facepunch.Pool.Get<System.Collections.Generic.List<BasePlayer>>();
		Vis.Entities(position + vector * 5f, 5f, obj, 131072);
		foreach (BasePlayer item3 in obj)
		{
			if (item3.isServer && item3 != GetOwnerPlayer() && item3.IsVisible(GetOwnerPlayer().eyes.position))
			{
				hasSentAchievement = true;
				GetOwnerPlayer().GiveAchievement("SUMMER_PAPARAZZI");
				break;
			}
		}
		Facepunch.Pool.FreeUnmanaged(ref obj);
	}
	item.LoseCondition(1f);
}

```
:::

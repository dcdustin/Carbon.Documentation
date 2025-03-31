<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanMountEntity
Called when a player attempts to mount an entity (sit in a chair, climb in a vehicle, etc.), to decide if it's allowed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanMountEntity()
{
	Puts("CanMountEntity has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseMountable]
public void MountPlayer(BasePlayer player)
{
	if (!(_mounted != null) && !(mountAnchor == null))
	{
		player.EnsureDismounted();
		_mounted = player;
		UnityEngine.Transform transform = mountAnchor;
		player.SetMounted(this);
		player.MovePosition(transform.position);
		player.transform.rotation = transform.rotation;
		player.ServerRotation = transform.rotation;
		player.OverrideViewAngles(transform.rotation.eulerAngles);
		_mounted.eyes.NetworkUpdate(transform.rotation);
		player.SendNetworkUpdateImmediate();
		Facepunch.Rust.Analytics.Azure.OnMountEntity(player, this, VehicleParent());
		OnPlayerMounted();
		if (this.IsValid() && player.IsValid())
		{
			player.ProcessMissionEvent(BaseMission.MissionEventType.MOUNT_ENTITY, net.ID, 1f);
		}
	}
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerCorpseSpawn
Called when a player's corpse is about to spawn (upon player death).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerCorpseSpawn()
{
	Puts("OnPlayerCorpseSpawn has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual BaseCorpse CreateCorpse(BasePlayer.PlayerFlags flagsOnDeath, UnityEngine.Vector3 posOnDeath, UnityEngine.Quaternion rotOnDeath, System.Collections.Generic.List<TriggerBase> triggersOnDeath, bool forceServerSide = false)
{
	using (TimeWarning.New("Create corpse"))
	{
		string strCorpsePrefab = ((!(ConVar.Physics.serversideragdolls || forceServerSide)) ? "assets/prefabs/player/player_corpse.prefab" : "assets/prefabs/player/player_corpse_new.prefab");
		bool flag = false;
		if (ConVar.Global.cinematicGingerbreadCorpses)
		{
			foreach (Item item in inventory.containerWear.itemList)
			{
				if (item != null && item.info.TryGetComponent<ItemCorpseOverride>(out var component))
				{
					strCorpsePrefab = ((GetFloatBasedOnUserID(userID, 4332uL) > 0.5f) ? component.FemaleCorpse.resourcePath : component.MaleCorpse.resourcePath);
					flag = component.BlockWearableCopy;
					break;
				}
			}
		}
		PlayerCorpse playerCorpse = DropCorpse(strCorpsePrefab, posOnDeath, rotOnDeath, flagsOnDeath, modelState) as PlayerCorpse;
		if ((bool)playerCorpse)
		{
			playerCorpse.SetFlag(BaseEntity.Flags.Reserved5, HasPlayerFlag(BasePlayer.PlayerFlags.DisplaySash));
			if (!flag)
			{
				playerCorpse.TakeFrom(this, inventory.containerMain, inventory.containerWear, inventory.containerBelt);
			}
			playerCorpse.playerName = displayName;
			playerCorpse.streamerName = Facepunch.RandomUsernames.Get(userID);
			playerCorpse.playerSteamID = userID;
			playerCorpse.underwearSkin = GetUnderwearSkin();
			if (!triggersOnDeath.IsNullOrEmpty())
			{
				foreach (TriggerBase item2 in triggersOnDeath)
				{
					if (item2 is TriggerParent triggerParent)
					{
						triggerParent.ForceParentEarly(playerCorpse);
					}
				}
			}
			playerCorpse.Spawn();
			playerCorpse.TakeChildren(this);
			ResourceDispenser component2 = playerCorpse.GetComponent<ResourceDispenser>();
			int num = 2;
			if (lifeStory != null)
			{
				num += UnityEngine.Mathf.Clamp(UnityEngine.Mathf.FloorToInt(lifeStory.secondsAlive / 180f), 0, 20);
			}
			component2.containedItems.Add(new ItemAmount(ItemManager.FindItemDefinition("fat.animal"), num));
			return playerCorpse;
		}
	}
	return null;
	static float GetFloatBasedOnUserID(ulong steamid, ulong seed)
	{
		UnityEngine.Random.State state = UnityEngine.Random.state;
		UnityEngine.Random.InitState((int)(seed + steamid));
		float result = UnityEngine.Random.Range(0f, 1f);
		UnityEngine.Random.state = state;
		return result;
	}
}

```
:::

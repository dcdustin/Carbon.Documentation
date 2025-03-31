# OnRidableAnimalClaimed
<Badge type="info" text="Animal"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called after a player has successfully claimed a ridable animal (ownership change complete).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnRidableAnimalClaimed(RidableHorse2 ridableHorse2, BasePlayer local0)
{
	Puts("OnRidableAnimalClaimed has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ RidableHorse2]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void SERVER_Claim(BaseEntity.RPCMessage msg)
{
	BasePlayer player = msg.player;
	if (!(player == null) && IsForSale)
	{
		int tokenItemID = msg.read.Int32();
		Item purchaseToken = GetPurchaseToken(player, tokenItemID);
		if (purchaseToken != null)
		{
			SetFlag(BaseEntity.Flags.Reserved2, b: false);
			OnClaimedWithToken(purchaseToken);
			purchaseToken.UseItem();
			Facepunch.Rust.Analytics.Server.VehiclePurchased(base.ShortPrefabName);
			Facepunch.Rust.Analytics.Azure.OnVehiclePurchased(msg.player, this);
			AttemptMount(player, doMountChecks: false);
		}
	}
}

```
:::

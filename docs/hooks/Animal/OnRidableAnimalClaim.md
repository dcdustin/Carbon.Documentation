# OnRidableAnimalClaim
<Badge type="info" text="Animal"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a player attempts to claim a ridable animal (such as purchasing a horse at a stable, before the claim is finalized).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnRidableAnimalClaim(RidableHorse2 ridableHorse2, BasePlayer local0, Item local2)
{
	Puts("OnRidableAnimalClaim has been fired!");
	return (object)default;
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

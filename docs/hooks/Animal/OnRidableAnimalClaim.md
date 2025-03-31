<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnRidableAnimalClaim [RidableHorse2]
```csharp
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

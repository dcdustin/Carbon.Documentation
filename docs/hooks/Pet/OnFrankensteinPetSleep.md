<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFrankensteinPetSleep [FrankensteinTable]
```csharp
public void SleepFrankenstein(BasePlayer owner)
{
	if (IsInventoryEmpty() && !(owner == null) && !(owner.PetEntity == null))
	{
		FrankensteinPet frankensteinPet = owner.PetEntity as FrankensteinPet;
		if (!(frankensteinPet == null) && !(UnityEngine.Vector3.Distance(base.transform.position, frankensteinPet.transform.position) >= 5f))
		{
			ReturnFrankensteinItems(frankensteinPet);
			ItemManager.DoRemoves();
			SendNetworkUpdateImmediate();
			frankensteinPet.Kill();
		}
	}
}

```

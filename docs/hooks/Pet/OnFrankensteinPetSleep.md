# OnFrankensteinPetSleep
<Badge type="info" text="Pet"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a Frankenstein pet is put to sleep at the Frankenstein table (returned to owner).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnFrankensteinPetSleep()
{
	Puts("OnFrankensteinPetSleep has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ FrankensteinTable]
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
:::

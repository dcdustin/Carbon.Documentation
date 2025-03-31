# OnAnimalDungProduce
<Badge type="info" text="Animal"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a ridable animal (e.g., horse) is about to produce dung (manure). Allows plugins to modify or cancel dung creation.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnAnimalDungProduce()
{
	Puts("OnAnimalDungProduce has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ RidableHorse2]
public void DoDung()
{
	dungProduction -= 1f;
	UnityEngine.Quaternion rotation = UnityEngine.Quaternion.Euler(UnityEngine.Random.Range(-180f, 180f), UnityEngine.Random.Range(-180f, 180f), UnityEngine.Random.Range(-180f, 180f));
	UnityEngine.Vector3 vVelocity = new UnityEngine.Vector3(UnityEngine.Random.Range(-0.5f, 0.5f), UnityEngine.Random.Range(-1f, -3f), UnityEngine.Random.Range(-0.5f, 0.5f));
	Item item = ItemManager.Create(dungItem, 1, 0uL);
	item.SetItemOwnership(currentBreed.breedName.english, ItemOwnershipPhrases.Pooped);
	item.Drop(dungSpawnPoint.position + UnityEngine.Random.insideUnitSphere * 0.1f, vVelocity, rotation);
}

```
:::

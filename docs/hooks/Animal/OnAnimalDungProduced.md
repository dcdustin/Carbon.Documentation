<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnAnimalDungProduced
Called after a ridable animal has produced dung and dropped it in the world.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnAnimalDungProduced()
{
	Puts("OnAnimalDungProduced has been fired!");
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

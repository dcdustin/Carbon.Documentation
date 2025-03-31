<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# IOnEntitySaved
Called when an entity’s state is being saved (written to storage). Allows plugins to perform actions during entity save.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IOnEntitySaved()
{
	Puts("IOnEntitySaved has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public void ToStream(System.IO.Stream stream, BaseNetworkable.SaveInfo saveInfo)
{
	using (saveInfo.msg = Facepunch.Pool.Get<ProtoBuf.Entity>())
	{
		Save(saveInfo);
		if (saveInfo.msg.baseEntity == null)
		{
			UnityEngine.Debug.LogError(this?.ToString() + ": ToStream - no BaseEntity!?");
		}
		if (saveInfo.msg.baseNetworkable == null)
		{
			UnityEngine.Debug.LogError(this?.ToString() + ": ToStream - no baseNetworkable!?");
		}
		saveInfo.msg.ToProto(stream);
		PostSave(saveInfo);
	}
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntitySaved
```csharp
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

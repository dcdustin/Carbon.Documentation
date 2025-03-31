<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNetworkSubscriptionsUpdate [2]
```csharp
public bool UpdateHighPrioritySubscriptions()
{
	if (subscriber == null)
	{
		return false;
	}
	using (TimeWarning.New("UpdateHighPrioritySubscriptions"))
	{
		System.Collections.Generic.List<Network.Visibility.Group> obj = Facepunch.Pool.Get<System.Collections.Generic.List<Network.Visibility.Group>>();
		System.Collections.Generic.List<Network.Visibility.Group> obj2 = Facepunch.Pool.Get<System.Collections.Generic.List<Network.Visibility.Group>>();
		sv.visibility.GetVisibleFromNear(this.group, obj2);
		AddVisibleFromNear(secondaryGroup, obj2);
		Facepunch.Extend.List.Compare(subscriber.subscribed, obj2, obj, null, null);
		for (int i = 0; i < obj.Count; i++)
		{
			Network.Visibility.Group group = obj[i];
			subscriber.Subscribe(group);
			if (handler != null)
			{
				handler.OnNetworkGroupEnter(group);
			}
		}
		Facepunch.Pool.FreeUnmanaged(ref obj);
		Facepunch.Pool.FreeUnmanaged(ref obj2);
	}
	return true;
}

```

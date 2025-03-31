<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNetworkSubscriptionsGather
```csharp
public void GetVisibleFrom(Network.Visibility.Group group, System.Collections.Generic.List<Network.Visibility.Group> groups, int radius)
{
	groups.Add(Network.Net.sv.visibility.Get(0u));
	if (group.restricted)
	{
		groups.Add(group);
		return;
	}
	int iD = (int)group.ID;
	if (iD < startID)
	{
		return;
	}
	var (num, num2, groupLayer2) = DeconstructGroupId(iD);
	AddLayers(num, num2, groupLayer2);
	for (int i = 1; i <= radius; i++)
	{
		AddLayers(num - i, num2, groupLayer2);
		AddLayers(num + i, num2, groupLayer2);
		AddLayers(num, num2 - i, groupLayer2);
		AddLayers(num, num2 + i, groupLayer2);
		for (int j = 1; j < i; j++)
		{
			AddLayers(num - i, num2 - j, groupLayer2);
			AddLayers(num - i, num2 + j, groupLayer2);
			AddLayers(num + i, num2 - j, groupLayer2);
			AddLayers(num + i, num2 + j, groupLayer2);
			AddLayers(num - j, num2 - i, groupLayer2);
			AddLayers(num + j, num2 - i, groupLayer2);
			AddLayers(num - j, num2 + i, groupLayer2);
			AddLayers(num + j, num2 + i, groupLayer2);
		}
		AddLayers(num - i, num2 - i, groupLayer2);
		AddLayers(num - i, num2 + i, groupLayer2);
		AddLayers(num + i, num2 - i, groupLayer2);
		AddLayers(num + i, num2 + i, groupLayer2);
	}
	void Add(int groupX, int groupY, int groupLayer)
	{
		groups.Add(Network.Net.sv.visibility.Get(CoordToID(groupX, groupY, groupLayer)));
	}
	void AddLayers(int groupX, int groupY, int groupLayer)
	{
		Add(groupX, groupY, groupLayer);
		if (groupLayer == 0)
		{
			Add(groupX, groupY, 1);
		}
		if (groupLayer == 1)
		{
			Add(groupX, groupY, 2);
			Add(groupX, groupY, 0);
		}
		if (groupLayer == 2)
		{
			Add(groupX, groupY, 1);
		}
	}
}

```

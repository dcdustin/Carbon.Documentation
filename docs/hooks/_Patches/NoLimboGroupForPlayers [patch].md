<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# NoLimboGroupForPlayers [patch]
```csharp
#define UNITY_ASSERTIONS
public override void UpdateNetworkGroup()
{
	UnityEngine.Assertions.Assert.IsTrue(base.isServer, "UpdateNetworkGroup called on clientside entity!");
	isCallingUpdateNetworkGroup = false;
	if (net == null || Network.Net.sv == null || Network.Net.sv.visibility == null)
	{
		return;
	}
	using (TimeWarning.New("UpdateNetworkGroup"))
	{
		if (globalBroadcast)
		{
			if (net.SwitchGroup(BaseNetworkable.GlobalNetworkGroup))
			{
				SendNetworkGroupChange();
			}
		}
		else if (ShouldInheritNetworkGroup() && parentEntity.IsSet())
		{
			BaseEntity baseEntity = GetParentEntity();
			if (!baseEntity.IsValid())
			{
				if (!Rust.Application.isLoadingSave)
				{
					UnityEngine.Debug.LogWarning("UpdateNetworkGroup: Missing parent entity " + parentEntity.uid.ToString());
					Invoke(UpdateNetworkGroup, 2f);
					isCallingUpdateNetworkGroup = true;
				}
			}
			else if (baseEntity != null)
			{
				if (net.SwitchGroup(baseEntity.net.group))
				{
					SendNetworkGroupChange();
				}
			}
			else
			{
				UnityEngine.Debug.LogWarning(base.gameObject?.ToString() + ": has parent id - but couldn't find parent! " + parentEntity);
			}
		}
		else if (base.limitNetworking)
		{
			if (net.SwitchGroup(BaseNetworkable.LimboNetworkGroup))
			{
				SendNetworkGroupChange();
			}
		}
		else
		{
			base.UpdateNetworkGroup();
		}
	}
}

```

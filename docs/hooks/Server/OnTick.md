<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnTick
```csharp
public void DoTick()
{
	Facepunch.RCon.Update();
	CompanionServer.Server.Update();
	NexusServer.Update();
	for (int i = 0; i < Network.Net.sv.connections.Count; i++)
	{
		Network.Connection connection = Network.Net.sv.connections[i];
		if (!connection.isAuthenticated && !(connection.GetSecondsConnected() < (float)ConVar.Server.authtimeout))
		{
			Network.Net.sv.Kick(connection, "Authentication Timed Out");
		}
	}
	float num = UnityEngine.Mathf.Max(ConVar.Server.premiumRecheckInterval, 60f);
	if (ConVar.Server.premium && (double)sinceLastPremiumRecheck > (double)num)
	{
		sinceLastPremiumRecheck = 0.0;
		RecheckPremiumStatus();
	}
}

```

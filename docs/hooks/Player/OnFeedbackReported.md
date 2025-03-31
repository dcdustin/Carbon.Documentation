<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnFeedbackReported
Called when a player submits in-game feedback or a report (e.g., via the F7 report system).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnFeedbackReported()
{
	Puts("OnFeedbackReported has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void OnFeedbackReport(BaseEntity.RPCMessage msg)
{
	if (ConVar.Server.printReportsToConsole || !string.IsNullOrEmpty(ConVar.Server.reportsServerEndpoint))
	{
		string text = msg.read.String();
		string text2 = msg.read.StringMultiLine();
		Facepunch.Models.ReportType reportType = (Facepunch.Models.ReportType)UnityEngine.Mathf.Clamp(msg.read.Int32(), 0, 5);
		if (ConVar.Server.printReportsToConsole)
		{
			UnityEngine.DebugEx.Log($"[FeedbackReport] {this} reported {reportType} - \"{text}\" \"{text2}\"");
			Facepunch.RCon.Broadcast(Facepunch.RCon.LogType.Report, new
			{
				PlayerId = UserIDString,
				PlayerName = displayName,
				Subject = text,
				Message = text2,
				Type = reportType
			});
		}
		if (!string.IsNullOrEmpty(ConVar.Server.reportsServerEndpoint) && reportType != Facepunch.Models.ReportType.BreakingServerRules)
		{
			string image = msg.read.StringMultiLine(60000);
			Facepunch.Models.Feedback feedback = default(Facepunch.Models.Feedback);
			feedback.Type = reportType;
			feedback.Message = text2;
			feedback.Subject = text;
			Facepunch.Models.Feedback feedback2 = feedback;
			feedback2.AppInfo.Image = image;
			Facepunch.Feedback.ServerReport(ConVar.Server.reportsServerEndpoint, userID, ConVar.Server.reportsServerEndpointKey, feedback2);
		}
	}
}

```
:::

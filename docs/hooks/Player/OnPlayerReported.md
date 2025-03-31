# OnPlayerReported
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a player is reported (e.g., via the in-game report system).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerReported(BasePlayer basePlayer, string local4, string local3, string local0, string local1, string local2)
{
	Puts("OnPlayerReported has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(1uL)]
public void OnPlayerReported(BaseEntity.RPCMessage msg)
{
	string text = msg.read.String();
	string message = msg.read.StringMultiLine();
	string type = msg.read.String();
	string text2 = msg.read.String();
	string text3 = msg.read.String();
	UnityEngine.DebugEx.Log($"[PlayerReport] {this} reported {text3}[{text2}] - \"{text}\"");
	Facepunch.RCon.Broadcast(Facepunch.RCon.LogType.Report, new
	{
		PlayerId = UserIDString,
		PlayerName = displayName,
		TargetId = text2,
		TargetName = text3,
		Subject = text,
		Message = message,
		Type = type
	});
}

```
:::

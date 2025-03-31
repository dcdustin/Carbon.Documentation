<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerVoice
Called when a player's voice chat status is updated (i.e., they transmit voice data).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerVoice()
{
	Puts("OnPlayerVoice has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void OnReceivedVoice(byte[] data)
{
	Network.NetWrite netWrite = Network.Net.sv.StartWrite();
	netWrite.PacketID(Network.Message.Type.VoiceData);
	netWrite.EntityID(net.ID);
	netWrite.BytesWithSize(data);
	float num = 0f;
	if (HasPlayerFlag(BasePlayer.PlayerFlags.VoiceRangeBoost))
	{
		num = ConVar.Voice.voiceRangeBoostAmount;
	}
	netWrite.Send(new Network.SendInfo(BaseNetworkable.GetConnectionsWithin(base.transform.position, 100f + num, addSecondaryConnections: true))
	{
		priority = Network.Priority.Immediate
	});
	if (activeTelephone != null)
	{
		activeTelephone.OnReceivedVoiceFromUser(data);
	}
	if (SingletonComponent<NpcNoiseManager>.Instance != null)
	{
		SingletonComponent<NpcNoiseManager>.Instance.OnVoiceChat(this);
	}
}

```
:::

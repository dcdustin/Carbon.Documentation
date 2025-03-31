<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBoomboxToggle
```csharp
public void ServerTogglePlay(BaseEntity.RPCMessage msg, bool bypassPower = false)
{
	if (IsPowered() || bypassPower)
	{
		bool play = msg.read.ReadByte() == 1;
		ServerTogglePlay(play);
	}
}

```

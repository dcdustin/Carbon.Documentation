# OnBoomboxToggle
<Badge type="info" text="Radio"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a boombox is toggled on or off (play or stop).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBoomboxToggle()
{
	Puts("OnBoomboxToggle has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BoomBox]
public void ServerTogglePlay(BaseEntity.RPCMessage msg, bool bypassPower = false)
{
	if (IsPowered() || bypassPower)
	{
		bool play = msg.read.ReadByte() == 1;
		ServerTogglePlay(play);
	}
}

```
:::

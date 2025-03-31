# OnDigitalClockRingStop
<Badge type="info" text="Electronic"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a digital alarm clock’s ringing is stopped.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnDigitalClockRingStop(DigitalClock digitalClock)
{
	Puts("OnDigitalClockRingStop has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ DigitalClock]
public void StopRinging()
{
	isRinging = false;
	ClientRPC(RpcTarget.NetworkGroup("RPC_StopRinging"));
	MarkDirty();
}

```
:::

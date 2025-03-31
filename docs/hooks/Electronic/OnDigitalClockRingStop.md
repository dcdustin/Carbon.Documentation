<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDigitalClockRingStop
```csharp
public void StopRinging()
{
	isRinging = false;
	ClientRPC(RpcTarget.NetworkGroup("RPC_StopRinging"));
	MarkDirty();
}

```

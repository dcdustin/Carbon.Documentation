<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDigitalClockRing
```csharp
public void Ring()
{
	isRinging = true;
	ClientRPC(RpcTarget.NetworkGroup("RPC_StartRinging"));
	Invoke(StopRinging, 5f);
	MarkDirty();
}

```

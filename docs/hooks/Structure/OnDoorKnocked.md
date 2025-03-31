<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnDoorKnocked [DoorKnocker]
```csharp
public void Knock(BasePlayer player)
{
	ClientRPC(RpcTarget.NetworkGroup("ClientKnock"), player.transform.position);
}

```

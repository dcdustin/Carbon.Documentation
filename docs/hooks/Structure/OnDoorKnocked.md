# OnDoorKnocked
<Badge type="info" text="Structure"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player knocks on a door.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDoorKnocked()
{
	Puts("OnDoorKnocked has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ DoorKnocker]
public void Knock(BasePlayer player)
{
	ClientRPC(RpcTarget.NetworkGroup("ClientKnock"), player.transform.position);
}

```
:::

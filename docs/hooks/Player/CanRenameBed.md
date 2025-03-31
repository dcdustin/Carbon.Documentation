<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanRenameBed
Called when a player tries to rename a bed or sleeping bag, to decide if it's allowed.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanRenameBed()
{
	Puts("CanRenameBed has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ SleepingBag]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void Rename(BaseEntity.RPCMessage msg)
{
	if (msg.player.CanInteract())
	{
		string str = msg.read.String();
		str = WordFilter.Filter(str);
		if (string.IsNullOrEmpty(str))
		{
			str = "Unnamed Sleeping Bag";
		}
		if (str.Length > 24)
		{
			str = str.Substring(0, 22) + "..";
		}
		niceName = str;
		SendNetworkUpdate();
		NotifyPlayer(deployerUserID);
	}
}

```
:::

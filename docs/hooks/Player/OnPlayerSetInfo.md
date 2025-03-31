# OnPlayerSetInfo
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when the server sets a player's connection info or data (usually during initial connection).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerSetInfo(BasePlayer basePlayer, string key, string val)
{
	Puts("OnPlayerSetInfo has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public virtual void SetInfo(string key, string val)
{
	if (IsConnected)
	{
		net.connection.info.Set(key, val);
	}
}

```
:::

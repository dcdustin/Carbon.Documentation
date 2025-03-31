<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerSetInfo
```csharp
public virtual void SetInfo(string key, string val)
{
	if (IsConnected)
	{
		net.connection.info.Set(key, val);
	}
}

```

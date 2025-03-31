<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnSignContentCopied
```csharp
public void CopyInfoToSign(ISignage s, IUGCBrowserEntity b)
{
	FileStorage.server.ReassignEntityId(net.ID, s.NetworkID);
	s.SetTextureCRCs(textureIDs);
	b.EditingHistory.Clear();
	foreach (ulong item in editHistory)
	{
		b.EditingHistory.Add(item);
	}
}

```

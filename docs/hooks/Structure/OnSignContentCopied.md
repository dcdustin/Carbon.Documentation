# OnSignContentCopied
<Badge type="info" text="Structure"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSignContentCopied(SignContent signContent, ISignage s, IUGCBrowserEntity b)
{
	Puts("OnSignContentCopied has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SignContent]
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
:::

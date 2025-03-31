# OnServerUserRemove
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an entry is removed from the server's user list (e.g., a user is unbanned or removed from moderators).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerUserRemove()
{
	Puts("OnServerUserRemove has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ServerUsers]
public static void Remove(ulong uid)
{
	users.Remove(uid);
}

```
:::

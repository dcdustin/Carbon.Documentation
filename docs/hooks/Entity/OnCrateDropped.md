# OnCrateDropped
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a hackable locked crate is dropped into the world (for example, dropped from a helicopter or event).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCrateDropped(HackableLockedCrate hackableLockedCrate)
{
	Puts("OnCrateDropped has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ HackableLockedCrate]
public void SetWasDropped()
{
	wasDropped = true;
}

```
:::

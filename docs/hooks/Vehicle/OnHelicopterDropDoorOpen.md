# OnHelicopterDropDoorOpen
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHelicopterDropDoorOpen(CH47HelicopterAIController cH47HelicopterAIController)
{
	Puts("OnHelicopterDropDoorOpen has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public void SetDropDoorOpen(bool open)
{
	SetFlag(BaseEntity.Flags.Reserved8, open);
}

```
:::

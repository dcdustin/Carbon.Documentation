<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnHelicopterDropDoorOpen
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnHelicopterDropDoorOpen()
{
	Puts("OnHelicopterDropDoorOpen has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public void SetDropDoorOpen(bool open)
{
	SetFlag(BaseEntity.Flags.Reserved8, open);
}

```
:::

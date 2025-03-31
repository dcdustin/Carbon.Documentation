<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNpcDuck
Called when an NPC ducks (takes cover).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcDuck()
{
	Puts("OnNpcDuck has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ HumanNPC]
public void SetDucked(bool flag)
{
	modelState.ducked = flag;
	SendNetworkUpdate();
}

```
:::

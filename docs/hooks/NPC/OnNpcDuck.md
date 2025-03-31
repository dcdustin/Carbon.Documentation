# OnNpcDuck
<Badge type="info" text="NPC"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an NPC ducks (takes cover).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnNpcDuck(HumanNPC humanNPC)
{
	Puts("OnNpcDuck has been fired!");
	return (object)default;
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

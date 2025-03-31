<Badge type="danger" text="Carbon Compatible"/>
# CanPlayerInheritNetworkGroup
Determines if a player should inherit the network group of an entity (remain in that entity's network zone).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanPlayerInheritNetworkGroup()
{
	Puts("CanPlayerInheritNetworkGroup has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public override bool ShouldInheritNetworkGroup()
{
	return IsSpectating();
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanRagdollDismount
Called to determine if a player should be thrown off (ragdoll) when dismounting (e.g., from a vehicle).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanRagdollDismount()
{
	Puts("CanRagdollDismount has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseRagdoll]
public override bool AllowPlayerInstigatedDismount(BasePlayer player)
{
	return false;
}

```
:::

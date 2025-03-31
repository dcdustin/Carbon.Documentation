# CanUseHelicopter
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanUseHelicopter()
{
	Puts("CanUseHelicopter has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ CH47HelicopterAIController]
public override void AttemptMount(BasePlayer player, bool doMountChecks = true)
{
	if (player.IsNpc || player.IsAdmin)
	{
		base.AttemptMount(player, doMountChecks);
	}
}

```
:::

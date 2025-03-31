<Badge type="danger" text="Carbon Compatible"/>
# IDelFix
Called when the 'del' console command is executed to delete objects.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IDelFix()
{
	Puts("IDelFix has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ConVar.Hierarchy]
[ServerVar]
public static void del(ConsoleSystem.Arg args)
{
	if (!args.HasArgs())
	{
		return;
	}
	System.Collections.Generic.IEnumerable<UnityEngine.Transform> enumerable = System.Linq.Enumerable.Where(GetCurrent(), (UnityEngine.Transform x) => x.name.ToLower() == args.FullString.ToLower());
	if (System.Linq.Enumerable.Count(enumerable) == 0)
	{
		enumerable = System.Linq.Enumerable.Where(GetCurrent(), (UnityEngine.Transform x) => x.name.StartsWith(args.FullString, System.StringComparison.CurrentCultureIgnoreCase));
	}
	if (System.Linq.Enumerable.Count(enumerable) == 0)
	{
		args.ReplyWith("Couldn't find  " + args.FullString);
		return;
	}
	foreach (UnityEngine.Transform item in enumerable)
	{
		BaseEntity baseEntity = UnityEngine.GameObjectEx.ToBaseEntity(item.gameObject);
		if (baseEntity.IsValid())
		{
			if (baseEntity.isServer)
			{
				baseEntity.Kill();
			}
		}
		else
		{
			GameManager.Destroy(item.gameObject);
		}
	}
	args.ReplyWith("Deleted " + System.Linq.Enumerable.Count(enumerable) + " objects");
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanSpectateTarget
Called to check if a player (usually admin) can spectate a particular target player.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object CanSpectateTarget()
{
	Puts("CanSpectateTarget has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BasePlayer]
public void UpdateSpectateTarget(string strName)
{
	spectateFilter = strName;
	System.Collections.Generic.IEnumerable<BaseEntity> enumerable = null;
	if (spectateFilter.StartsWith("@"))
	{
		string filter = spectateFilter.Substring(1);
		enumerable = System.Linq.Enumerable.Cast<BaseEntity>(System.Linq.Enumerable.Where(System.Linq.Enumerable.Where(BaseNetworkable.serverEntities, (BaseNetworkable x) => UnityEngine.StringEx.Contains(x.name, filter, System.Globalization.CompareOptions.IgnoreCase)), (BaseNetworkable x) => x != this));
	}
	else
	{
		System.Collections.Generic.IEnumerable<BasePlayer> source = System.Linq.Enumerable.Where(activePlayerList, (BasePlayer x) => !x.IsSpectating() && !x.IsDead() && !x.IsSleeping());
		if (strName.Length > 0)
		{
			source = System.Linq.Enumerable.Where(System.Linq.Enumerable.Where(source, (BasePlayer x) => UnityEngine.StringEx.Contains(x.displayName, spectateFilter, System.Globalization.CompareOptions.IgnoreCase) || x.UserIDString.Contains(spectateFilter)), (BasePlayer x) => x != this);
		}
		source = System.Linq.Enumerable.OrderBy(source, (BasePlayer x) => x.displayName);
		enumerable = System.Linq.Enumerable.Cast<BaseEntity>(source);
	}
	BaseEntity[] array = System.Linq.Enumerable.ToArray(enumerable);
	if (array.Length == 0)
	{
		ChatMessage("No valid spectate targets!");
		return;
	}
	BaseEntity baseEntity = array[SpectateOffset % array.Length];
	if (baseEntity != null)
	{
		SpectatePlayer(baseEntity);
	}
}

```
:::

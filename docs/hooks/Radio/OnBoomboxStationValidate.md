<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBoomboxStationValidate
Called to validate a boombox radio station change (ensuring the selected station is allowed).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnBoomboxStationValidate()
{
	Puts("OnBoomboxStationValidate has been fired!");
	return (System.Boolean)default;
}
```
```csharp [Source — Assembly-CSharp @ BoomBox]
public static bool IsStationValid(string url)
{
	ParseServerUrlList();
	ShoutcastStreamer.CheckBuiltInRadios();
	if (ValidStations == null || !ValidStations.ContainsValue(url))
	{
		if (ServerValidStations == null || !ServerValidStations.ContainsValue(url))
		{
			if (ShoutcastStreamer.ParsedLocalRadioList != null)
			{
				return ShoutcastStreamer.ParsedLocalRadioList.ContainsValue(url);
			}
			return false;
		}
		return true;
	}
	return true;
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBoomboxStationValidate
```csharp
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

<Badge type="danger" text="Carbon Compatible"/>
# IFixCarsFix
Called when the 'fixcars' console command is executed to repair nearby vehicles.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void IFixCarsFix()
{
	Puts("IFixCarsFix has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ConVar.vehicle]
[ServerVar]
public static void fixcars(ConsoleSystem.Arg arg)
{
	BasePlayer basePlayer = UnityEngine.ArgEx.Player(arg);
	if (basePlayer == null)
	{
		arg.ReplyWith("Null player.");
		return;
	}
	if (!basePlayer.IsAdmin)
	{
		arg.ReplyWith("Must be an admin to use fixcars.");
		return;
	}
	int @int = arg.GetInt(0, 2);
	@int = UnityEngine.Mathf.Clamp(@int, 1, 3);
	BaseVehicle[] array = BaseEntity.Util.FindAll<BaseVehicle>();
	int num = 0;
	BaseVehicle[] array2 = array;
	foreach (BaseVehicle baseVehicle in array2)
	{
		if (baseVehicle.isServer && UnityEngine.Vector3.Distance(baseVehicle.transform.position, basePlayer.transform.position) <= 10f && baseVehicle.AdminFixUp(@int))
		{
			num++;
		}
	}
	MLRS[] array3 = BaseEntity.Util.FindAll<MLRS>();
	foreach (MLRS mLRS in array3)
	{
		if (mLRS.isServer && UnityEngine.Vector3.Distance(mLRS.transform.position, basePlayer.transform.position) <= 10f && mLRS.AdminFixUp())
		{
			num++;
		}
	}
	DiverPropulsionVehicle[] array4 = BaseEntity.Util.FindAll<DiverPropulsionVehicle>();
	foreach (DiverPropulsionVehicle diverPropulsionVehicle in array4)
	{
		if (diverPropulsionVehicle.isServer && UnityEngine.Vector3.Distance(diverPropulsionVehicle.transform.position, basePlayer.transform.position) <= 10f && diverPropulsionVehicle.AdminFixUp())
		{
			num++;
		}
	}
	arg.ReplyWith($"Fixed up {num} vehicles.");
}

```
:::

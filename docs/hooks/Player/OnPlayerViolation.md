# OnPlayerViolation
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a player triggers an anti-cheat violation.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPlayerViolation()
{
	Puts("OnPlayerViolation has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ AntiHack]
public static void AddViolation(BasePlayer ply, AntiHackType type, float amount)
{
	using (TimeWarning.New("AntiHack.AddViolation"))
	{
		ply.lastViolationType = type;
		ply.lastViolationTime = UnityEngine.Time.realtimeSinceStartup;
		ply.violationLevel += amount;
		if (type == AntiHackType.NoClip || type == AntiHackType.FlyHack || type == AntiHackType.SpeedHack || type == AntiHackType.InsideGeometry || type == AntiHackType.InsideTerrain || type == AntiHackType.Ticks)
		{
			ply.lastMovementViolationTime = UnityEngine.Time.realtimeSinceStartup;
		}
		if ((ConVar.AntiHack.debuglevel >= 2 && amount > 0f) || (ConVar.AntiHack.debuglevel >= 3 && type != AntiHackType.NoClip) || ConVar.AntiHack.debuglevel >= 4)
		{
			LogToConsole(ply, type, "Added violation of " + amount + " in frame " + UnityEngine.Time.frameCount + " (now has " + ply.violationLevel + ")");
		}
		EnforceViolations(ply);
	}
}

```
:::

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPlayerViolation
```csharp
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

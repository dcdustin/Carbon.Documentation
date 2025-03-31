<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEyePosValidate
```csharp
public bool ValidateEyePos(BasePlayer player, UnityEngine.Vector3 eyePos, bool checkLineOfSight = true)
{
	bool flag = true;
	if (UnityEngine.Vector3Ex.IsNaNOrInfinity(eyePos))
	{
		string shortPrefabName = base.ShortPrefabName;
		AntiHack.Log(player, AntiHackType.EyeHack, "Contains NaN (" + shortPrefabName + ")");
		player.stats.combat.LogInvalid(player, this, "eye_nan");
		flag = false;
	}
	if (ConVar.AntiHack.eye_protection > 0)
	{
		if (ConVar.AntiHack.eye_protection >= 1)
		{
			float num = player.GetParentVelocity().magnitude + player.GetMountVelocity().magnitude;
			float num2 = ((((player.HasParent() || player.isMounted) ? ConVar.AntiHack.eye_distance_parented_mounted_forgiveness : 0f) + player.estimatedSpeed > 0f) ? ConVar.AntiHack.eye_forgiveness : 0f);
			float num3 = num + num2;
			float num4 = player.tickHistory.Distance(player, eyePos);
			if (num4 > num3)
			{
				string shortPrefabName2 = base.ShortPrefabName;
				AntiHack.Log(player, AntiHackType.EyeHack, "Distance (" + shortPrefabName2 + " on attack with " + num4 + "m > " + num3 + "m)");
				player.stats.combat.LogInvalid(player, this, "eye_distance");
				flag = false;
			}
		}
		if (ConVar.AntiHack.eye_protection >= 3)
		{
			float num5 = UnityEngine.Mathf.Abs(player.GetMountVelocity().y + player.GetParentVelocity().y) + player.GetJumpHeight();
			float num6 = UnityEngine.Mathf.Abs(player.eyes.position.y - eyePos.y);
			if (num6 > num5)
			{
				string shortPrefabName3 = base.ShortPrefabName;
				AntiHack.Log(player, AntiHackType.EyeHack, "Altitude (" + shortPrefabName3 + " on attack with " + num6 + "m > " + num5 + "m)");
				player.stats.combat.LogInvalid(player, this, "eye_altitude");
				flag = false;
			}
		}
		if (checkLineOfSight)
		{
			int num7 = 2162688;
			if (ConVar.AntiHack.eye_terraincheck)
			{
				num7 |= 0x800000;
			}
			if (ConVar.AntiHack.eye_vehiclecheck)
			{
				num7 |= 0x8000000;
			}
			if (ConVar.AntiHack.eye_protection >= 2)
			{
				UnityEngine.Vector3 center = player.eyes.center;
				UnityEngine.Vector3 position = player.eyes.position;
				UnityEngine.Vector3 vector = eyePos;
				if (!GamePhysics.LineOfSightRadius(center, position, num7, ConVar.AntiHack.eye_losradius) || !GamePhysics.LineOfSightRadius(position, vector, num7, ConVar.AntiHack.eye_losradius))
				{
					string shortPrefabName4 = base.ShortPrefabName;
					string[] obj = new string[8] { "Line of sight (", shortPrefabName4, " on attack) ", null, null, null, null, null };
					UnityEngine.Vector3 vector2 = center;
					obj[3] = vector2.ToString();
					obj[4] = " ";
					vector2 = position;
					obj[5] = vector2.ToString();
					obj[6] = " ";
					vector2 = vector;
					obj[7] = vector2.ToString();
					AntiHack.Log(player, AntiHackType.EyeHack, string.Concat(obj));
					player.stats.combat.LogInvalid(player, this, "eye_los");
					flag = false;
				}
			}
			if (ConVar.AntiHack.eye_protection >= 4 && !player.HasParent())
			{
				UnityEngine.Vector3 position2 = player.eyes.position;
				UnityEngine.Vector3 vector3 = eyePos;
				float num8 = UnityEngine.Vector3.Distance(position2, vector3);
				UnityEngine.Collider col;
				if (num8 > ConVar.AntiHack.eye_noclip_cutoff)
				{
					if (AntiHack.TestNoClipping(player, position2, vector3, player.NoClipRadius(ConVar.AntiHack.eye_noclip_margin), ConVar.AntiHack.eye_noclip_backtracking, out col))
					{
						string shortPrefabName5 = base.ShortPrefabName;
						string[] obj2 = new string[6] { "NoClip (", shortPrefabName5, " on attack) ", null, null, null };
						UnityEngine.Vector3 vector2 = position2;
						obj2[3] = vector2.ToString();
						obj2[4] = " ";
						vector2 = vector3;
						obj2[5] = vector2.ToString();
						AntiHack.Log(player, AntiHackType.EyeHack, string.Concat(obj2));
						player.stats.combat.LogInvalid(player, this, "eye_noclip");
						flag = false;
					}
				}
				else if (num8 > 0.01f && AntiHack.TestNoClipping(player, position2, vector3, 0.1f, ConVar.AntiHack.eye_noclip_backtracking, out col))
				{
					string shortPrefabName6 = base.ShortPrefabName;
					string[] obj3 = new string[6] { "NoClip (", shortPrefabName6, " on attack) ", null, null, null };
					UnityEngine.Vector3 vector2 = position2;
					obj3[3] = vector2.ToString();
					obj3[4] = " ";
					vector2 = vector3;
					obj3[5] = vector2.ToString();
					AntiHack.Log(player, AntiHackType.EyeHack, string.Concat(obj3));
					player.stats.combat.LogInvalid(player, this, "eye_noclip");
					flag = false;
				}
			}
		}
		if (!flag)
		{
			AntiHack.AddViolation(player, AntiHackType.EyeHack, ConVar.AntiHack.eye_penalty);
		}
		else if (ConVar.AntiHack.eye_protection >= 5 && !player.HasParent() && !player.isMounted)
		{
			player.eyeHistory.PushBack(eyePos);
		}
	}
	return flag;
}

```

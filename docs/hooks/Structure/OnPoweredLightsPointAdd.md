<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnPoweredLightsPointAdd
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnPoweredLightsPointAdd()
{
	Puts("OnPoweredLightsPointAdd has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ PoweredLightsDeployer]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
public void AddPoint(BaseEntity.RPCMessage msg)
{
	UnityEngine.Vector3 vector = msg.read.Vector3();
	UnityEngine.Vector3 vector2 = msg.read.Vector3();
	float slackLevel = msg.read.Float();
	BasePlayer player = msg.player;
	if (GetItem() == null || GetItem().amount < 1 || !IsVisible(vector) || !CanPlayerUse(player) || UnityEngine.Vector3.Distance(vector, player.eyes.position) > maxPlaceDistance || !CheckValidPlacement(vector, 0.1f, 10551297))
	{
		return;
	}
	int num = 1;
	if (active == null)
	{
		AdvancedChristmasLights component = GameManager.server.CreateEntity(poweredLightsPrefab.resourcePath, vector, UnityEngine.Quaternion.LookRotation(vector2, player.eyes.HeadUp())).GetComponent<AdvancedChristmasLights>();
		component.Spawn();
		active = component;
		num = 1;
		if (player.IsInCreativeMode && ConVar.Creative.unlimitedIo)
		{
			num = 0;
		}
	}
	else
	{
		if (active.IsFinalized())
		{
			return;
		}
		float a = 0f;
		UnityEngine.Vector3 vector3 = active.transform.position;
		if (active.points.Count > 0)
		{
			vector3 = active.points[active.points.Count - 1].point;
			a = UnityEngine.Vector3.Distance(vector, vector3);
		}
		a = UnityEngine.Mathf.Max(a, lengthPerAmount);
		float num2 = (float)GetItem().amount * lengthPerAmount;
		if (player.IsInCreativeMode && ConVar.Creative.unlimitedIo)
		{
			num2 = 200f;
		}
		if (a > num2)
		{
			a = num2;
			vector = vector3 + UnityEngine.Vector3Ex.Direction(vector, vector3) * a;
		}
		a = UnityEngine.Mathf.Min(num2, a);
		num = UnityEngine.Mathf.CeilToInt(a / lengthPerAmount);
		if (player.IsInCreativeMode && ConVar.Creative.unlimitedIo)
		{
			num = 0;
		}
	}
	active.AddPoint(vector, vector2, slackLevel);
	SetFlag(BaseEntity.Flags.Reserved8, active != null);
	int iAmount = num;
	UseItemAmount(iAmount);
	active.AddLengthUsed(num);
	SendNetworkUpdate();
}

```
:::

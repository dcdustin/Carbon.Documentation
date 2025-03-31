# OnSurveyGather
<Badge type="info" text="Resource"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered when a survey charge explodes to gather resource samples from the ground.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnSurveyGather()
{
	Puts("OnSurveyGather has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SurveyCharge]
public override void Explode()
{
	base.Explode();
	if (WaterLevel.Test(base.transform.position, waves: true, volumes: true, this))
	{
		return;
	}
	ResourceDepositManager.ResourceDeposit orCreate = ResourceDepositManager.GetOrCreate(base.transform.position);
	if (orCreate == null || UnityEngine.Time.realtimeSinceStartup - orCreate.lastSurveyTime < 10f)
	{
		return;
	}
	orCreate.lastSurveyTime = UnityEngine.Time.realtimeSinceStartup;
	if (!TransformUtil.GetGroundInfo(base.transform.position, out var hitOut, 0.3f, 8388608))
	{
		return;
	}
	UnityEngine.Vector3 point = hitOut.point;
	_ = hitOut.normal;
	System.Collections.Generic.List<SurveyCrater> obj = Facepunch.Pool.Get<System.Collections.Generic.List<SurveyCrater>>();
	Vis.Entities(base.transform.position, 10f, obj, 1);
	bool num = obj.Count > 0;
	Facepunch.Pool.FreeUnmanaged(ref obj);
	if (num)
	{
		return;
	}
	bool flag = false;
	bool flag2 = false;
	foreach (ResourceDepositManager.ResourceDeposit.ResourceDepositEntry resource in orCreate._resources)
	{
		if (resource.spawnType == ResourceDepositManager.ResourceDeposit.surveySpawnType.ITEM && !resource.isLiquid && resource.amount >= 1000)
		{
			int num2 = UnityEngine.Mathf.Clamp(UnityEngine.Mathf.CeilToInt(2.5f / resource.workNeeded * 10f), 0, 5);
			int iAmount = 1;
			flag = true;
			if (resource.isLiquid)
			{
				flag2 = true;
			}
			for (int i = 0; i < num2; i++)
			{
				Item item = ItemManager.Create(resource.type, iAmount, 0uL);
				UnityEngine.Vector3 modifiedAimConeDirection = AimConeUtil.GetModifiedAimConeDirection(20f, UnityEngine.Vector3.up);
				item.Drop(base.transform.position + UnityEngine.Vector3.up * 1f, GetInheritedDropVelocity() + modifiedAimConeDirection * UnityEngine.Random.Range(5f, 10f), UnityEngine.Random.rotation).SetAngularVelocity(UnityEngine.Random.rotation.eulerAngles * 5f);
			}
		}
	}
	if (flag)
	{
		string strPrefab = (flag2 ? craterPrefab_Oil.resourcePath : craterPrefab.resourcePath);
		BaseEntity baseEntity = GameManager.server.CreateEntity(strPrefab, point, UnityEngine.Quaternion.identity);
		if ((bool)baseEntity)
		{
			baseEntity.Spawn();
		}
	}
}

```
:::

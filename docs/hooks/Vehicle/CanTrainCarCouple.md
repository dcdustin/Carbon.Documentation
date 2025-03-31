# CanTrainCarCouple
<Badge type="info" text="Vehicle"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
No description.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool CanTrainCarCouple(TrainCoupling trainCoupling, TrainCar owner)
{
	Puts("CanTrainCarCouple has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ TrainCoupling]
public bool TryCouple(TrainCoupling theirCoupling, bool reflect)
{
	if (!isValid)
	{
		return false;
	}
	if (CoupledTo == theirCoupling)
	{
		return true;
	}
	if (IsCoupled)
	{
		return false;
	}
	if (reflect && !theirCoupling.TryCouple(this, reflect: false))
	{
		return false;
	}
	CoupledTo = theirCoupling;
	owner.SetFlag(flag, b: true, recursive: false, networkupdate: false);
	owner.SendNetworkUpdate();
	return true;
}

```
:::

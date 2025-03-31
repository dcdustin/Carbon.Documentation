<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# CanTrainCarCouple
```csharp
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

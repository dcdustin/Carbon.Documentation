# OnDieselEngineToggled
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called after a Diesel Engine has been turned on or off.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnDieselEngineToggled(DieselEngine dieselEngine)
{
	Puts("OnDieselEngineToggled has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ DieselEngine]
public void EngineOn()
{
	SetFlag(BaseEntity.Flags.On, b: true);
	BroadcastEntityMessage("DieselEngineOn");
}

```
:::

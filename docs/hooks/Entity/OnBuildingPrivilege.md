# OnBuildingPrivilege
<Badge type="info" text="Entity"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player’s building privilege status changes (e.g., when a player gains or loses Tool Cupboard authorization or enters/leaves a TC range).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private BuildingPrivlidge OnBuildingPrivilege(BaseEntity baseEntity)
{
	Puts("OnBuildingPrivilege has been fired!");
	return (BuildingPrivlidge)default;
}
```
```csharp [Source — Assembly-CSharp @ BaseEntity]
public virtual BuildingPrivlidge GetBuildingPrivilege()
{
	return GetNearestBuildingPrivilege(PrivilegeCacheDefaultValue());
}

```
:::

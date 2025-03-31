# OnPlayerMetabolize
<Badge type="info" text="Player"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Triggered on each tick when the player's metabolism (food, water, etc.) is updated.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnPlayerMetabolize(PlayerMetabolism playerMetabolism, BaseCombatEntity ownerEntity, float delta)
{
	Puts("OnPlayerMetabolize has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ PlayerMetabolism]
public override void ServerUpdate(BaseCombatEntity ownerEntity, float delta)
{
	base.ServerUpdate(ownerEntity, delta);
	SendChangesToClient();
}

```
:::

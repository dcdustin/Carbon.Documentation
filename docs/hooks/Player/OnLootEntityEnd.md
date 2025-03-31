<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnLootEntityEnd
Triggered when a player finishes looting an entity or container (loot UI closed).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLootEntityEnd()
{
	Puts("OnLootEntityEnd has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ ItemBasedFlowRestrictor]
public void PlayerStoppedLooting(BasePlayer player)
{
}

```
:::

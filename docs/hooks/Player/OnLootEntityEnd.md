# OnLootEntityEnd
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when a player finishes looting an entity or container (loot UI closed).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnLootEntityEnd(BasePlayer player, ItemBasedFlowRestrictor itemBasedFlowRestrictor)
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

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# SetMaxHealthBasePlayer [patch]
```csharp
public override float MaxHealth()
{
	return 100f * (1f + ((modifiers != null) ? modifiers.GetValue(Modifier.ModifierType.Max_Health) : 0f));
}

```

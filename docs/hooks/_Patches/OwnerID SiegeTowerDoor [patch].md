<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OwnerID SiegeTowerDoor [patch]
```csharp
public void SetupDoor(SiegeTowerDoor door)
{
	door.SetupDoor(this);
	door.SetMaxHealth(MaxHealth());
	door.SetHealth(MaxHealth());
	door.startHealth = MaxHealth();
}

```

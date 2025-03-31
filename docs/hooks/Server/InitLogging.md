<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# InitLogging
Called during the server startup to initialize logging (and perform initial item setup).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void InitLogging()
{
	Puts("InitLogging has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ Bootstrap]
public void StartupShared()
{
	ItemManager.Initialize();
}

```
:::

# InitLogging
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)<Badge type="info" text="Static"/><Badge type="info" text=" Hidden"/>
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

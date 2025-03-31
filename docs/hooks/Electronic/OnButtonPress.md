# OnButtonPress
<Badge type="info" text="Electronic"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when a player presses a deployable button (electrical press button).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnButtonPress(PressButton pressButton, BasePlayer player)
{
	Puts("OnButtonPress has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ PressButton]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsVisible(3f)]
public void RPC_Press(BaseEntity.RPCMessage msg)
{
	Press();
}

```
:::

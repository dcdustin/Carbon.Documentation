<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnButtonPress
Called when a player presses a deployable button (electrical press button).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnButtonPress()
{
	Puts("OnButtonPress has been fired!");
	return (System.Object)default;
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

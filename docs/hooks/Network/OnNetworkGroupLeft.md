<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnNetworkGroupLeft
Called when an entity or player leaves a network group.
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnNetworkGroupLeft()
{
	Puts("OnNetworkGroupLeft has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ BaseNetworkable]
public virtual void OnNetworkGroupLeave(Network.Visibility.Group group)
{
}

```
:::

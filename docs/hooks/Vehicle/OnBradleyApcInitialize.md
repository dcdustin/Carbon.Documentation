<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnBradleyApcInitialize
Called when the Bradley APC is initialized (spawns or resets).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBradleyApcInitialize()
{
	Puts("OnBradleyApcInitialize has been fired!");
	return (System.Object)default;
}
```
```csharp [Source — Assembly-CSharp @ BradleyAPC]
public void Initialize()
{
	myRigidBody.centerOfMass = centerOfMass.localPosition;
	destination = base.transform.position;
	finalDestination = base.transform.position;
}

```
:::

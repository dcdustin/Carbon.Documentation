# OnBradleyApcInitialize
<Badge type="info" text="Vehicle"/><Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
Called when the Bradley APC is initialized (spawns or resets).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnBradleyApcInitialize(BradleyAPC bradleyAPC)
{
	Puts("OnBradleyApcInitialize has been fired!");
	return (object)default;
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

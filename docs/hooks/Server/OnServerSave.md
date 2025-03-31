<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerSave
Called when the server performs a save of the world (automatic or manual save).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnServerSave()
{
	Puts("OnServerSave has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SaveRestore]
public System.Collections.IEnumerator DoAutomatedSave(bool AndWait = false)
{
	IsSaving = true;
	string folder = ConVar.Server.rootFolder;
	if (!AndWait)
	{
		yield return UnityEngine.CoroutineEx.waitForEndOfFrame;
	}
	if (AndWait)
	{
		System.Collections.IEnumerator enumerator = Save(folder + "/" + World.SaveFileName, AndWait);
		while (enumerator.MoveNext())
		{
		}
	}
	else
	{
		yield return StartCoroutine(Save(folder + "/" + World.SaveFileName, AndWait));
	}
	if (!AndWait)
	{
		yield return UnityEngine.CoroutineEx.waitForEndOfFrame;
	}
	UnityEngine.Debug.Log("Saving complete");
	IsSaving = false;
}

```
:::

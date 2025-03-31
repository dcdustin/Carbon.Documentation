<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnServerSave
```csharp
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

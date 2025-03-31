# OnCompilationFail
<Badge type="info" text="Engine"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)<Badge type="info" text="MetadataOnly"/>
Called when a plugin or script fails to compile (compilation error occurred).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCompilationFail(string file, Carbon.Core.ModLoader.CompilationResult result)
{
	Puts("OnCompilationFail has been fired!");
}
```
```csharp [Source — Carbon @ Carbon.Managers.ScriptLoader]
[System.Runtime.CompilerServices.IteratorStateMachine(typeof(Carbon.Managers.ScriptLoader.<Compile>d__51))]
public System.Collections.IEnumerator Compile()
{
	//yield-return decompiler failed: Unexpected instruction in Iterator.Dispose()
	return new Carbon.Managers.ScriptLoader.<Compile>d__51(0)
	{
		<>4__this = this
	};
}

```
:::

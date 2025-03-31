<Badge type="danger" text="Carbon Compatible"/>
# OnCompilationFail
Called when a plugin or script fails to compile (compilation error occurred).
### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnCompilationFail()
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

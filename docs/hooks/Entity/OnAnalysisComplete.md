# OnAnalysisComplete
<Badge type="info" text="Entity"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when a survey charge completes its ground analysis, revealing resource information (survey crater results).

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private void OnAnalysisComplete(SurveyCrater surveyCrater, BasePlayer player)
{
	Puts("OnAnalysisComplete has been fired!");
}
```
```csharp [Source — Assembly-CSharp @ SurveyCrater]
[BaseEntity.RPC_Server]
public void AnalysisComplete(BaseEntity.RPCMessage msg)
{
}

```
:::

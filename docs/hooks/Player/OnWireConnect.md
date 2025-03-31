# OnWireConnect
<Badge type="info" text="Player"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Called when an electrical wire connection is made between two devices.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private object OnWireConnect(BasePlayer local0, IOEntity local5, int local3, IOEntity local6, int local4, System.Collections.Generic.List`1[[UnityEngine.Vector3, UnityEngine.CoreModule, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]] linePoints, System.Collections.Generic.List`1[[System.Single, System.Private.CoreLib, Version=8.0.0.0, Culture=neutral, PublicKeyToken=7cec85d7bea7798e]] local7)
{
	Puts("OnWireConnect has been fired!");
	return (object)default;
}
```
```csharp [Source — Assembly-CSharp @ WireTool]
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
[BaseEntity.RPC_Server.FromOwner(false)]
[BaseEntity.RPC_Server.CallsPerSecond(5uL)]
public void RPC_MakeConnection(BaseEntity.RPCMessage rpc)
{
	BasePlayer player = rpc.player;
	if (!CanPlayerUseWires(player))
	{
		return;
	}
	ProtoBuf.WireConnectionMessage wireConnectionMessage = ProtoBuf.WireConnectionMessage.Deserialize(rpc.read);
	System.Collections.Generic.List<UnityEngine.Vector3> linePoints = wireConnectionMessage.linePoints;
	int inputIndex = wireConnectionMessage.inputIndex;
	int outputIndex = wireConnectionMessage.outputIndex;
	IOEntity iOEntity = new EntityRef<IOEntity>(wireConnectionMessage.inputID).Get(serverside: true);
	IOEntity iOEntity2 = new EntityRef<IOEntity>(wireConnectionMessage.outputID).Get(serverside: true);
	if (!(iOEntity == null) && !(iOEntity2 == null) && ValidateLine(linePoints, iOEntity, iOEntity2, player, outputIndex) && inputIndex < iOEntity.inputs.Length && outputIndex < iOEntity2.outputs.Length && !(iOEntity.inputs[inputIndex].connectedTo.Get() != null) && !(iOEntity2.outputs[outputIndex].connectedTo.Get() != null) && (!iOEntity.inputs[inputIndex].rootConnectionsOnly || iOEntity2.IsRootEntity()) && CanModifyEntity(player, iOEntity) && CanModifyEntity(player, iOEntity2))
	{
		System.Collections.Generic.List<float> slackLevels = wireConnectionMessage.slackLevels;
		IOEntity.LineAnchor[] array = new IOEntity.LineAnchor[wireConnectionMessage.lineAnchors.Count];
		for (int i = 0; i < wireConnectionMessage.lineAnchors.Count; i++)
		{
			ProtoBuf.WireLineAnchorInfo wireLineAnchorInfo = wireConnectionMessage.lineAnchors[i];
			array[i].entityRef = new EntityRef<Door>(wireLineAnchorInfo.parentID);
			array[i].boneName = wireLineAnchorInfo.boneName;
			array[i].index = (int)wireLineAnchorInfo.index;
			array[i].position = wireLineAnchorInfo.position;
		}
		WireTool.WireColour wireColour = IntToColour(wireConnectionMessage.wireColor);
		if (wireColour == WireTool.WireColour.Invisible && !player.IsInCreativeMode)
		{
			wireColour = DefaultColor;
		}
		iOEntity2.ConnectTo(iOEntity, outputIndex, inputIndex, linePoints, slackLevels, array, wireColour);
		if (wireType == IOEntity.IOType.Industrial)
		{
			iOEntity.NotifyIndustrialNetworkChanged();
			iOEntity2.NotifyIndustrialNetworkChanged();
		}
	}
}

```
:::

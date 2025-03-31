<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnCCTVDirectionChange
```csharp
[BaseEntity.RPC_Server]
public void Server_SetDir(BaseEntity.RPCMessage msg)
{
	if (!IsStatic())
	{
		BasePlayer player = msg.player;
		if (player.CanBuild() && player.IsBuildingAuthed())
		{
			UnityEngine.Vector3 direction = UnityEngine.Vector3Ex.Direction(player.eyes.position, yaw.transform.position);
			direction = base.transform.InverseTransformDirection(direction);
			UnityEngine.Vector3 vector = BaseMountable.ConvertVector(UnityEngine.Quaternion.LookRotation(direction).eulerAngles);
			pitchAmount = UnityEngine.Mathf.Clamp(vector.x, pitchClamp.x, pitchClamp.y);
			yawAmount = UnityEngine.Mathf.Clamp(vector.y, yawClamp.x, yawClamp.y);
			SendNetworkUpdate();
		}
	}
}

```

<Badge type="danger" text="Carbon Compatible"/><Badge type="warning" text="Oxide Compatible"/>
# OnEntityReskin
```csharp
[BaseEntity.RPC_Server]
[BaseEntity.RPC_Server.IsActiveItem]
[BaseEntity.RPC_Server.CallsPerSecond(2uL)]
public void ChangeItemSkin(BaseEntity.RPCMessage msg)
{
	NetworkableId uid = msg.read.EntityID();
	int targetSkin = msg.read.Int32();
	BaseNetworkable baseNetworkable = BaseNetworkable.serverEntities.Find(uid);
	if (!ValidateEntityAndSkin(msg.player, baseNetworkable, targetSkin))
	{
		return;
	}
	if (baseNetworkable != null)
	{
		BaseEntity baseEntity2 = baseNetworkable as BaseEntity;
		if ((object)baseEntity2 != null)
		{
			if (!GetItemDefinitionForEntity(baseEntity2, out var def, useRedirect: false))
			{
				FailResponse(SprayCan.SprayFailReason.InvalidItem);
				return;
			}
			ItemDefinition itemDefinition = null;
			ulong num = ItemDefinition.FindSkin((def.isRedirectOf != null) ? def.isRedirectOf.itemid : def.itemid, targetSkin);
			ItemSkinDirectory.Skin skin = System.Linq.Enumerable.FirstOrDefault(((def.isRedirectOf != null) ? def.isRedirectOf : def).skins, (ItemSkinDirectory.Skin x) => x.id == targetSkin);
			if (skin.invItem != null && skin.invItem is ItemSkin itemSkin)
			{
				if (itemSkin.Redirect != null)
				{
					itemDefinition = itemSkin.Redirect;
				}
				else if ((bool)def && def.isRedirectOf != null)
				{
					itemDefinition = def.isRedirectOf;
				}
			}
			else if (def.isRedirectOf != null || ((bool)def && def.isRedirectOf != null))
			{
				itemDefinition = def.isRedirectOf;
			}
			if (itemDefinition == null)
			{
				baseEntity2.skinID = num;
				baseEntity2.SendNetworkUpdate();
				Facepunch.Rust.Analytics.Server.SkinUsed(def.shortname, targetSkin);
				Facepunch.Rust.Analytics.Azure.OnEntitySkinChanged(msg.player, baseNetworkable, targetSkin);
			}
			else
			{
				if (!CanEntityBeRespawned(baseEntity2, out var reason2))
				{
					FailResponse(reason2);
					return;
				}
				if (!GetEntityPrefabPath(itemDefinition, out var resourcePath))
				{
					UnityEngine.Debug.LogWarning("Cannot find resource path of redirect entity to spawn! " + itemDefinition.gameObject.name);
					FailResponse(SprayCan.SprayFailReason.InvalidItem);
					return;
				}
				UnityEngine.Vector3 localPosition = baseEntity2.transform.localPosition;
				UnityEngine.Quaternion localRotation = baseEntity2.transform.localRotation;
				BaseEntity baseEntity3 = baseEntity2.GetParentEntity();
				float health = baseEntity2.Health();
				EntityRef[] slots = baseEntity2.GetSlots();
				ulong ownerID = baseEntity2.OwnerID;
				float lastAttackedTime = ((baseEntity2 is BaseCombatEntity baseCombatEntity) ? baseCombatEntity.lastAttackedTime : 0f);
				int soilSaturation = ((baseEntity2 is PlanterBox planterBox) ? planterBox.soilSaturation : 0);
				System.Collections.Generic.HashSet<ProtoBuf.PlayerNameID> hashSet = null;
				if (baseEntity2 is BuildingPrivlidge buildingPrivlidge)
				{
					hashSet = new System.Collections.Generic.HashSet<ProtoBuf.PlayerNameID>(buildingPrivlidge.authorizedPlayers);
				}
				bool flag = baseEntity2 is Door || baseEntity2 is BuildingPrivlidge || baseEntity2 is BoxStorage || baseEntity2 is PlanterBox;
				System.Collections.Generic.Dictionary<SprayCan.ContainerSet, System.Collections.Generic.List<Item>> dictionary2 = new System.Collections.Generic.Dictionary<SprayCan.ContainerSet, System.Collections.Generic.List<Item>>();
				SaveEntityStorage(baseEntity2, dictionary2, 0);
				System.Collections.Generic.List<SprayCan.ChildPreserveInfo> obj = Facepunch.Pool.Get<System.Collections.Generic.List<SprayCan.ChildPreserveInfo>>();
				if (flag)
				{
					foreach (BaseEntity child in baseEntity2.children)
					{
						obj.Add(new SprayCan.ChildPreserveInfo
						{
							TargetEntity = child,
							TargetBone = child.parentBone,
							LocalPosition = child.transform.localPosition,
							LocalRotation = child.transform.localRotation
						});
					}
					foreach (SprayCan.ChildPreserveInfo item in obj)
					{
						item.TargetEntity.SetParent(null, worldPositionStays: true);
					}
				}
				else
				{
					for (int i = 0; i < baseEntity2.children.Count; i++)
					{
						SaveEntityStorage(baseEntity2.children[i], dictionary2, -1);
					}
				}
				SprayCan.IOPreserveInfo[] array = null;
				SprayCan.IOPreserveInfo[] array2 = null;
				System.Collections.Generic.List<SprayCan.OtherEntityPreserveInfo> list = new System.Collections.Generic.List<SprayCan.OtherEntityPreserveInfo>();
				if (baseEntity2 is IOEntity iOEntity)
				{
					array = new SprayCan.IOPreserveInfo[iOEntity.outputs.Length];
					for (int j = 0; j < iOEntity.outputs.Length; j++)
					{
						IOEntity.IOSlot iOSlot = iOEntity.outputs[j];
						IOEntity iOEntity2 = iOSlot.connectedTo.Get();
						if (iOEntity2 != null)
						{
							iOSlot.Preserve(ref array[j]);
							SprayCan.IOPreserveInfo target = default(SprayCan.IOPreserveInfo);
							iOEntity2.inputs[iOSlot.connectedToSlot].Preserve(ref target);
							list.Add(new SprayCan.OtherEntityPreserveInfo
							{
								info = target,
								connectedEntity = iOEntity2,
								index = iOSlot.connectedToSlot,
								isOutput = false
							});
						}
					}
					array2 = new SprayCan.IOPreserveInfo[iOEntity.inputs.Length];
					for (int k = 0; k < iOEntity.inputs.Length; k++)
					{
						IOEntity.IOSlot iOSlot2 = iOEntity.inputs[k];
						IOEntity iOEntity3 = iOSlot2.connectedTo.Get();
						if (iOEntity3 != null)
						{
							iOSlot2.Preserve(ref array2[k]);
							SprayCan.IOPreserveInfo target2 = default(SprayCan.IOPreserveInfo);
							iOEntity3.outputs[iOSlot2.connectedToSlot].Preserve(ref target2);
							list.Add(new SprayCan.OtherEntityPreserveInfo
							{
								info = target2,
								connectedEntity = iOEntity3,
								index = iOSlot2.connectedToSlot,
								isOutput = true
							});
						}
					}
				}
				baseEntity2.Kill();
				baseEntity2 = GameManager.server.CreateEntity(resourcePath, (baseEntity3 != null) ? baseEntity3.transform.TransformPoint(localPosition) : localPosition, (baseEntity3 != null) ? (baseEntity3.transform.rotation * localRotation) : localRotation);
				baseEntity2.SetParent(baseEntity3);
				baseEntity2.transform.localPosition = localPosition;
				baseEntity2.transform.localRotation = localRotation;
				baseEntity2.OwnerID = ownerID;
				if (GetItemDefinitionForEntity(baseEntity2, out var def2, useRedirect: false) && def2.isRedirectOf != null)
				{
					baseEntity2.skinID = 0uL;
				}
				else
				{
					baseEntity2.skinID = num;
				}
				if (baseEntity2 is DecayEntity decayEntity)
				{
					decayEntity.AttachToBuilding(null);
				}
				if (baseEntity2 is PlanterBox planterBox2)
				{
					planterBox2.soilSaturation = soilSaturation;
				}
				baseEntity2.Spawn();
				if (baseEntity2 is IOEntity iOEntity4)
				{
					if (array != null)
					{
						for (int l = 0; l < iOEntity4.outputs.Length; l++)
						{
							iOEntity4.outputs[l].Restore(array[l]);
						}
					}
					if (array2 != null)
					{
						for (int m = 0; m < iOEntity4.inputs.Length; m++)
						{
							if (array2[m].connectedTo != null)
							{
								iOEntity4.inputs[m].Restore(array2[m]);
							}
						}
					}
					using PooledList<IOEntity> pooledList = Facepunch.Pool.Get<PooledList<IOEntity>>();
					foreach (SprayCan.OtherEntityPreserveInfo item2 in list)
					{
						SprayCan.IOPreserveInfo info = item2.info;
						info.connectedTo = iOEntity4;
						if (item2.connectedEntity != null)
						{
							if (item2.isOutput)
							{
								item2.connectedEntity.outputs[item2.index].Restore(info);
								pooledList.Add(item2.connectedEntity);
							}
							else
							{
								item2.connectedEntity.inputs[item2.index].Restore(info);
								pooledList.Add(item2.connectedEntity);
							}
						}
					}
					foreach (IOEntity item3 in pooledList)
					{
						item3.SendNetworkUpdate();
					}
				}
				if (baseEntity2 is BaseCombatEntity baseCombatEntity2)
				{
					baseCombatEntity2.SetHealth(health);
					baseCombatEntity2.lastAttackedTime = lastAttackedTime;
				}
				if (baseEntity2 is BuildingPrivlidge buildingPrivlidge2 && hashSet != null)
				{
					buildingPrivlidge2.authorizedPlayers = hashSet;
				}
				if (dictionary2.Count > 0)
				{
					RestoreEntityStorage(baseEntity2, 0, dictionary2);
					if (!flag)
					{
						for (int n = 0; n < baseEntity2.children.Count; n++)
						{
							RestoreEntityStorage(baseEntity2.children[n], -1, dictionary2);
						}
					}
					foreach (System.Collections.Generic.KeyValuePair<SprayCan.ContainerSet, System.Collections.Generic.List<Item>> item4 in dictionary2)
					{
						foreach (Item item5 in item4.Value)
						{
							UnityEngine.Debug.Log($"Deleting {item5} as it has no new container");
							item5.Remove();
						}
					}
					Facepunch.Rust.Analytics.Server.SkinUsed(def.shortname, targetSkin);
					Facepunch.Rust.Analytics.Azure.OnEntitySkinChanged(msg.player, baseNetworkable, targetSkin);
				}
				if (flag)
				{
					foreach (SprayCan.ChildPreserveInfo item6 in obj)
					{
						item6.TargetEntity.SetParent(baseEntity2, item6.TargetBone, worldPositionStays: true);
						item6.TargetEntity.transform.localPosition = item6.LocalPosition;
						item6.TargetEntity.transform.localRotation = item6.LocalRotation;
						item6.TargetEntity.SendNetworkUpdate();
					}
					baseEntity2.SetSlots(slots);
				}
				Facepunch.Pool.FreeUnmanaged(ref obj);
			}
			ClientRPC(RpcTarget.NetworkGroup("Client_ReskinResult"), 1, baseEntity2.net.ID);
		}
	}
	LoseCondition(ConditionLossPerReskin);
	ClientRPC(RpcTarget.NetworkGroup("Client_ChangeSprayColour"), -1);
	SetFlag(BaseEntity.Flags.Busy, b: true);
	Invoke(ClearBusy, SprayCooldown);
	void FailResponse(SprayCan.SprayFailReason reason)
	{
		ClientRPC(RpcTarget.NetworkGroup("Client_ReskinResult"), 0, (int)reason);
	}
	static void RestoreEntityStorage(BaseEntity baseEntity, int index, System.Collections.Generic.Dictionary<SprayCan.ContainerSet, System.Collections.Generic.List<Item>> copy)
	{
		if (baseEntity is IItemContainerEntity itemContainerEntity2)
		{
			SprayCan.ContainerSet containerSet2 = default(SprayCan.ContainerSet);
			containerSet2.ContainerIndex = index;
			containerSet2.PrefabId = ((index != 0) ? baseEntity.prefabID : 0u);
			SprayCan.ContainerSet key2 = containerSet2;
			if (copy.ContainsKey(key2))
			{
				foreach (Item item7 in copy[key2])
				{
					item7.MoveToContainer(itemContainerEntity2.inventory);
				}
				copy.Remove(key2);
			}
		}
	}
	static void SaveEntityStorage(BaseEntity baseEntity, System.Collections.Generic.Dictionary<SprayCan.ContainerSet, System.Collections.Generic.List<Item>> dictionary, int index)
	{
		if (baseEntity is IItemContainerEntity itemContainerEntity)
		{
			SprayCan.ContainerSet containerSet = default(SprayCan.ContainerSet);
			containerSet.ContainerIndex = index;
			containerSet.PrefabId = ((index != 0) ? baseEntity.prefabID : 0u);
			SprayCan.ContainerSet key = containerSet;
			if (!dictionary.ContainsKey(key))
			{
				dictionary.Add(key, new System.Collections.Generic.List<Item>());
				foreach (Item item8 in itemContainerEntity.inventory.itemList)
				{
					dictionary[key].Add(item8);
				}
				{
					foreach (Item item9 in dictionary[key])
					{
						item9.RemoveFromContainer();
					}
					return;
				}
			}
			UnityEngine.Debug.Log("Multiple containers with the same prefab id being added during vehicle reskin");
		}
	}
}

```

# OnSaveLoad
<Badge type="info" text="Server"/>[<Badge type="danger" text="Carbon Compatible"/>](https://github.com/CarbonCommunity/Carbon)[<Badge type="warning" text="Oxide Compatible"/>](https://github.com/OxideMod/Oxide.Rust)
Triggered when the server loads the save file at startup.

### Return
Returning a non-null value cancels default behavior.

### Usage
::: code-group
```csharp [Example]
private bool OnSaveLoad(System.Collections.Generic.Dictionary`2[[BaseEntity, Assembly-CSharp, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null],[ProtoBuf.Entity, Rust.Data, Version=0.0.0.0, Culture=neutral, PublicKeyToken=null]] local1)
{
	Puts("OnSaveLoad has been fired!");
	return (bool)default;
}
```
```csharp [Source — Assembly-CSharp @ SaveRestore]
#define UNITY_ASSERTIONS
public static bool Load(string strFilename = "", bool allowOutOfDateSaves = false)
{
	SaveCreatedTime = System.DateTime.UtcNow;
	try
	{
		if (strFilename == "")
		{
			strFilename = World.SaveFolderName + "/" + World.SaveFileName;
		}
		if (!System.IO.File.Exists(strFilename))
		{
			if (!System.IO.File.Exists("TestSaves/" + strFilename))
			{
				UnityEngine.Debug.LogWarning("Couldn't load " + strFilename + " - file doesn't exist");
				return false;
			}
			strFilename = "TestSaves/" + strFilename;
		}
		System.Collections.Generic.List<BaseEntity> list = FindMapEntities();
		System.Collections.Generic.Dictionary<BaseEntity, ProtoBuf.Entity> dictionary = new System.Collections.Generic.Dictionary<BaseEntity, ProtoBuf.Entity>();
		using (System.IO.FileStream fileStream = System.IO.File.OpenRead(strFilename))
		{
			using System.IO.BinaryReader binaryReader = new System.IO.BinaryReader(fileStream);
			SaveCreatedTime = System.IO.File.GetCreationTime(strFilename);
			if (binaryReader.ReadSByte() != 83 || binaryReader.ReadSByte() != 65 || binaryReader.ReadSByte() != 86 || binaryReader.ReadSByte() != 82)
			{
				UnityEngine.Debug.LogWarning("Invalid save (missing header)");
				return false;
			}
			if (binaryReader.PeekChar() == 74)
			{
				binaryReader.ReadChar();
				WipeId = Newtonsoft.Json.JsonConvert.DeserializeObject<SaveRestore.SaveExtraData>(binaryReader.ReadString()).WipeId;
			}
			if (binaryReader.PeekChar() == 68)
			{
				binaryReader.ReadChar();
				SaveCreatedTime = Facepunch.Math.Epoch.ToDateTime(binaryReader.ReadInt32());
			}
			if (binaryReader.ReadUInt32() != 265)
			{
				if (allowOutOfDateSaves)
				{
					UnityEngine.Debug.LogWarning("This save is from an older (possibly incompatible) version!");
				}
				else
				{
					UnityEngine.Debug.LogWarning("This save is from an older version. It might not load properly.");
				}
			}
			ClearMapEntities(list);
			UnityEngine.Assertions.Assert.IsTrue(BaseEntity.saveList.Count == 0, "BaseEntity.saveList isn't empty!");
			Network.Net.sv.Reset();
			Rust.Application.isLoadingSave = true;
			System.Collections.Generic.HashSet<NetworkableId> hashSet = new System.Collections.Generic.HashSet<NetworkableId>();
			while (fileStream.Position < fileStream.Length)
			{
				Facepunch.RCon.Update();
				uint num = binaryReader.ReadUInt32();
				long position = fileStream.Position;
				ProtoBuf.Entity entData = null;
				try
				{
					entData = ProtoBuf.Entity.DeserializeLength(fileStream, (int)num);
				}
				catch (System.Exception exception)
				{
					UnityEngine.Debug.LogWarning("Skipping entity since it could not be deserialized - stream position: " + position + " size: " + num);
					UnityEngine.Debug.LogException(exception);
					fileStream.Position = position + num;
					continue;
				}
				if (entData.basePlayer != null && System.Linq.Enumerable.Any(dictionary, (System.Collections.Generic.KeyValuePair<BaseEntity, ProtoBuf.Entity> x) => x.Value.basePlayer != null && x.Value.basePlayer.userid == entData.basePlayer.userid))
				{
					string[] obj = new string[5] { "Skipping entity ", null, null, null, null };
					NetworkableId uid = entData.baseNetworkable.uid;
					obj[1] = uid.ToString();
					obj[2] = " - it's a player ";
					obj[3] = entData.basePlayer.userid.ToString();
					obj[4] = " who is in the save multiple times";
					UnityEngine.Debug.LogWarning(string.Concat(obj));
				}
				else if (entData.baseNetworkable.uid.IsValid && hashSet.Contains(entData.baseNetworkable.uid))
				{
					string[] obj2 = new string[5] { "Skipping entity ", null, null, null, null };
					NetworkableId uid = entData.baseNetworkable.uid;
					obj2[1] = uid.ToString();
					obj2[2] = " ";
					obj2[3] = StringPool.Get(entData.baseNetworkable.prefabID);
					obj2[4] = " - uid is used multiple times";
					UnityEngine.Debug.LogWarning(string.Concat(obj2));
				}
				else
				{
					if (entData.baseNetworkable.uid.IsValid)
					{
						hashSet.Add(entData.baseNetworkable.uid);
					}
					BaseEntity baseEntity = GameManager.server.CreateEntity(StringPool.Get(entData.baseNetworkable.prefabID), entData.baseEntity.pos, UnityEngine.Quaternion.Euler(entData.baseEntity.rot));
					if ((bool)baseEntity)
					{
						baseEntity.InitLoad(entData.baseNetworkable.uid);
						baseEntity.PreServerLoad();
						dictionary.Add(baseEntity, entData);
					}
				}
			}
		}
		UnityEngine.DebugEx.Log("Spawning " + list.Count + " entities from map");
		foreach (BaseEntity item in list)
		{
			if (!(item == null))
			{
				item.SpawnAsMapEntity();
			}
		}
		UnityEngine.DebugEx.Log("\tdone.");
		UnityEngine.DebugEx.Log("Spawning " + dictionary.Count + " entities from save");
		BaseNetworkable.LoadInfo info = default(BaseNetworkable.LoadInfo);
		info.fromDisk = true;
		System.Diagnostics.Stopwatch stopwatch = System.Diagnostics.Stopwatch.StartNew();
		int num2 = 0;
		foreach (System.Collections.Generic.KeyValuePair<BaseEntity, ProtoBuf.Entity> item2 in dictionary)
		{
			BaseEntity key = item2.Key;
			if (key == null)
			{
				continue;
			}
			Facepunch.RCon.Update();
			info.msg = item2.Value;
			key.Spawn();
			key.Load(info);
			if (key.IsValid())
			{
				num2++;
				if (stopwatch.Elapsed.TotalMilliseconds > 2000.0)
				{
					stopwatch.Reset();
					stopwatch.Start();
					UnityEngine.DebugEx.Log("\t" + num2 + " / " + dictionary.Count);
				}
			}
		}
		UnityEngine.DebugEx.Log("\tdone.");
		UnityEngine.DebugEx.Log("Postprocessing " + list.Count + " entities from map");
		foreach (BaseEntity item3 in list)
		{
			if (!(item3 == null))
			{
				item3.PostMapEntitySpawn();
			}
		}
		UnityEngine.DebugEx.Log("\tdone.");
		UnityEngine.DebugEx.Log("Postprocessing " + list.Count + " entities from save");
		foreach (System.Collections.Generic.KeyValuePair<BaseEntity, ProtoBuf.Entity> item4 in dictionary)
		{
			BaseEntity key2 = item4.Key;
			if (!(key2 == null))
			{
				Facepunch.RCon.Update();
				if (key2.IsValid())
				{
					key2.UpdateNetworkGroup();
					key2.PostServerLoad();
				}
			}
		}
		UnityEngine.DebugEx.Log("\tdone.");
		if ((bool)SingletonComponent<SpawnHandler>.Instance)
		{
			UnityEngine.DebugEx.Log("Enforcing SpawnPopulation Limits");
			SingletonComponent<SpawnHandler>.Instance.EnforceLimits();
			UnityEngine.DebugEx.Log("\tdone.");
		}
		InitializeWipeId();
		Rust.Application.isLoadingSave = false;
		return true;
	}
	catch (System.Exception exception2)
	{
		UnityEngine.Debug.LogWarning("Error loading save (" + strFilename + ")");
		UnityEngine.Debug.LogException(exception2);
		return false;
	}
}

```
:::

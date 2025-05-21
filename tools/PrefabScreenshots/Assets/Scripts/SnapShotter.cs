using System.Collections.Generic;
using UnityEngine;
using Facepunch;
using System;
using Humanlights.Extensions;
using System.Linq;
using System.IO;
using UnityEngine.Rendering.PostProcessing;
#if UNITY_EDITOR
using UnityEditor;
#endif

[ExecuteInEditMode]
public class SnapShotter : SingletonComponent<SnapShotter>
{
	public float ResolutionMultiply = 2f;
	public Vector2 NormalResolution, SideResolution;

	public static Shader StandardShader => Shader.Find("Universal Render Pipeline/Lit");
	public static readonly int RustMainTexId = Shader.PropertyToID("_MainTex");
	public static readonly int RustNormalMapId = Shader.PropertyToID("_BumpMap");
	public static readonly int MainTexId = Shader.PropertyToID("_BaseMap");
	public static readonly int SurfaceId = Shader.PropertyToID("_Surface");

	[Header("Auto-Scaling")] public float SizingMultiplier = 1f;
	public Camera Camera;
	public Bounds Bounds;
	public float ScaleOffset = 3f;
	public int Index;
	public Transform Pivot;
	public PostProcessVolume Volume;
	public PostProcessLayer Layer;
	public PostProcessProfile SilhouetteProfile;
	public GameObject[] Models;
	public BoxCollider Box;

	internal List<MeshRenderer> _lastRenderers = new();
	internal int _lastCount;

	public static string Folder
	{
		get
		{
			var folder = $"Assets\\Shots";
			OsEx.Folder.Create(folder);
			return folder;
		}
	}

	public void Update()
	{
		if (_lastCount != Pivot.childCount)
		{
			Index = Pivot.childCount - 1;
			RefreshModels();
			_lastCount = Pivot.childCount;
		}

		if (Models.Length == 0)
		{
			RefreshModels();
		}

		SetIndex(Index);
	}

	public void OnAssetsLoaded(Dictionary<uint, GameObject> assets)
	{
		foreach (var asset in assets)
		{
			asset.Value.transform.SetParent(transform, true);
			asset.Value.transform.position = transform.position;
			asset.Value.transform.rotation = Quaternion.Euler(Vector3.zero);
		}

		Models = assets.Select(x => x.Value).ToArray();
	}

	public void RefreshModels()
	{
		var models = new List<GameObject>();

		foreach (Transform child in Pivot)
		{
			models.Add(child.gameObject);
		}

		Models = models.ToArray();
		models.Clear();
	}

	public void TakeSnapshot(bool side = false)
	{
		var child = GetIndex(Index);
		var lastChildPosition = child == null ? Vector3.zero : child.transform.position;
		var lastChildRotation = child == null ? Vector3.zero : child.rotation.eulerAngles;
		var lastPivotPosition = Pivot.transform.position;
		var lastPivotRotation = Pivot.transform.rotation.eulerAngles;
		var lastCameraRotation = Camera.transform.rotation.eulerAngles;
		var lastProfile = Volume.profile;
		var lastAliasing = Layer.antialiasingMode;

		if (side)
		{
			// Camera.transform.LookAt ( _getCenter ( child ) );
			Layer.antialiasingMode = PostProcessLayer.Antialiasing.None;
			Volume.profile = SilhouetteProfile;
			Pivot.transform.rotation = Quaternion.Euler(Vector3.zero);

			if (child != null)
			{
				child.transform.position = Vector3.zero;
				child.rotation = Quaternion.Euler(0f, 90f, 0f);
			}
		}

		var renderTexture = new RenderTexture((int)((side ? SideResolution.x : NormalResolution.x) * ResolutionMultiply), (int)((side ? SideResolution.y : NormalResolution.y) * ResolutionMultiply), 24, RenderTextureFormat.ARGB32);
		renderTexture.useMipMap = false;
		renderTexture.autoGenerateMips = false;
		renderTexture.antiAliasing = 1;
		Camera.clearFlags = CameraClearFlags.SolidColor;
		Camera.backgroundColor = new Color(0, 0, 0, 0);
		Camera.targetTexture = renderTexture;
		Camera.Render();

		RenderTexture.active = renderTexture;

		var image = new Texture2D(renderTexture.width, renderTexture.height);
		image.alphaIsTransparency = true;
		image.ReadPixels(new Rect(0, 0, renderTexture.width, renderTexture.height), 0, 0);
		image.Apply();

		var bytes = image.EncodeToPNG();

		RenderTexture.active = null;
		Camera.targetTexture = null;
		DestroyImmediate(image);
		DestroyImmediate(renderTexture);

		try
		{
			var name = Pivot.childCount > 0 ? Path.GetFileName(Pivot.GetChild(Index).name) : "sample";
			var path = $"{Folder}\\{name.ToLower()}_icon{(side ? ".side" : "")}.png";
			OsEx.File.Create(path, bytes);
			DebugEx.Log($"Taken icon screenshot: {path} ({ByteEx.Format(bytes.Length, shortName: true)})");
		}
		catch (Exception ex)
		{
			Debug.LogWarning($"{Index} failed / {Pivot.childCount - 1}\n{ex}");
		}

		if (side)
		{
			Camera.transform.rotation = Quaternion.Euler(lastCameraRotation);
			Layer.antialiasingMode = lastAliasing;
			Volume.profile = lastProfile;
			Pivot.transform.position = lastPivotPosition;
			Pivot.rotation = Quaternion.Euler(lastPivotRotation);

			if (child != null)
			{
				child.transform.position = lastChildPosition;
				child.transform.rotation = Quaternion.Euler(lastChildRotation);
			}
		}
	}

	internal Vector3 _getCenter(Transform obj)
	{
		var renderer = obj.GetComponent<Renderer>();

		if (renderer != null) return renderer.bounds.center;

		return Vector3.zero;
	}

	public void SetIndex(int index)
	{
		if (Index == index || Pivot.childCount == 0)
		{
			return;
		}

		Index = index;

		if (index > Pivot.childCount - 1)
		{
			Index = Pivot.childCount - 1;
		}
		else if (index < 0)
		{
			Index = 0;
		}

		foreach (Transform c in Pivot)
		{
			c.gameObject.SetActive(false);
		}

		Bounds = default;
		_lastRenderers.Clear();

		var child = Pivot.GetChild(index);
		child.gameObject.SetActive(true);
		child.gameObject.transform.rotation = Quaternion.identity;
		child.gameObject.transform.localScale = Vector3.one;

		ProcessPrefabMissingMaterials(child.gameObject);
		ScalePrefabToCamera ();
	}

	public Transform GetIndex(int index)
	{
		if (Pivot.childCount == 0) return null;

		return Pivot.GetChild(index);
	}

	public void ProcessPrefabMissingMaterials(GameObject prefab)
	{
		HandleObject(prefab.transform);

		foreach (Transform tr in prefab.transform)
		{
			HandleObject(tr);

			ProcessPrefabMissingMaterials(tr.gameObject);
		}

		void HandleObject(Transform obj)
		{
			var meshRenderer = obj.GetComponent<MeshRenderer>();
			if (meshRenderer != null && meshRenderer.enabled)
			{
				Bounds.Encapsulate(meshRenderer.bounds);
				foreach (var material in meshRenderer.sharedMaterials)
				{
					if (material == null)
					{
						continue;
					}

					var rustTex = material.GetTexture(RustMainTexId);
					material.shader = StandardShader;
					material.SetInt(SurfaceId, 1);
					if (rustTex)
					{
						material.mainTexture = rustTex;
					}
				}
				_lastRenderers.Add(meshRenderer);
			}
		}
	}

	public void ScalePrefabToCamera()
	{
		Camera.orthographic = true;
		Camera.orthographicSize = Mathf.Max(Bounds.extents.y, Bounds.extents.x / Camera.aspect) + ScaleOffset;

		Vector3 center = Bounds.center;
		float radius = Bounds.extents.magnitude;
		float fov = Camera.fieldOfView * Mathf.Deg2Rad;
		float distance = radius / Mathf.Sin(fov / 2f);
		Camera.transform.position = center - Camera.transform.forward * distance;
	}

	public void OnDrawGizmos()
	{
		foreach (var renderer in _lastRenderers)
		{
			Gizmos.color = Color.red;
			Gizmos.DrawWireCube(renderer.bounds.center, renderer.bounds.size);
		}

		Gizmos.color = Color.blue;
		Gizmos.DrawWireCube(Bounds.center, Bounds.size);
	}
}

#if UNITY_EDITOR

[CustomEditor(typeof(SnapShotter))]
public class SnapShotterEditor : Editor
{
	internal SnapShotter _instance => target as SnapShotter;

	public override void OnInspectorGUI()
	{
		base.OnInspectorGUI();

		GUILayout.BeginHorizontal();

		if (GUILayout.Button("Take Snapshot", GUILayout.Height(25)))
		{
			_instance.TakeSnapshot();
			AssetDatabase.Refresh();
			AssetDatabase.SaveAssets();
		}

		if (GUILayout.Button("Take Snapshot (Side)", GUILayout.Height(25)))
		{
			_instance.TakeSnapshot(true);
			AssetDatabase.Refresh();
			AssetDatabase.SaveAssets();
		}

		GUILayout.EndHorizontal();

		GUILayout.BeginHorizontal();

		if (GUILayout.Button("Take All Snapshots", GUILayout.Height(25)))
		{
			_instance.SetIndex(0);

			for (int i = 0; i < _instance.Pivot.childCount; i++)
			{
				_instance.SetIndex(i);
				_instance.TakeSnapshot();
			}
		}

		if (GUILayout.Button("Take All Snapshots (Side)", GUILayout.Height(25)))
		{
			_instance.SetIndex(0);

			for (int i = 0; i < _instance.Pivot.childCount; i++)
			{
				_instance.SetIndex(i);
				_instance.TakeSnapshot(true);
			}
		}

		GUILayout.EndHorizontal();


		GUILayout.BeginHorizontal();

		if (GUILayout.Button("First"))
		{
			_instance.SetIndex(0);
		}

		if (GUILayout.Button("Previous"))
		{
			if (_instance.Index - 1 < 0) _instance.Index = _instance.Pivot.childCount;
			_instance.SetIndex(_instance.Index - 1);
		}

		if (GUILayout.Button("Next"))
		{
			if (_instance.Index + 1 > _instance.Pivot.childCount - 1) _instance.Index = -1;
			_instance.SetIndex(_instance.Index + 1);
		}

		if (GUILayout.Button("Last"))
		{
			_instance.SetIndex(_instance.Pivot.childCount - 1);
		}

		GUILayout.EndHorizontal();

		// if ( GUILayout.Button ( "Apply Icons", GUILayout.Height ( 25 ) ) )
		// {
		//     _instance.ApplyIcons ();
		// }
	}
}

#endif

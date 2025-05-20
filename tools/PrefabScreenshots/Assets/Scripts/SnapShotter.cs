using System.Collections.Generic;
using UnityEngine;
using Facepunch;
using Humanlights;
using System;
using Humanlights.Extensions;
using System.Linq;
using Unity.VisualScripting;
using UnityEngine.UI;
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

	[Header("Auto-Scaling")] public float SizingMultiplier = 1f;
	public Camera Camera;
	public Vector3 CameraScalerOffset;
	public int Index;
	public Transform Pivot;
	public PostProcessVolume Volume;
	public PostProcessLayer Layer;
	public PostProcessProfile SilhouetteProfile;
	public GameObject[] Models;
	public BoxCollider Box;
	public Quaternion ZeroRotation;

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

		var renderTexture =
			new RenderTexture((int)((side ? SideResolution.x : NormalResolution.x) * ResolutionMultiply),
				(int)((side ? SideResolution.y : NormalResolution.y) * ResolutionMultiply), 8);
		Camera.targetTexture = renderTexture;
		Camera.Render();

		RenderTexture.active = renderTexture;

		var image = new Texture2D(renderTexture.width, renderTexture.height);
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
		if (Pivot.childCount == 0) return;

		Index = index;

		if (index > Pivot.childCount - 1) Index = Pivot.childCount - 1;
		else if (index < 0) Index = 0;

		foreach (Transform c in Pivot)
		{
			c.gameObject.SetActive(false);
		}

		var child = Pivot.GetChild(index);
		child.gameObject.SetActive(true);

		ProcessPrefabMissingMaterials(child.gameObject);
		// ScalePrefabToCamera ( child.gameObject );
		// ScaleObjectsToFitBox ( child.gameObject );
		CameraDistanceToFit(child.gameObject);
	}

	public Transform GetIndex(int index)
	{
		if (Pivot.childCount == 0) return null;

		return Pivot.GetChild(index);
	}

	internal Material[] _blank = new Material [0];

	public void ProcessPrefabMissingMaterials(GameObject prefab)
	{
		foreach (Transform tr in prefab.transform)
		{
			var meshRenderer = tr.GetComponent<MeshRenderer>();
			if (meshRenderer != null)
			{
				foreach (var material in meshRenderer.sharedMaterials)
				{
					material.shader = StandardShader;
				}
			}

			ProcessPrefabMissingMaterials(tr.gameObject);
		}
	}

	public void ScalePrefabToCamera(GameObject prefab)
	{
		var filters = Pool.GetList<MeshFilter>();

		var initialFilter = prefab.GetComponent<MeshFilter>();
		if (initialFilter != null) filters.Add(initialFilter);
		filters.AddRange(prefab.GetComponentsInChildren<MeshFilter>());

		var meshBounds = GetTotalBounds(filters.ToArray());

		// Calculate the size of the bounds in world units
		float meshSize = Mathf.Max(meshBounds.size.x, meshBounds.size.y, meshBounds.size.z);

		// Calculate the distance from the camera to the object
		Vector3 cameraToObject = prefab.transform.position - Camera.transform.position;
		float distance = Vector3.Dot(cameraToObject, Camera.transform.forward);

		// Calculate the size of the bounds in pixels
		float meshSizeInPixels = meshSize * Camera.pixelHeight /
		                         (2 * distance * Mathf.Tan(Camera.fieldOfView * 0.5f * Mathf.Deg2Rad));

		// Scale the object to fit the screen
		prefab.transform.rotation = ZeroRotation;
		prefab.transform.localScale = Vector3.one * (meshSizeInPixels / Screen.height);
	}

	void ScaleObjectsToFitBox(GameObject prefab)
	{
		var filters = Pool.GetList<MeshFilter>();

		var initialFilter = prefab.GetComponent<MeshFilter>();
		if (initialFilter != null) filters.Add(initialFilter);
		filters.AddRange(prefab.GetComponentsInChildren<MeshFilter>());

		var totalBounds = GetTotalBounds(filters.ToArray());
		Pool.FreeList(ref filters);

		float sizeFactor = Mathf.Max(totalBounds.size.x / Box.size.x, totalBounds.size.y / Box.size.y,
			totalBounds.size.z / Box.size.z);

		prefab.transform.rotation = ZeroRotation;
		prefab.transform.localScale = Vector3.one * sizeFactor;

		totalBounds = default;
	}

	void CameraDistanceToFit(GameObject prefab)
	{
		var filters = Pool.GetList<MeshFilter>();

		var initialFilter = prefab.GetComponent<MeshFilter>();
		if (initialFilter != null) filters.Add(initialFilter);
		filters.AddRange(prefab.GetComponentsInChildren<MeshFilter>());

		var totalBounds = GetTotalBounds(filters.ToArray());
		Pool.FreeList(ref filters);

		var objectHeight = totalBounds.size.y;
		var distance = objectHeight / (2f * Camera.orthographicSize);
		prefab.transform.rotation = ZeroRotation;
		prefab.transform.position = transform.position + totalBounds.center;
		Camera.transform.position = totalBounds.center - distance * Camera.transform.forward;
	}

	internal Bounds GetTotalBounds(MeshFilter[] meshFilters)
	{
		if (meshFilters == null || meshFilters.Length == 0)
		{
			return new Bounds();
		}

		var totalBounds = meshFilters[0].mesh.bounds;

		for (int i = 1; i < meshFilters.Length; i++)
		{
			var meshBounds = meshFilters[i].mesh.bounds;
			totalBounds.Encapsulate(meshBounds);
		}

		return totalBounds;
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

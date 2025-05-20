using UnityEngine;
using UnityEngine.SceneManagement;
using System.Collections.Generic;
using System.Linq;

public class PrefabLookup : System.IDisposable
{
	private AssetBundleBackend backend;
	private Scene scene;

	private Dictionary<uint, GameObject> prefabs = new();

	internal const string manifestPath = "assets/manifest.asset";
	internal const string scenePath = "Assets/Modding/Prefabs.unity";
	internal GameManifest manifest;

	public bool isLoaded
	{
		get { return scene.isLoaded; }
	}

	public PrefabLookup ( string bundlename )
	{
		Debug.Log ( $"Loading Rust root bundle: {bundlename}" );

		backend = new AssetBundleBackend ( bundlename );

        Debug.Log ( $" Found {backend.bundles.Count:n0} bundles..." );
        Debug.Log ( $" Found {backend.bundles.Sum(x => x.Value.GetAllAssetNames().Length):n0} assets..." );

        manifest = backend.Load<GameManifest> ( manifestPath );

		var asyncOperation = SceneManager.LoadSceneAsync ( scenePath, LoadSceneMode.Additive );

		scene = SceneManager.GetSceneAt ( SceneManager.sceneCount - 1 );
        Debug.Log ( $"Prewarming prefabs..." );

        asyncOperation.completed += ( operation ) =>
		{
			foreach ( var go in scene.GetRootGameObjects () )
			{
				var hash = manifest.pooledStrings.FirstOrDefault ( x => x.str == go.name ).hash;

                if (!prefabs.ContainsKey( hash ) ) prefabs.Add ( hash, go );
			}

            Debug.Log ( $"Prewarming complete.");

            SnapShotter.Instance.OnAssetsLoaded ( prefabs );
		};
	}


    public void Dispose ()
	{
		if ( !isLoaded )
		{
			throw new System.Exception ( "Cannot unload assets before fully loaded!" );
		}

		backend.Dispose ();
		backend = null;

		SceneManager.UnloadSceneAsync ( scene );

		Debug.Log ( $"Disposed Rust's asset bundles. Clean-up complete." );
	}

	public GameObject this [ uint uid ]
	{
		get
		{
			GameObject res = null;

			prefabs.TryGetValue ( uid, out res );

			return res;
		}
	}
	public GameObject this [ string name ]
	{
		get
		{
			return backend.Load<GameObject> ( name );
		}
	}
	public uint GetRustUID ( string name )
	{
		return manifest.pooledStrings.FirstOrDefault ( x => x.str == name ).hash;
	}
}
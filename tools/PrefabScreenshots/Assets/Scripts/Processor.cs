using UnityEngine;

public class Processor : MonoBehaviour
{
	public static Processor Instance;
	public WorldLoader WorldLoader;

	public void Start()
	{
		Instance = this;
		WorldLoader.prefabs = new PrefabLookup(WorldLoader.bundlename);
	}

	[ContextMenu("Load Assets")]
	public void DoLoad()
	{
		WorldLoader.prefabs = new PrefabLookup(WorldLoader.bundlename);
	}
}

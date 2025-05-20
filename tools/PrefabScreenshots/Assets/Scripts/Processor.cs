using System.Collections.Generic;
using System.IO;
using UnityEngine;

public class Processor : MonoBehaviour
{
    public WorldLoader WorldLoader;

    public void Start ()
    {
        WorldLoader.prefabs = new PrefabLookup ( WorldLoader.bundlename );
    }

    [ContextMenu("Load Assets")]
    public void DoLoad ()
    {
        WorldLoader.prefabs = new PrefabLookup ( WorldLoader.bundlename );
    }
}
